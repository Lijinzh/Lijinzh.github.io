import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const previewScript = readFileSync(join(root, 'tools', 'update-project-previews.mjs'), 'utf8');
const previewWorkflow = readFileSync(join(root, '.github', 'workflows', 'update-project-previews.yml'), 'utf8');

test('homepage contains the requested personal sections', () => {
  for (const id of ['projects', 'research', 'now']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /Made by <strong>Golden Philosophy<\/strong>/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /data-theme="archive"/);
  assert.match(html, /data-theme="cathedral"/);
  assert.match(html, /data-theme="cosmos"/);
});

test('every public repository is represented', () => {
  for (const repository of [
    'TennisVideoHelper',
    'gpt-image-2-cli',
    'pptx2pdfcrop',
    'Communist-Manifesto-Releases',
    'RobotARMNN',
    'hainan-travel-plan',
  ]) {
    assert.ok(html.includes(repository), `missing repository: ${repository}`);
  }
});

test('local page assets exist', () => {
  const refs = [...html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)]
    .map((match) => match[1])
    .filter((ref) => !/^(?:https?:|mailto:|tel:)/.test(ref));

  for (const ref of refs) {
    assert.ok(existsSync(join(root, ref)), `missing local asset: ${ref}`);
  }
});

test('external blank targets use noreferrer', () => {
  const links = [...html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/g)].map((match) => match[0]);
  assert.ok(links.length > 0);
  for (const link of links) assert.match(link, /rel=["'][^"']*noreferrer[^"']*["']/);
});

test('automated project previews are wired to local webp assets', () => {
  for (const asset of [
    'tennis-review.webp',
    'gpt-image-pixel.webp',
    'ai-coding-handle-pixel.webp',
    'pptx2pdfcrop.webp',
    'hainan-pixel.webp',
  ]) {
    assert.ok(html.includes(`assets/projects/${asset}`), `missing automated preview: ${asset}`);
    assert.ok(previewScript.includes(`assets/projects/${asset}`), `missing capture target: ${asset}`);
    assert.ok(previewWorkflow.includes(`assets/projects/${asset}`), `missing committed preview: ${asset}`);
  }
});

test('preview refresh is scheduled and explicitly redeploys GitHub Pages', () => {
  assert.match(previewWorkflow, /workflow_dispatch:/);
  assert.match(previewWorkflow, /cron: ["']17 4 \* \* \*["']/);
  assert.match(previewWorkflow, /permissions:[\s\S]*contents: write/);
  assert.match(previewWorkflow, /permissions:[\s\S]*pages: write/);
  assert.match(previewWorkflow, /gh workflow run ci\.yml --ref main/);
  assert.match(previewWorkflow, /pages\/builds/);
});
