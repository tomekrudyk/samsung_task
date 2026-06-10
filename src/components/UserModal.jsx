import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';
import { getCountryFlag } from '../utils/mapUsers';

export default function UserModal() {
  const { selectedUser, closeModal } = useUsers();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (selectedUser) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedUser, handleKeyDown]);

  return (
    <AnimatePresence>
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200/60 bg-white/95 p-6 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 modal-panel"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={selectedUser.avatar}
                  alt={`${selectedUser.name}'s avatar`}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/10"
                />
                <span
                  className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-3 border-slate-900 ${
                    selectedUser.online ? 'bg-emerald-400' : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
              </div>

              <h2 id="modal-title" className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                {selectedUser.name}
              </h2>

              <span
                className={`mt-2 rounded-full px-3 py-1 text-sm font-medium ${
                  selectedUser.online
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {selectedUser.online ? 'Online' : 'Offline'}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="Phone" value={selectedUser.phone} />
              <DetailRow
                label="Country"
                value={
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{getCountryFlag(selectedUser.countryCode)}</span>
                    {selectedUser.country}
                  </span>
                }
              />
              <DetailRow label="Company" value={selectedUser.company} />
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="mt-6 w-full rounded-xl border border-slate-200/60 bg-slate-100 py-2.5 text-sm font-medium text-slate-900 transition-all duration-200 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 dark:bg-white/5">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}
