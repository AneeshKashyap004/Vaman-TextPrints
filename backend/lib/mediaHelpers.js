import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processAndSaveImage, removeImageFiles } from './imageProcessor.js';
import { absoluteUrl, publicPath } from './mediaUrls.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_ROOT = path.join(__dirname, '..', 'uploads');
export const PRODUCTS_DIR = path.join(UPLOADS_ROOT, 'products');
export const MACHINERY_DIR = path.join(UPLOADS_ROOT, 'machinery');

export function ensureUploadDirs() {
  for (const dir of [UPLOADS_ROOT, PRODUCTS_DIR, MACHINERY_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

export async function saveEntityImage(req, buffer, type, entityId, basename) {
  const root = type === 'products' ? PRODUCTS_DIR : MACHINERY_DIR;
  const dir = path.join(root, entityId);
  const { mainFile, thumbFile, mainPath, thumbPath } = await processAndSaveImage(
    buffer,
    dir,
    basename
  );
  const pathname = publicPath(type, entityId, mainFile);
  const thumbPathname = publicPath(type, entityId, thumbFile);
  return {
    id: basename,
    url: absoluteUrl(req, pathname),
    thumbUrl: absoluteUrl(req, thumbPathname),
    path: pathname,
    thumbPath: thumbPathname,
    filename: mainFile,
  };
}

export function deleteStoredImage(record) {
  if (!record?.path) return;
  const rel = record.path.replace(/^\/uploads\//, '');
  const fullMain = path.join(UPLOADS_ROOT, rel);
  const fullThumb = fullMain.replace(/\.webp$/, '-thumb.webp');
  removeImageFiles(fullMain, fullThumb);
}
