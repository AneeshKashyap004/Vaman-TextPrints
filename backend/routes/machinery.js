import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/cmsAuth.js';
import {
  readMachinery,
  getMachinery,
  createMachinery,
  updateMachinery,
  deleteMachinery,
} from '../lib/machineryStore.js';
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
    res.json({ machinery: readMachinery() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', (req, res) => {
  const machine = getMachinery(req.params.id);
  if (!machine) return res.status(404).json({ error: 'Machinery not found' });
  res.json(machine);
});

router.post('/', requireAuth, (req, res) => {
  try {
    if (!req.body?.name?.trim()) {
      return res.status(400).json({ error: 'Machine name is required' });
    }
    const machine = createMachinery(req.body);
    res.status(201).json(machine);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', requireAuth, (req, res) => {
  try {
    if (req.body?.name !== undefined && !String(req.body.name).trim()) {
      return res.status(400).json({ error: 'Machine name is required' });
    }
    const machine = updateMachinery(req.params.id, req.body);
    if (!machine) return res.status(404).json({ error: 'Machinery not found' });
    res.json(machine);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, (req, res) => {
  try {
    const machine = getMachinery(req.params.id);
    if (!machine) return res.status(404).json({ error: 'Machinery not found' });
    deleteAllEntityImages(machine);
    removeEntityUploadDir('machinery', req.params.id);
    deleteMachinery(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:id/images', requireAuth, upload.array('files', 12), async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ error: 'No files uploaded' });
    const result = await addEntityImages(req, 'machinery', req.params.id, files, {
      setPrimary: req.body.setPrimary === 'true',
    });
    if (!result) return res.status(404).json({ error: 'Machinery not found' });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id/image', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await replaceEntityPrimaryImage(req, 'machinery', req.params.id, req.file);
    if (!result) return res.status(404).json({ error: 'Machinery not found' });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id/images/:imageId', requireAuth, (req, res) => {
  try {
    const machine = deleteEntityImage('machinery', req.params.id, req.params.imageId);
    if (!machine) return res.status(404).json({ error: 'Image or machinery not found' });
    res.json({ machinery: machine });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id/primary-image', requireAuth, (req, res) => {
  try {
    const machine = setEntityPrimaryImage('machinery', req.params.id, req.body?.imageId);
    if (!machine) return res.status(404).json({ error: 'Image or machinery not found' });
    res.json({ machinery: machine });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
