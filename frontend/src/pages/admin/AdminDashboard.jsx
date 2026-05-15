import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Image,
  FileText,
  Package,
  Cog,
  LogOut,
  Save,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { cmsApi, setToken, getToken } from '../../lib/api';
import { useSiteContent } from '../../hooks/useSiteContent';
import ManageProductsSection from './sections/ManageProductsSection';
import ManageMachinerySection from './sections/ManageMachinerySection';

const IMAGE_KEYS = [
  { key: 'heroHome', label: 'Home — Hero banner' },
  { key: 'heroAbout', label: 'About — Hero banner' },
  { key: 'heroProducts', label: 'Products — Hero banner' },
  { key: 'heroInfrastructure', label: 'Infrastructure — Hero banner' },
  { key: 'heroContact', label: 'Contact — Hero banner' },
  { key: 'textileDetail', label: 'Textile detail / gallery' },
  { key: 'factoryFloor', label: 'Factory floor' },
  { key: 'infrastructureCapability', label: 'Infrastructure — capability section' },
];

const tabs = [
  { id: 'images', label: 'Site images', icon: Image },
  { id: 'manage-products', label: 'Manage Products', icon: Package },
  { id: 'manage-machinery', label: 'Manage Machinery', icon: Cog },
  { id: 'content', label: 'Content', icon: FileText },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { content, refresh } = useSiteContent();
  const [tab, setTab] = useState('images');
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState(null);
  const [uploading, setUploading] = useState(null);

  if (!getToken()) {
    navigate('/admin', { replace: true });
    return null;
  }

  const logout = () => {
    setToken(null);
    navigate('/admin', { replace: true });
  };

  const showStatus = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 3200);
  };

  const loadDraft = () => {
    setDraft(JSON.parse(JSON.stringify(content)));
  };

  const saveContent = async () => {
    if (!draft) return;
    try {
      const payload = {
        brand: draft.brand,
        company: draft.company,
        whyChooseUs: draft.whyChooseUs,
        homeProductPreviews: draft.homeServicePreviews,
        timeline: draft.timeline,
        infrastructureHighlights: draft.infrastructureHighlights,
        infrastructureCapability: draft.infrastructureCapability,
        pages: draft.pages,
        images: draft.images,
      };
      await cmsApi.updateContent(payload);
      await refresh();
      showStatus('Content saved successfully');
    } catch (e) {
      showStatus(e.message || 'Save failed');
    }
  };

  const handleUpload = async (imageKey, file) => {
    if (!file) return;
    setUploading(imageKey);
    try {
      await cmsApi.uploadImage(file, imageKey);
      await refresh();
      if (draft) {
        const updated = await cmsApi.getContent();
        setDraft((d) => ({ ...d, images: { ...d.images, ...updated.images } }));
      }
      showStatus(`Uploaded ${imageKey}`);
    } catch (e) {
      showStatus(e.message || 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const images = draft?.images ?? content.images;
  const isWideTab = tab === 'manage-products' || tab === 'manage-machinery';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-charcoal text-snow"
    >
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-lineDark bg-navy lg:flex">
        <motion.div
          className="border-b border-lineDark px-6 py-8"
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Vaaman Texprint</p>
          <h1 className="mt-2 font-serif text-xl">Admin</h1>
        </motion.div>
        <nav className="flex-1 space-y-1 p-4">
          {tabs.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                if (t.id === 'content' && !draft) loadDraft();
              }}
              whileHover={{ x: 4 }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                tab === t.id ? 'bg-gold/15 text-gold' : 'text-slate hover:bg-white/5 hover:text-snow'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </motion.button>
          ))}
        </nav>
        <motion.div className="space-y-2 border-t border-lineDark p-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate hover:bg-white/5 hover:text-gold"
          >
            <ExternalLink className="h-4 w-4" />
            View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate hover:bg-white/5 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </motion.div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-lineDark bg-navy/95 px-4 py-4 backdrop-blur-md lg:px-8">
          <motion.div className="flex gap-2 lg:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  if (t.id === 'content' && !draft) loadDraft();
                }}
                className={`rounded-lg px-3 py-1.5 text-xs uppercase tracking-wider ${
                  tab === t.id ? 'bg-gold/20 text-gold' : 'text-slate'
                }`}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
          <p className="hidden font-serif text-lg lg:block">
            {tabs.find((t) => t.id === tab)?.label}
          </p>
          {status && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gold"
            >
              {status}
            </motion.span>
          )}
        </header>

        <div className={`mx-auto p-4 lg:p-8 ${isWideTab ? 'max-w-7xl' : 'max-w-5xl'}`}>
          {tab === 'images' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {IMAGE_KEYS.map((item) => (
                <motion.div
                  key={item.key}
                  whileHover={{ y: -2 }}
                  className="overflow-hidden rounded-2xl border border-lineDark bg-navy/50 shadow-card"
                >
                  <motion.div className="aspect-video overflow-hidden bg-charcoal">
                    {images[item.key] && (
                      <img
                        src={images[item.key]}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    )}
                  </motion.div>
                  <motion.div className="p-4">
                    <p className="text-sm font-medium text-snow">{item.label}</p>
                    <p className="mt-1 truncate text-xs text-slate">{item.key}</p>
                    <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gold/40 bg-gold/5 py-3 text-xs font-semibold uppercase tracking-wider text-gold transition hover:bg-gold/10">
                      <Upload className="h-4 w-4" />
                      {uploading === item.key ? 'Uploading…' : 'Replace image'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleUpload(item.key, e.target.files?.[0]);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 'content' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {!draft ? (
                <button
                  type="button"
                  onClick={loadDraft}
                  className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
                >
                  Load content for editing
                </button>
              ) : (
                <div className="space-y-8">
                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Home hero</h2>
                    <div className="mt-4 space-y-4">
                      {['heroEyebrow', 'heroHeading', 'heroSubtext', 'ctaHeading', 'ctaSubtext'].map(
                        (field) => (
                          <motion.div key={field} layout>
                            <label className="text-xs uppercase tracking-wider text-slate">
                              {field}
                            </label>
                            <input
                              value={draft.company[field] || ''}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  company: { ...draft.company, [field]: e.target.value },
                                })
                              }
                              className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                            />
                          </motion.div>
                        )
                      )}
                    </div>
                  </section>
                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">About</h2>
                    <textarea
                      rows={4}
                      value={draft.company.about || ''}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          company: { ...draft.company, about: e.target.value },
                        })
                      }
                      className="mt-4 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-snow"
                    />
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Vision</h2>
                    <textarea
                      rows={3}
                      value={draft.company.vision || ''}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          company: { ...draft.company, vision: e.target.value },
                        })
                      }
                      className="mt-4 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-snow"
                    />
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Background</h2>
                    <textarea
                      rows={4}
                      value={draft.company.background || ''}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          company: { ...draft.company, background: e.target.value },
                        })
                      }
                      className="mt-4 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-snow"
                    />
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Statistics</h2>
                    <div className="mt-4 space-y-4">
                      {(draft.company.counters || []).map((c, idx) => (
                        <div
                          key={`${c.label}-${idx}`}
                          className="rounded-xl border border-lineDark bg-charcoal/40 p-4"
                        >
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                              <label className="text-xs uppercase tracking-wider text-slate">
                                Label
                              </label>
                              <input
                                value={c.label || ''}
                                onChange={(e) => {
                                  const next = [...draft.company.counters];
                                  next[idx] = { ...next[idx], label: e.target.value };
                                  setDraft({
                                    ...draft,
                                    company: { ...draft.company, counters: next },
                                  });
                                }}
                                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-wider text-slate">
                                Numeric
                              </label>
                              <input
                                value={String(c.numeric ?? '')}
                                onChange={(e) => {
                                  const next = [...draft.company.counters];
                                  next[idx] = {
                                    ...next[idx],
                                    numeric: Number(e.target.value || 0),
                                  };
                                  setDraft({
                                    ...draft,
                                    company: { ...draft.company, counters: next },
                                  });
                                }}
                                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                              />
                            </div>
                            <div>
                              <label className="text-xs uppercase tracking-wider text-slate">
                                Suffix
                              </label>
                              <input
                                value={c.suffix || ''}
                                onChange={(e) => {
                                  const next = [...draft.company.counters];
                                  next[idx] = { ...next[idx], suffix: e.target.value };
                                  setDraft({
                                    ...draft,
                                    company: { ...draft.company, counters: next },
                                  });
                                }}
                                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Why Choose Us</h2>
                    <div className="mt-4 space-y-4">
                      {(draft.whyChooseUs || []).map((it, idx) => (
                        <div
                          key={`${it.title}-${idx}`}
                          className="rounded-xl border border-lineDark bg-charcoal/40 p-4"
                        >
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Title
                          </label>
                          <input
                            value={it.title || ''}
                            onChange={(e) => {
                              const next = [...draft.whyChooseUs];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setDraft({ ...draft, whyChooseUs: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                          <label className="mt-3 block text-xs uppercase tracking-wider text-slate">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={it.description || ''}
                            onChange={(e) => {
                              const next = [...draft.whyChooseUs];
                              next[idx] = { ...next[idx], description: e.target.value };
                              setDraft({ ...draft, whyChooseUs: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Home Products Preview</h2>
                    <div className="mt-4 space-y-4">
                      {(draft.homeServicePreviews || []).map((it, idx) => (
                        <div
                          key={`${it.title}-${idx}`}
                          className="rounded-xl border border-lineDark bg-charcoal/40 p-4"
                        >
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Title
                          </label>
                          <input
                            value={it.title || ''}
                            onChange={(e) => {
                              const next = [...draft.homeServicePreviews];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setDraft({ ...draft, homeServicePreviews: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                          <label className="mt-3 block text-xs uppercase tracking-wider text-slate">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={it.description || ''}
                            onChange={(e) => {
                              const next = [...draft.homeServicePreviews];
                              next[idx] = { ...next[idx], description: e.target.value };
                              setDraft({ ...draft, homeServicePreviews: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Timeline</h2>
                    <div className="mt-4 space-y-4">
                      {(draft.timeline || []).map((t, idx) => (
                        <div
                          key={`${t.year}-${idx}`}
                          className="rounded-xl border border-lineDark bg-charcoal/40 p-4"
                        >
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                              <label className="text-xs uppercase tracking-wider text-slate">
                                Year
                              </label>
                              <input
                                value={t.year || ''}
                                onChange={(e) => {
                                  const next = [...draft.timeline];
                                  next[idx] = { ...next[idx], year: e.target.value };
                                  setDraft({ ...draft, timeline: next });
                                }}
                                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-xs uppercase tracking-wider text-slate">
                                Title
                              </label>
                              <input
                                value={t.title || ''}
                                onChange={(e) => {
                                  const next = [...draft.timeline];
                                  next[idx] = { ...next[idx], title: e.target.value };
                                  setDraft({ ...draft, timeline: next });
                                }}
                                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                              />
                            </div>
                          </div>
                          <label className="mt-3 block text-xs uppercase tracking-wider text-slate">
                            Detail
                          </label>
                          <textarea
                            rows={3}
                            value={t.detail || ''}
                            onChange={(e) => {
                              const next = [...draft.timeline];
                              next[idx] = { ...next[idx], detail: e.target.value };
                              setDraft({ ...draft, timeline: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Infrastructure</h2>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Highlights (one per line)
                        </label>
                        <textarea
                          rows={4}
                          value={(draft.infrastructureHighlights || []).join('\\n')}
                          onChange={(e) => {
                            const next = e.target.value
                              .split('\\n')
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setDraft({ ...draft, infrastructureHighlights: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Capability title
                        </label>
                        <input
                          value={draft.infrastructureCapability?.title || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              infrastructureCapability: {
                                ...(draft.infrastructureCapability || {}),
                                title: e.target.value,
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Capability body
                        </label>
                        <textarea
                          rows={4}
                          value={draft.infrastructureCapability?.body || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              infrastructureCapability: {
                                ...(draft.infrastructureCapability || {}),
                                body: e.target.value,
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-lineDark bg-navy/50 p-6">
                    <h2 className="font-serif text-lg text-gold">Page metadata</h2>
                    <div className="mt-4 space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Products eyebrow
                          </label>
                          <input
                            value={draft.pages?.products?.eyebrow || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  products: { ...(draft.pages?.products || {}), eyebrow: e.target.value },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Products section eyebrow
                          </label>
                          <input
                            value={draft.pages?.products?.sectionEyebrow || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  products: {
                                    ...(draft.pages?.products || {}),
                                    sectionEyebrow: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Products title
                        </label>
                        <input
                          value={draft.pages?.products?.title || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              pages: {
                                ...draft.pages,
                                products: { ...(draft.pages?.products || {}), title: e.target.value },
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Products subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={draft.pages?.products?.subtitle || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              pages: {
                                ...draft.pages,
                                products: { ...(draft.pages?.products || {}), subtitle: e.target.value },
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-slate resize-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Products section title
                          </label>
                          <input
                            value={draft.pages?.products?.sectionTitle || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  products: {
                                    ...(draft.pages?.products || {}),
                                    sectionTitle: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Products section subtitle
                          </label>
                          <input
                            value={draft.pages?.products?.sectionSubtitle || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  products: {
                                    ...(draft.pages?.products || {}),
                                    sectionSubtitle: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            About eyebrow
                          </label>
                          <input
                            value={draft.pages?.about?.eyebrow || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  about: {
                                    ...(draft.pages?.about || {}),
                                    eyebrow: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            About title
                          </label>
                          <input
                            value={draft.pages?.about?.title || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  about: {
                                    ...(draft.pages?.about || {}),
                                    title: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          About subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={draft.pages?.about?.subtitle || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              pages: {
                                ...draft.pages,
                                about: {
                                  ...(draft.pages?.about || {}),
                                  subtitle: e.target.value,
                                },
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-slate resize-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Infrastructure eyebrow
                          </label>
                          <input
                            value={draft.pages?.infrastructure?.eyebrow || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  infrastructure: {
                                    ...(draft.pages?.infrastructure || {}),
                                    eyebrow: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-wider text-slate">
                            Infrastructure title
                          </label>
                          <input
                            value={draft.pages?.infrastructure?.title || ''}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                pages: {
                                  ...draft.pages,
                                  infrastructure: {
                                    ...(draft.pages?.infrastructure || {}),
                                    title: e.target.value,
                                  },
                                },
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-wider text-slate">
                          Infrastructure subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={draft.pages?.infrastructure?.subtitle || ''}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              pages: {
                                ...draft.pages,
                                infrastructure: {
                                  ...(draft.pages?.infrastructure || {}),
                                  subtitle: e.target.value,
                                },
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-slate resize-none"
                        />
                      </div>
                    </div>
                  </section>
                  <motion.button
                    type="button"
                    onClick={saveContent}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy"
                  >
                    <Save className="h-4 w-4" />
                    Save all content
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {tab === 'manage-products' && (
            <ManageProductsSection
              products={content.servicesDetailed}
              onRefresh={refresh}
              showStatus={showStatus}
            />
          )}

          {tab === 'manage-machinery' && (
            <ManageMachinerySection
              machinery={content.machinery}
              onRefresh={refresh}
              showStatus={showStatus}
            />
          )}

        </div>
      </main>
    </motion.div>
  );
}
