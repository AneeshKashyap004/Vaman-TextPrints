const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('vaaman_admin_token');
}

export function setToken(token) {
  if (token) localStorage.setItem('vaaman_admin_token', token);
  else localStorage.removeItem('vaaman_admin_token');
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

function uploadFiles(path, files, extra = {}) {
  const fd = new FormData();
  for (const file of files) fd.append('files', file);
  Object.entries(extra).forEach(([k, v]) => fd.append(k, v));
  return request(path, { method: 'POST', body: fd });
}

function uploadSingle(path, file, extra = {}) {
  const fd = new FormData();
  fd.append('file', file);
  Object.entries(extra).forEach(([k, v]) => fd.append(k, v));
  return request(path, { method: 'POST', body: fd });
}

export const cmsApi = {
  login: (username, password) =>
    request('/cms/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getContent: () => request('/cms/content'),
  updateContent: (payload) =>
    request('/cms/content', { method: 'PUT', body: JSON.stringify(payload) }),
  uploadImage: (file, imageKey) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('imageKey', imageKey);
    return request('/cms/upload', { method: 'POST', body: fd });
  },
};

export const productsApi = {
  list: () => request('/products'),
  get: (id) => request(`/products/${id}`),
  create: (product) =>
    request('/products', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, product) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  uploadImages: (id, files, { setPrimary = false } = {}) =>
    uploadFiles(`/products/${id}/images`, files, { setPrimary: String(setPrimary) }),
  replaceImage: (id, file) => uploadSingle(`/products/${id}/image`, file),
  deleteImage: (id, imageId) => request(`/products/${id}/images/${imageId}`, { method: 'DELETE' }),
  setPrimaryImage: (id, imageId) =>
    request(`/products/${id}/primary-image`, {
      method: 'PUT',
      body: JSON.stringify({ imageId }),
    }),
};

export const machineryApi = {
  list: () => request('/machinery'),
  get: (id) => request(`/machinery/${id}`),
  create: (machine) =>
    request('/machinery', { method: 'POST', body: JSON.stringify(machine) }),
  update: (id, machine) =>
    request(`/machinery/${id}`, { method: 'PUT', body: JSON.stringify(machine) }),
  delete: (id) => request(`/machinery/${id}`, { method: 'DELETE' }),
  uploadImages: (id, files, { setPrimary = false } = {}) =>
    uploadFiles(`/machinery/${id}/images`, files, { setPrimary: String(setPrimary) }),
  replaceImage: (id, file) => uploadSingle(`/machinery/${id}/image`, file),
  deleteImage: (id, imageId) =>
    request(`/machinery/${id}/images/${imageId}`, { method: 'DELETE' }),
  setPrimaryImage: (id, imageId) =>
    request(`/machinery/${id}/primary-image`, {
      method: 'PUT',
      body: JSON.stringify({ imageId }),
    }),
};

/** @deprecated Use productsApi / machineryApi — kept for gradual migration */
export const cmsApiLegacy = {
  addProduct: productsApi.create,
  updateProduct: productsApi.update,
  deleteProduct: productsApi.delete,
  uploadProductImages: productsApi.uploadImages,
  replaceProductImage: productsApi.replaceImage,
  deleteProductImage: productsApi.deleteImage,
  setProductPrimaryImage: productsApi.setPrimaryImage,
  addMachinery: machineryApi.create,
  updateMachinery: machineryApi.update,
  deleteMachinery: machineryApi.delete,
  uploadMachineryImages: machineryApi.uploadImages,
  replaceMachineryImage: machineryApi.replaceImage,
  deleteMachineryImage: machineryApi.deleteImage,
  setMachineryPrimaryImage: machineryApi.setPrimaryImage,
};
