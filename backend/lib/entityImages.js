import path from 'path';
import fs from 'fs';
import { saveEntityImage, deleteStoredImage, UPLOADS_ROOT } from './mediaHelpers.js';
import * as productStore from './productStore.js';
import * as machineryStore from './machineryStore.js';

const stores = {
  products: productStore,
  machinery: machineryStore,
};

export async function addEntityImages(req, type, entityId, files, { setPrimary = false } = {}) {
  const store = stores[type];
  const entity = store[type === 'products' ? 'getProduct' : 'getMachinery'](entityId);
  if (!entity) return null;

  const added = [];
  for (const file of files) {
    const basename = `${type.slice(0, 3)}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const saved = await saveEntityImage(req, file.buffer, type, entityId, basename);
    entity.images = [...(entity.images || []), saved];
    added.push(saved);
  }
  if (setPrimary && added[0]) entity.image = added[0].url;
  else if (!entity.image && added[0]) entity.image = added[0].url;

  if (type === 'products') store.updateProduct(entityId, entity);
  else store.updateMachinery(entityId, entity);

  return { entity, added };
}

export async function replaceEntityPrimaryImage(req, type, entityId, file) {
  const store = stores[type];
  const getter = type === 'products' ? 'getProduct' : 'getMachinery';
  const entity = store[getter](entityId);
  if (!entity) return null;

  const basename = `primary-${Date.now()}`;
  const saved = await saveEntityImage(req, file.buffer, type, entityId, basename);
  entity.images = [...(entity.images || []), saved];
  entity.image = saved.url;

  if (type === 'products') store.updateProduct(entityId, entity);
  else store.updateMachinery(entityId, entity);

  return { entity, image: saved };
}

export function deleteEntityImage(type, entityId, imageId) {
  const store = stores[type];
  const getter = type === 'products' ? 'getProduct' : 'getMachinery';
  const entity = store[getter](entityId);
  if (!entity) return null;

  const img = (entity.images || []).find((i) => i.id === imageId);
  if (!img) return null;

  deleteStoredImage(img);
  entity.images = entity.images.filter((i) => i.id !== imageId);
  if (entity.image === img.url) entity.image = entity.images[0]?.url || null;

  if (type === 'products') store.updateProduct(entityId, entity);
  else store.updateMachinery(entityId, entity);

  return entity;
}

export function setEntityPrimaryImage(type, entityId, imageId) {
  const store = stores[type];
  const getter = type === 'products' ? 'getProduct' : 'getMachinery';
  const entity = store[getter](entityId);
  if (!entity) return null;

  const img = (entity.images || []).find((i) => i.id === imageId);
  if (!img) return null;

  entity.image = img.url;
  if (type === 'products') store.updateProduct(entityId, entity);
  else store.updateMachinery(entityId, entity);

  return entity;
}

export function removeEntityUploadDir(type, entityId) {
  const entityDir = path.join(UPLOADS_ROOT, type, entityId);
  if (fs.existsSync(entityDir)) fs.rmSync(entityDir, { recursive: true, force: true });
}

export function deleteAllEntityImages(entity) {
  for (const img of entity.images || []) deleteStoredImage(img);
}
