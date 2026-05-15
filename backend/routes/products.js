import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/cmsAuth.js';
import {
  readProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../lib/productStore.js';
import {
  addEntityImages,
  replaceEntityPrimaryImage,
  deleteEntityImage,
  setEntityPrimaryImage,
  deleteAllEntityImages,
  removeEntityUploadDir,
} from '../lib/entityImages.js';
import { ensureUploadDirs } from '../lib/mediaHelpers.js';

ensureUploadDirs();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 14 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.json({ products: readProducts() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', (req, res) => {
  const product = getProduct(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', requireAuth, (req, res) => {
  try {
    if (!req.body?.title?.trim()) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    const product = createProduct(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', requireAuth, (req, res) => {
  try {
    if (req.body?.title !== undefined && !String(req.body.title).trim()) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    const product = updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, (req, res) => {
  try {
    const product = getProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    deleteAllEntityImages(product);
    removeEntityUploadDir('products', req.params.id);
    deleteProduct(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:id/images', requireAuth, upload.array('files', 12), async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ error: 'No files uploaded' });
    const result = await addEntityImages(req, 'products', req.params.id, files, {
      setPrimary: req.body.setPrimary === 'true',
    });
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id/image', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await replaceEntityPrimaryImage(req, 'products', req.params.id, req.file);
    if (!result) return res.status(404).json({ error: 'Product not found' });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id/images/:imageId', requireAuth, (req, res) => {
  try {
    const product = deleteEntityImage('products', req.params.id, req.params.imageId);
    if (!product) return res.status(404).json({ error: 'Image or product not found' });
    res.json({ product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id/primary-image', requireAuth, (req, res) => {
  try {
    const product = setEntityPrimaryImage('products', req.params.id, req.body?.imageId);
    if (!product) return res.status(404).json({ error: 'Image or product not found' });
    res.json({ product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
