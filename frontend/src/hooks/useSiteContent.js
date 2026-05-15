import { useContext } from 'react';
import { SiteContentContext } from '../context/siteContentContext';

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}
