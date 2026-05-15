export function publicPath(...segments) {
  return `/uploads/${segments.filter(Boolean).join('/')}`.replace(/\/+/g, '/');
}

export function absoluteUrl(req, pathname) {
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${base.replace(/\/$/, '')}${pathname}`;
}

export function pathsFromStored(storedPath) {
  if (!storedPath) return { mainPath: null, thumbPath: null };
  const dir = storedPath.replace(/\/[^/]+$/, '');
  const base = storedPath.replace(/\.webp$/, '').replace(/-thumb$/, '');
  return {
    mainPath: storedPath.startsWith('/uploads/') ? storedPath : null,
    thumbPath: `${base}-thumb.webp`,
  };
}
