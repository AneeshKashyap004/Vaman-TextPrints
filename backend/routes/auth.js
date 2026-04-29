import express from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Simple hardcoded admin credentials (in production, use proper database with bcrypt)
const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = 'Admin123';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'vaaman-texprint-secret-key-2024',
      { expiresIn: '24h' }
    );
    res.json({ token, username, role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
