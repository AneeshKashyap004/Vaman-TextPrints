import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { readSiteData, writeSiteData } from '../lib/cmsStore.js';
import { verifyCredentials, signToken, requireAuth } from '../middleware/cmsAuth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEGACY_UPLOADS = path.join(__dirname, '..', 'uploads');

const legacyStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(LEGACY_UPLOADS)) fs.mkdirSync(LEGACY_UPLOADS, { recursive: true });
    cb(null, LEGACY_UPLOADS);
  },
  filename: (req, file, cb) => {
    const key = req.body.imageKey || 'upload';
    const ext = path.extname(file.originalname) || '.jpg';
    const safe = key.replace(/[^a-zA-Z0-9-_]/g, '-');
    cb(null, `${safe}-${Date.now()}${ext}`);
  },
});

const legacyUpload = multer({
  storage: legacyStorage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|webp|gif|svg\+xml|svg)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const router = express.Router();

function deepMerge(target, source) {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (key === 'products' || key === 'machinery') continue;
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      out[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      out[key] = source[key];
    }
  }
  return out;
}

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!verifyCredentials(username, password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: signToken(), user: { username: 'Admin' } });
});

router.get('/content', (_req, res) => {
  try {
    res.json(readSiteData());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/content', requireAuth, (req, res) => {
  try {
    const current = readSiteData();
    const { products, machinery, ...rest } = req.body || {};
    const merged = deepMerge(current, rest);
    writeSiteData(merged);
    res.json(readSiteData());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/upload', requireAuth, legacyUpload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const imageKey = req.body.imageKey;
    if (!imageKey) return res.status(400).json({ error: 'imageKey is required' });

    const publicPathname = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${publicPathname}`;

    const data = readSiteData();
    if (!data.images) data.images = {};
    data.images[imageKey] = fullUrl;
    writeSiteData(data);

    res.json({ url: fullUrl, path: publicPathname, imageKey, images: data.images });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
