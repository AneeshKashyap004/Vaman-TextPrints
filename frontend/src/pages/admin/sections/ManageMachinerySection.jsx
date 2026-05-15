import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Star, Cog } from 'lucide-react';
import { machineryApi } from '../../../lib/api';
import { resolveMediaUrl } from '../../../lib/media';
import ImageDropzone from '../components/ImageDropzone';
import ConfirmModal from '../components/ConfirmModal';

const emptyMachine = () => ({
  name: 'New machine',
  description: '',
  note: '',
  highlights: [],
});

export default function ManageMachinerySection({ machinery, onRefresh, showStatus }) {
  const [editing, setEditing] = useState(null);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [pendingPreviews, setPendingPreviews] = useState([]);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const liveMachine =
    editing?.id && !editing.isNew ? machinery.find((m) => m.id === editing.id) : null;

  const startNew = () => {
    setEditing({ ...emptyMachine(), isNew: true });
    setPendingFiles([]);
    setPendingPreviews([]);
  };

  const startEdit = (m) => {
    setEditing({
      ...m,
      highlights: m.highlights || [],
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
    if (item?.file) setPendingFiles((prev) => prev.filter((f) => f !== item.file));
  };

  const saveMachine = async () => {
    if (!editing) return;
    if (!editing.name?.trim()) {
      showStatus('Machine name is required');
      return;
    }
    setBusy(true);
    try {
      const payload = {
        name: editing.name,
        description: editing.description,
        note: editing.note || editing.description,
        highlights: editing.highlights,
      };

      let saved;
      if (editing.isNew) {
        saved = await machineryApi.create(payload);
      } else {
        saved = await machineryApi.update(editing.id, payload);
      }

      const id = saved.id;
      if (pendingFiles.length) {
        await machineryApi.uploadImages(id, pendingFiles, { setPrimary: !saved.image });
      }

      await onRefresh();
      showStatus(editing.isNew ? 'Machinery added' : 'Machinery saved');
      pendingPreviews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
      setPendingPreviews([]);
      setPendingFiles([]);
      setEditing(null);
    } catch (e) {
      showStatus(e.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const replacePrimary = async (id, file) => {
    if (!file) return;
    setBusy(true);
    try {
      await machineryApi.replaceImage(id, file);
      await onRefresh();
      showStatus('Machine image updated');
    } catch (e) {
      showStatus(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const setPrimary = async (id, imageId) => {
    setBusy(true);
    try {
      await machineryApi.setPrimaryImage(id, imageId);
      await onRefresh();
      showStatus('Primary image set');
    } catch (e) {
      showStatus(e.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  const deleteImage = async (id, imageId) => {
    setBusy(true);
    try {
      await machineryApi.deleteImage(id, imageId);
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
      await machineryApi.delete(confirm.id);
      await onRefresh();
      showStatus('Machinery deleted');
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
      <motion.div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-snow">Manage Machinery</h2>
          <p className="mt-1 text-sm text-slate">
            Upload and manage images for each production line.
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
        >
          <Plus className="h-4 w-4" />
          Add machinery
        </button>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {machinery.map((m, i) => {
          const thumb = resolveMediaUrl(m.image || m.images?.[0]?.url);
          return (
            <motion.article
              key={m.id || m.name}
              layout
              whileHover={{ y: -2 }}
              className="overflow-hidden rounded-2xl border border-lineDark bg-navy/50"
            >
              <motion.div className="relative aspect-[16/10] bg-charcoal">
                {thumb ? (
                  <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate">
                    <Cog className="h-10 w-10 opacity-35" />
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-snow">{m.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate">{m.note || m.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(m)}
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
                        replacePrimary(m.id, e.target.files?.[0]);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirm({
                        id: m.id,
                        title: 'Delete machinery',
                        message: `Remove "${m.name}" and all images?`,
                      })
                    }
                    className="text-slate hover:text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
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
          className="mt-8 rounded-2xl border border-gold/25 bg-navy/80 p-6"
        >
          <h3 className="font-serif text-xl text-gold">
            {editing.isNew ? 'New machinery' : `Edit — ${editing.name}`}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Machine name</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Description</label>
              <textarea
                rows={3}
                value={editing.description || ''}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">Card note</label>
              <input
                value={editing.note || ''}
                onChange={(e) => setEditing({ ...editing, note: e.target.value })}
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-2.5 text-sm text-snow"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-slate">
                Technical highlights (one per line)
              </label>
              <textarea
                rows={3}
                value={(editing.highlights || []).join('\n')}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    highlights: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="mt-1 w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-sm text-slate resize-none"
              />
            </div>
          </div>

          {!editing.isNew && liveMachine?.images?.length > 0 && (
            <motion.div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Image gallery</p>
              <motion.div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(liveMachine?.images || []).map((img) => {
                  const src = resolveMediaUrl(img.thumbUrl || img.url);
                  const isPrimary = liveMachine?.image === img.url;
                  return (
                    <div
                      key={img.id}
                      className={`relative overflow-hidden rounded-xl border ${
                        isPrimary ? 'border-gold' : 'border-lineDark'
                      }`}
                    >
                      <img src={src} alt="" className="aspect-square w-full object-cover" />
                      <motion.div className="absolute inset-x-0 bottom-0 flex gap-1 bg-charcoal/80 p-1.5">
                        <button
                          type="button"
                          onClick={() => setPrimary(editing.id, img.id)}
                          className={isPrimary ? 'text-gold' : 'text-slate hover:text-gold'}
                        >
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteImage(editing.id, img.id)}
                          className="ml-auto text-slate hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          <div className="mt-6">
            <ImageDropzone
              label="Machine images"
              previews={pendingPreviews}
              onFilesSelected={onPickFiles}
              onRemovePreview={removePending}
              busy={busy}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={saveMachine}
              className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {busy ? 'Saving…' : 'Save machinery'}
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
