import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            aria-label="Close"
            onClick={onCancel}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            className="relative w-full max-w-md rounded-2xl border border-lineDark bg-navy p-6 shadow-lift"
          >
            <h3 className="font-serif text-xl text-snow">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">{message}</p>
            <motion.div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-lineDark px-5 py-2.5 text-sm text-slate hover:text-snow"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-full bg-red-500/90 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
              >
                {confirmLabel}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
