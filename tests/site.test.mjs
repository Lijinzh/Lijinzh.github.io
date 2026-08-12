import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

test('homepage contains the requested personal sections', () => {
  for (const id of ['projects', 'research', 'now']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /Made by <strong>Golden Philosophy<\/strong>/);
});

test('every public repository is represented', () => {
  for (const repository of [
    'TennisVideoHelper',
    'gpt-image-2-cli',
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
