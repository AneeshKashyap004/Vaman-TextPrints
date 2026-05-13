import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import serviceRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vaaman-texprint')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Marketing site focus: public APIs only unless ENABLE_ADMIN_API=true
const adminApi = process.env.ENABLE_ADMIN_API === 'true';

// Routes
if (adminApi) {
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
} else {
  console.log('Admin API routes disabled. Set ENABLE_ADMIN_API=true to mount /api/auth and /api/messages.');
}
app.use('/api/content', contentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
