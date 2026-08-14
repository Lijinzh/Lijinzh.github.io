import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const targets = [
  {
    name: 'Tennis Video Helper',
    url: 'https://lijinzh.github.io/TennisVideoHelper/',
    output: 'assets/projects/tennis-review.webp',
  },
  {
    name: 'GPT Image 2 CLI',
    url: 'https://lijinzh.github.io/gpt-image-2-cli/',
    output: 'assets/projects/gpt-image-pixel.webp',
  },
  {
    name: 'AI Coding Handle',
    imageUrl: 'https://zkolab.com/assets/images/pixel-hero.webp',
    output: 'assets/projects/ai-coding-handle-pixel.webp',
  },
  {
    name: 'pptx2pdfcrop',
    url: 'https://lijinzh.github.io/pptx2pdfcrop/',
    output: 'assets/projects/pptx2pdfcrop.webp',
  },
  {
    name: 'Hainan Travel Plan',
    url: 'https://lijinzh.github.io/hainan-travel-plan/',
    output: 'assets/projects/hainan-pixel.webp',
  },
];

const hash = (buffer) => createHash('sha256').update(buffer).digest('hex').slice(0, 12);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: 'zh-CN',
  timezoneId: 'Asia/Shanghai',
  reducedMotion: 'reduce',
});

const stagingDir = join(tmpdir(), `lijinzh-project-previews-${Date.now()}`);
await mkdir(stagingDir, { recursive: true });

try {
  for (const target of targets) {
    console.log(`capturing ${target.name}`);
    if (target.imageUrl) {
      const response = await fetch(target.imageUrl);
      if (!response.ok) throw new Error(`${target.name}: HTTP ${response.status}`);

      const source = Buffer.from(await response.arrayBuffer());
      const metadata = await sharp(source).metadata();
      if (metadata.format !== 'webp' || !metadata.width || !metadata.height) {
        throw new Error(`${target.name}: invalid WebP preview`);
      }

      await writeFile(join(stagingDir, basename(target.output)), source);
      continue;
    }

    const page = await context.newPage();
    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'unknown'}`);

      await page.locator('body').waitFor({ state: 'visible', timeout: 15_000 });
      await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation: none !important;
            caret-color: transparent !important;
            scroll-behavior: auto !important;
            transition: none !important;
          }
          html { scrollbar-width: none !important; }
          ::-webkit-scrollbar { display: none !important; }
        `,
      });
      await page.evaluate(async () => {
        window.scrollTo(0, 0);
        await document.fonts?.ready;
        const imageLoad = Promise.all(
          [...document.images].map((image) => {
            if (image.complete) return image.decode?.().catch(() => {});
            return new Promise((done) => {
              image.addEventListener('load', done, { once: true });
              image.addEventListener('error', done, { once: true });
            });
          }),
        );

        await Promise.race([
          imageLoad,
          new Promise((done) => setTimeout(done, 8_000)),
        ]);
      });
      await page.waitForTimeout(800);

      const screenshot = await page.screenshot({ fullPage: false, animations: 'disabled' });
      const stagedPath = join(stagingDir, basename(target.output));
      await sharp(screenshot)
        .resize(1440, 900, { fit: 'cover' })
        .webp({ quality: 84, effort: 6, smartSubsample: true })
        .toFile(stagedPath);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

let changed = 0;
for (const target of targets) {
  const outputPath = resolve(root, target.output);
  const stagedPath = join(stagingDir, basename(target.output));
  const next = await readFile(stagedPath);
  const current = await readFile(outputPath).catch(() => null);

  if (current?.equals(next)) {
    console.log(`unchanged ${target.name} ${hash(next)}`);
    continue;
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await rm(outputPath, { force: true });
  await rename(stagedPath, outputPath);
  console.log(`updated   ${target.name} ${current ? `${hash(current)} -> ` : ''}${hash(next)}`);
  changed += 1;
}

await rm(stagingDir, { recursive: true, force: true });
console.log(`${changed} preview image(s) updated.`);
