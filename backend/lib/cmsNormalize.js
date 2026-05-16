function slugify(text) {
  return String(text || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

export function normalizeProduct(product, index = 0) {
  const p = product || {};
  const id = p.id || `product-${Date.now()}-${index}`;
  const number = p.number != null && p.number !== '' ? Number(p.number) : index + 1;
  const description = p.description || p.body || '';
  return {
    id,
    number: Number.isFinite(number) ? number : index + 1,
    title: p.title || 'New product',
    summary: p.summary || '',
    description,
    body: p.body || description,
    category: p.category || '',
    image: p.image || null,
    images: Array.isArray(p.images) ? p.images : [],
    features: Array.isArray(p.features) ? p.features : [],
  };
}

export function normalizeMachinery(machine, index = 0) {
  const m = machine || {};
  const id = m.id || slugify(m.name) || `machine-${index}`;
  const note = m.note || '';
  const description = m.description || note;
  return {
    id,
    name: m.name || 'New machine',
    description,
    note: note || description,
    highlights: Array.isArray(m.highlights) ? m.highlights : [],
    image: m.image || null,
    images: Array.isArray(m.images) ? m.images : [],
  };
}

export function normalizeSiteData(data) {
  const products = (data.products || []).map((p, i) => normalizeProduct(p, i));
  const machinery = (data.machinery || []).map((m, i) => normalizeMachinery(m, i));
  return { ...data, products, machinery };
}
