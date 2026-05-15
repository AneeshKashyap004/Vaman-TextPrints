import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function EntityEditorModal({ open, title, onClose, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
            aria-label="Close editor"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-lineDark bg-navy shadow-lift sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-lineDark px-6 py-5">
              <h3 className="font-serif text-xl text-gold">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate hover:bg-white/5 hover:text-snow"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            {footer && (
              <div className="border-t border-lineDark bg-navy/95 px-6 py-4 backdrop-blur-md">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
