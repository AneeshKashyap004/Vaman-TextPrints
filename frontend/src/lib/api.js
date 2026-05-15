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
  addProduct: (product) =>
    request('/cms/products', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id, product) =>
    request(`/cms/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  deleteProduct: (id) => request(`/cms/products/${id}`, { method: 'DELETE' }),
};
