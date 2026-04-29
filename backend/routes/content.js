import express from 'express';
import Content from '../models/Content.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all content
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update content (admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create(req.body);
    } else {
      content = await Content.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
