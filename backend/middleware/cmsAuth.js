import jwt from 'jsonwebtoken';

const SECRET = process.env.CMS_JWT_SECRET || 'vaaman-cms-local-secret-change-in-production';
const ADMIN_USER = 'Admin';
const ADMIN_PASS = 'Admin123';

export function verifyCredentials(username, password) {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '7d' });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = header.slice(7);
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
