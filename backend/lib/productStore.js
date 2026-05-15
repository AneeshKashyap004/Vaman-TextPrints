import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeProduct } from './cmsNormalize.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const SITE_DATA_FILE = path.join(DATA_DIR, 'site-data.json');
export const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

function seedFromSiteData() {
  if (!fs.existsSync(SITE_DATA_FILE)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(SITE_DATA_FILE, 'utf8'));
    return (raw.products || []).map((p, i) => normalizeProduct(p, i));
  } catch {
    return [];
  }
}

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const seed = seedFromSiteData();
    const normalized = seed.length
      ? seed
      : [normalizeProduct({ title: 'New product' }, 0)];
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({ products: normalized }, null, 2), 'utf8');
  }
}

export function readProducts() {
  ensureFile();
  const raw = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const list = Array.isArray(raw) ? raw : raw.products || [];
  return list.map((p, i) => normalizeProduct(p, i));
}

export function writeProducts(products) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const normalized = products.map((p, i) => normalizeProduct(p, i));
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({ products: normalized }, null, 2), 'utf8');
  return normalized;
}

export function getProduct(id) {
  return readProducts().find((p) => p.id === id) || null;
}

export function createProduct(payload) {
  const products = readProducts();
  const product = normalizeProduct(
    { ...payload, id: payload.id || `product-${Date.now()}` },
    products.length
  );
  writeProducts([...products, product]);
  return product;
}

export function updateProduct(id, payload) {
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = normalizeProduct(
    { ...products[idx], ...payload, id },
    idx
  );
  products[idx] = updated;
  writeProducts(products);
  return updated;
}

export function deleteProduct(id) {
  const products = readProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  writeProducts(next);
  return true;
}

export function migrateProductsFromSiteData(siteProducts) {
  if (!fs.existsSync(PRODUCTS_FILE) && siteProducts?.length) {
    writeProducts(siteProducts.map((p, i) => normalizeProduct(p, i)));
    return true;
  }
  return false;
}
