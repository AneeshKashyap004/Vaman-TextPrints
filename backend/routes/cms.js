import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { readSiteData, writeSiteData } from '../lib/cmsStore.js';
import { verifyCredentials, signToken, requireAuth } from '../middleware/cmsAuth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const key = req.body.imageKey || 'upload';
    const ext = path.extname(file.originalname) || '.jpg';
    const safe = key.replace(/[^a-zA-Z0-9-_]/g, '-');
    cb(null, `${safe}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|webp|gif|svg\+xml|svg)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const router = express.Router();

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
    const merged = deepMerge(current, req.body);
    writeSiteData(merged);
    res.json(merged);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const imageKey = req.body.imageKey;
    if (!imageKey) return res.status(400).json({ error: 'imageKey is required' });

    const publicPath = `/uploads/${req.file.filename}`;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fullUrl = `${baseUrl}${publicPath}`;

    const data = readSiteData();
    if (!data.images) data.images = {};
    data.images[imageKey] = fullUrl;
    writeSiteData(data);

    res.json({ url: fullUrl, path: publicPath, imageKey, images: data.images });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/products', requireAuth, (req, res) => {
  const data = readSiteData();
  const product = {
    id: req.body.id || `product-${Date.now()}`,
    title: req.body.title || 'New product',
    summary: req.body.summary || '',
    body: req.body.body || '',
    features: req.body.features || [],
  };
  data.products = [...(data.products || []), product];
  writeSiteData(data);
  res.json(product);
});

router.put('/products/:id', requireAuth, (req, res) => {
  const data = readSiteData();
  const idx = (data.products || []).findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  data.products[idx] = { ...data.products[idx], ...req.body, id: req.params.id };
  writeSiteData(data);
  res.json(data.products[idx]);
});

router.delete('/products/:id', requireAuth, (req, res) => {
  const data = readSiteData();
  data.products = (data.products || []).filter((p) => p.id !== req.params.id);
  writeSiteData(data);
  res.json({ ok: true });
});

function deepMerge(target, source) {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const out = { ...target };
  for (const key of Object.keys(source)) {
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

export default router;
