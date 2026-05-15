import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function processAndSaveImage(buffer, destDir, basename) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const mainFile = `${basename}.webp`;
  const thumbFile = `${basename}-thumb.webp`;
  const mainPath = path.join(destDir, mainFile);
  const thumbPath = path.join(destDir, thumbFile);

  await sharp(buffer)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(mainPath);

  await sharp(buffer)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(thumbPath);

  return { mainFile, thumbFile, mainPath, thumbPath };
}

export function removeImageFiles(mainPath, thumbPath) {
  for (const p of [mainPath, thumbPath]) {
    if (p && fs.existsSync(p)) {
      try {
        fs.unlinkSync(p);
      } catch {
        /* ignore */
      }
    }
  }
}
