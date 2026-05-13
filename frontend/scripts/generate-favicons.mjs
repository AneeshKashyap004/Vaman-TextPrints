/**
 * Rasterizes public/favicon.svg into PNG + ICO assets for legacy browsers & PWA.
 * Run via: npm run generate:favicons (also runs automatically before build)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const svgPath = join(publicDir, 'favicon.svg');

async function main() {
  const svg = readFileSync(svgPath);

  const p16 = await sharp(svg).resize(16, 16).png({ compressionLevel: 9 }).toBuffer();
  const p32 = await sharp(svg).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
  const p48 = await sharp(svg).resize(48, 48).png({ compressionLevel: 9 }).toBuffer();

  writeFileSync(join(publicDir, 'favicon-16x16.png'), p16);
  writeFileSync(join(publicDir, 'favicon-32x32.png'), p32);

  const apple = await sharp(svg).resize(180, 180).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), apple);

  const ico = await pngToIco([p16, p32, p48]);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);

  console.log('Favicons generated: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
