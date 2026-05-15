import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';

export default function ImageDropzone({
  label = 'Upload images',
  multiple = true,
  previews = [],
  onFilesSelected,
  onRemovePreview,
  busy = false,
}) {
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
      if (files.length) onFilesSelected(files);
    },
    [onFilesSelected]
  );

  return (
    <motion.div layout className="space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-8 text-center transition ${
          dragging
            ? 'border-gold bg-gold/10 text-gold'
            : 'border-gold/35 bg-gold/5 text-gold hover:bg-gold/10'
        } ${busy ? 'pointer-events-none opacity-60' : ''}`}
      >
        <Upload className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          {busy ? 'Uploading…' : label}
        </span>
        <span className="text-[11px] text-slate">Drag & drop or click to browse</span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((p) => (
            <motion.div
              key={p.id}
              layout
              className="group relative overflow-hidden rounded-xl border border-lineDark bg-charcoal"
            >
              <img src={p.url} alt="" className="aspect-square w-full object-cover" />
              {onRemovePreview && (
                <button
                  type="button"
                  onClick={() => onRemovePreview(p.id)}
                  className="absolute right-2 top-2 rounded-full bg-charcoal/80 p-1 text-slate hover:text-snow"
                  aria-label="Remove preview"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
