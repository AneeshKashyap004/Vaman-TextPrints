import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Star, ImageIcon } from 'lucide-react';
import { productsApi } from '../../../lib/api';
import { resolveMediaUrl } from '../../../lib/media';
import ImageDropzone from '../components/ImageDropzone';
import ConfirmModal from '../components/ConfirmModal';

const CATEGORIES = [
  '',
  'Processing',
  'Natural fibres',
  'Blends',
  'Regenerated fibres',
  'Stretch fabrics',
  'Printing',
  'Finishing',
  'Industrial',
];

const emptyProduct = () => ({
  title: 'New product',
  number: 1,
  category: '',
  summary: '',
  description: '',
  body: '',
  features: [],
});

export default function ManageProductsSection({ products, onRefresh, showStatus }) {
  const [editing, setEditing] = useState(null);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [pendingPreviews, setPendingPreviews] = useState([]);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const liveProduct =
    editing?.id && !editing.isNew ? products.find((p) => p.id === editing.id) : null;

  const startNew = () => {
    setEditing({ ...emptyProduct(), isNew: true });
    setPendingFiles([]);
    setPendingPreviews([]);
  };

  const startEdit = (p) => {
    setEditing({
      ...p,
      description: p.description || p.body || '',
      body: p.body || p.description || '',
      features: p.features || [],
      isNew: false,
    });
    setPendingFiles([]);
    setPendingPreviews([]);
  };

  const onPickFiles = (files) => {
    setPendingFiles((prev) => [...prev, ...files]);
    const next = files.map((f) => ({
      id: `${f.name}-${f.lastModified}-${Math.random()}`,
      url: URL.createObjectURL(f),
      file: f,
    }));
    setPendingPreviews((prev) => [...prev, ...next]);
  };

  const removePending = (id) => {
    const item = pendingPreviews.find((p) => p.id === id);
    if (item?.url) URL.revokeObjectURL(item.url);
    setPendingPreviews((prev) => prev.filter((p) => p.id !== id));
    if (item?.file) {
      setPendingFiles((prev) => prev.filter((f) => f !== item.file));
    }
  };

  const saveProduct = async () => {
    if (!editing) return;
    if (!editing.title?.trim()) {
      showStatus('Product name is required');
      return;
    }
    setBusy(true);
    try {
      const payload = {
        title: editing.title.trim(),
        number: Number(editing.number) || 1,
        category: editing.category,
        summary: editing.summary,
        description: editing.description,
        body: editing.description || editing.body,
        features: editing.features,
      };

      let saved;
      if (editing.isNew) {
        saved = await productsApi.create(payload);
      } else {
        saved = await productsApi.update(editing.id, payload);
      }

      const id = saved.id;
      if (pendingFiles.length) {
        await productsApi.uploadImages(id, pendingFiles, { setPrimary: !saved.image });
      }

      await onRefresh();
      showStatus(editing.isNew ? 'Product created' : 'Product saved');
      setEditing(null);
      pendingPreviews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
      setPendingPreviews([]);
      setPendingFiles([]);
    } catch (e) {
      showStatus(e.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const uploadMore = async (productId, files) => {
    if (!files.length) return;
    setBusy(true);
    try {
      await productsApi.uploadImages(productId, files);
      await onRefresh();
      showStatus('Images uploaded');
    } catch (e) {
      showStatus(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const replacePrimary = async (productId, file) => {
    if (!file) return;
    setBusy(true);
    try {
      await productsApi.replaceImage(productId, file);
      await onRefresh();
      showStatus('Primary image updated');
    } catch (e) {
      showStatus(e.message || 'Replace failed');
    } finally {
      setBusy(false);
    }
  };

  const setPrimary = async (productId, imageId) => {
    setBusy(true);
    try {
      await productsApi.setPrimaryImage(productId, imageId);
      await onRefresh();
      showStatus('Primary image set');
    } catch (e) {
      showStatus(e.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  const deleteImage = async (productId, imageId) => {
    setBusy(true);
    try {
      await productsApi.deleteImage(productId, imageId);
      await onRefresh();
      showStatus('Image removed');
    } catch (e) {
      showStatus(e.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const performDelete = async () => {
    if (!confirm?.id) return;
    setBusy(true);
    try {
      await productsApi.delete(confirm.id);
      await onRefresh();
      showStatus('Product deleted');
      if (editing?.id === confirm.id) setEditing(null);
    } catch (e) {
      showStatus(e.message || 'Delete failed');
    } finally {
      setBusy(false);
      setConfirm(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-snow">Manage Products</h2>
          <p className="mt-1 text-sm text-slate">
            Add, edit, and upload images for product programmes.
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
        >
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      <motion.div className="grid gap-4 lg:grid-cols-2">
        {products.map((p, i) => {
          const thumb = resolveMediaUrl(p.image || p.images?.[0]?.url);
          return (
            <motion.article
              key={p.id}
              layout
              whileHover={{ y: -2 }}
              className="overflow-hidden rounded-2xl border border-lineDark bg-navy/50"
            >
              <div className="flex gap-0 sm:flex-row">
                <motion.div className="relative aspect-[4/3] w-full flex-shrink-0 bg-charcoal sm:w-40">
                  {thumb ? (
                    <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <motion.div className="flex h-full items-center justify-center text-slate">
                      <ImageIcon className="h-8 w-8 opacity-40" />
                    </motion.div>
                  )}
                </motion.div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
                    {String(p.number ?? i + 1).padStart(2, '0')} — {p.category || ''}
                  </p>
                  <h3 className="mt-2 font-serif text-lg text-snow">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="rounded-full border border-gold/30 px-4 py-1.5 text-xs text-gold hover:bg-gold/10"
                    >
                      Edit
                    </button>
                    <label className="cursor-pointer rounded-full border border-lineDark px-4 py-1.5 text-xs text-slate hover:text-snow">
                      Replace image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          replacePrimary(p.id, e.target.files?.[0]);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setConfirm({
                          id: p.id,
                          title: 'Delete product',
                          message: `Remove "${p.title}" and all uploaded images?`,
                        })
                      }
                      className="rounded-full px-2 py-1.5 text-slate hover:text-red-400"
                      aria-label="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-gold/25 bg-navy/80 p-6 shadow-lift"
        >
          <h3 className="font-serif text-xl text-gold">
            {editing.isNew ? 'New product' : `Edit — ${editing.title}`}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate">Product name</label>
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate">Product number</label>
              <input
                type="number"
                min={1}
                value={editing.number ?? 1}
                onChange={(e) => setEditing({ ...editing, number: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Category</label>
              <select
                value={editing.category || ''}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Short summary</label>
              <textarea
                rows={2}
                value={editing.summary || ''}
                onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Description</label>
              <textarea
                rows={4}
                value={editing.description || ''}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">
                Features (one per line)
              </label>
              <textarea
                rows={3}
                value={(editing.features || []).join('\n')}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    features: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
              />
            </div>
          </div>

          {!editing.isNew && (liveProduct?.images?.length > 0 || liveProduct?.image) && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Gallery</p>
              <motion.div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(liveProduct?.images || []).map((img) => {
                  const src = resolveMediaUrl(img.thumbUrl || img.url);
                  const isPrimary = liveProduct?.image === img.url;
                  return (
                    <div
                      key={img.id}
                      className={`relative overflow-hidden rounded-xl border ${
                        isPrimary ? 'border-gold' : 'border-lineDark'
                      }`}
                    >
                      <img src={src} alt="" className="aspect-square w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-charcoal/80 p-1.5">
                        <button
                          type="button"
                          title="Set as primary"
                          onClick={() => setPrimary(editing.id, img.id)}
                          className={`rounded p-1 ${isPrimary ? 'text-gold' : 'text-slate hover:text-gold'}`}
                        >
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteImage(editing.id, img.id)}
                          className="ml-auto rounded p-1 text-slate hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          )}

          <div className="mt-6">
            <ImageDropzone
              label={editing.isNew ? 'Product images (preview before save)' : 'Add more images'}
              previews={pendingPreviews}
              onFilesSelected={onPickFiles}
              onRemovePreview={removePending}
              busy={busy}
            />
            {!editing.isNew && (
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-gold">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    uploadMore(editing.id, Array.from(e.target.files || []));
                    e.target.value = '';
                  }}
                />
                Quick upload without opening editor
              </label>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={saveProduct}
              className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {busy ? 'Saving…' : 'Save product'}
            </button>
            <button
              type="button"
              onClick={() => {
                pendingPreviews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
                setEditing(null);
              }}
              className="rounded-full border border-lineDark px-6 py-3 text-sm text-slate"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <ConfirmModal
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        onCancel={() => setConfirm(null)}
        onConfirm={performDelete}
      />
    </motion.div>
  );
}
