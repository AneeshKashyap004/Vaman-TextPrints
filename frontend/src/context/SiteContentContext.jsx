import { useEffect, useState, useMemo, useCallback } from 'react';
import * as defaults from '../data/siteContent';
import { cmsApi } from '../lib/api';
import { SiteContentContext } from './siteContentContext';

function normalize(data) {
  if (!data) return null;
  const images = {
    ...defaults.images,
    ...(data.images || {}),
    heroServices: data.images?.heroProducts ?? data.images?.heroServices,
    heroProducts: data.images?.heroProducts ?? data.images?.heroServices ?? defaults.images.heroProducts,
  };
  return {
    brand: { ...defaults.brand, ...data.brand },
    images,
    company: { ...defaults.company, ...data.company },
    whyChooseUs: data.whyChooseUs ?? defaults.whyChooseUs,
    homeServicePreviews: data.homeProductPreviews ?? defaults.homeServicePreviews,
    servicesDetailed: data.products ?? defaults.servicesDetailed,
    machinery: data.machinery ?? defaults.machinery,
    timeline: data.timeline ?? defaults.timeline,
    infrastructureHighlights: data.infrastructureHighlights ?? defaults.infrastructureHighlights,
    infrastructureCapability: data.infrastructureCapability ?? {
      title: 'For best quality and quantity production',
      body: defaults.company?.about,
    },
    pages: data.pages ?? {},
  };
}

const fallback = normalize({
  brand: defaults.brand,
  images: defaults.images,
  company: defaults.company,
  whyChooseUs: defaults.whyChooseUs,
  homeProductPreviews: defaults.homeServicePreviews,
  products: defaults.servicesDetailed,
  machinery: defaults.machinery,
  timeline: defaults.timeline,
  infrastructureHighlights: defaults.infrastructureHighlights,
});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await cmsApi.getContent();
      setContent(normalize(data) || fallback);
    } catch {
      setContent(fallback);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await cmsApi.getContent();
        if (!cancelled) setContent(normalize(data) || fallback);
      } catch {
        if (!cancelled) setContent(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ content, loading, refresh, setContent }),
    [content, loading, refresh]
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}
