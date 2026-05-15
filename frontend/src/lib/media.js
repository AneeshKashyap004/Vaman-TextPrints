const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export function resolveMediaUrl(urlOrPath) {
  if (!urlOrPath) return null;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${API_ORIGIN}${path}`;
}

export function pickPrimaryImage(entity, fallback) {
  if (!entity) return fallback;
  const primary = entity.image || entity.images?.[0]?.url || entity.images?.[0]?.path;
  return resolveMediaUrl(primary) || fallback;
}

export function pickThumb(entity) {
  const img = entity?.images?.find((i) => i.url === entity.image) || entity?.images?.[0];
  return resolveMediaUrl(img?.thumbUrl || img?.url || entity?.image);
}
