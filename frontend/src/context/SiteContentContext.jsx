import { useEffect, useState, useMemo, useCallback } from 'react';
import * as defaults from '../data/siteContent';
import { cmsApi, productsApi, machineryApi } from '../lib/api';
import { SiteContentContext } from './siteContentContext';

function normalize(data, products, machinery) {
  const images = {
    ...defaults.images,
    ...(data?.images || {}),
    heroServices: data?.images?.heroProducts ?? data?.images?.heroServices,
    heroProducts:
      data?.images?.heroProducts ?? data?.images?.heroServices ?? defaults.images.heroProducts,
  };

  return {
    brand: { ...defaults.brand, ...(data?.brand || {}) },
    images,
    company: { ...defaults.company, ...(data?.company || {}) },
    whyChooseUs: data?.whyChooseUs ?? defaults.whyChooseUs,
    homeServicePreviews: data?.homeProductPreviews ?? defaults.homeServicePreviews,
    servicesDetailed: products,
    machinery,
    timeline: data?.timeline ?? defaults.timeline,
    infrastructureHighlights:
      data?.infrastructureHighlights ?? defaults.infrastructureHighlights,
    infrastructureCapability: data?.infrastructureCapability ?? {
      title: 'For best quality and quantity production',
      body: defaults.company?.about,
    },
    pages: data?.pages ?? {},
  };
}

const emptyContent = normalize({}, [], []);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(emptyContent);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [site, productsRes, machineryRes] = await Promise.all([
        cmsApi.getContent(),
        productsApi.list(),
        machineryApi.list(),
      ]);
      const products = productsRes.products ?? [];
      const machinery = machineryRes.machinery ?? [];
      setContent(normalize(site, products, machinery));
    } catch {
      setContent(
        normalize(
          {},
          defaults.servicesDetailed,
          defaults.machinery.map((m, i) => ({
            ...m,
            id: m.id || `machine-${i}`,
            highlights: m.highlights || [],
            images: m.images || [],
            image: m.image || null,
          }))
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [site, productsRes, machineryRes] = await Promise.all([
          cmsApi.getContent(),
          productsApi.list(),
          machineryApi.list(),
        ]);
        if (!cancelled) {
          setContent(
            normalize(site, productsRes.products ?? [], machineryRes.machinery ?? [])
          );
        }
      } catch {
        if (!cancelled) {
          setContent(
            normalize(
              {},
              defaults.servicesDetailed,
              defaults.machinery.map((m, i) => ({
                ...m,
                id: m.id || `machine-${i}`,
                highlights: m.highlights || [],
                images: m.images || [],
                image: m.image || null,
              }))
            )
          );
        }
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
