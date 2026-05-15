import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cmsRoutes from './routes/cms.js';
import productsRoutes from './routes/products.js';
import machineryRoutes from './routes/machinery.js';
import { initDataStores } from './lib/cmsStore.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/cms', cmsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/machinery', machineryRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Vaaman Texprint CMS server' });
});

initDataStores();

app.listen(PORT, () => {
  console.log(`CMS server running on port ${PORT}`);
  console.log('Local JSON storage — no database required');
});
