import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeMachinery } from './cmsNormalize.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const SITE_DATA_FILE = path.join(DATA_DIR, 'site-data.json');
export const MACHINERY_FILE = path.join(DATA_DIR, 'machinery.json');

function seedFromSiteData() {
  if (!fs.existsSync(SITE_DATA_FILE)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(SITE_DATA_FILE, 'utf8'));
    return (raw.machinery || []).map((m, i) => normalizeMachinery(m, i));
  } catch {
    return [];
  }
}

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(MACHINERY_FILE)) {
    const seed = seedFromSiteData();
    const normalized = seed.length
      ? seed
      : [normalizeMachinery({ name: 'New machine', note: '' }, 0)];
    fs.writeFileSync(MACHINERY_FILE, JSON.stringify({ machinery: normalized }, null, 2), 'utf8');
  }
}

export function readMachinery() {
  ensureFile();
  const raw = JSON.parse(fs.readFileSync(MACHINERY_FILE, 'utf8'));
  const list = Array.isArray(raw) ? raw : raw.machinery || [];
  return list.map((m, i) => normalizeMachinery(m, i));
}

export function writeMachinery(machinery) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const normalized = machinery.map((m, i) => normalizeMachinery(m, i));
  fs.writeFileSync(MACHINERY_FILE, JSON.stringify({ machinery: normalized }, null, 2), 'utf8');
  return normalized;
}

export function getMachinery(id) {
  return readMachinery().find((m) => m.id === id) || null;
}

export function createMachinery(payload) {
  const list = readMachinery();
  const machine = normalizeMachinery(
    { ...payload, id: payload.id || `machine-${Date.now()}` },
    list.length
  );
  writeMachinery([...list, machine]);
  return machine;
}

export function updateMachinery(id, payload) {
  const list = readMachinery();
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  const updated = normalizeMachinery({ ...list[idx], ...payload, id }, idx);
  list[idx] = updated;
  writeMachinery(list);
  return updated;
}

export function deleteMachinery(id) {
  const list = readMachinery();
  const next = list.filter((m) => m.id !== id);
  if (next.length === list.length) return false;
  writeMachinery(next);
  return true;
}

export function migrateMachineryFromSiteData(siteMachinery) {
  if (!fs.existsSync(MACHINERY_FILE) && siteMachinery?.length) {
    writeMachinery(siteMachinery.map((m, i) => normalizeMachinery(m, i)));
    return true;
  }
  return false;
}
