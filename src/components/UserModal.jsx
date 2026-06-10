import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';
import { getCountryFlag } from '../utils/mapUsers';
import { createFocusTrap } from '../utils/focusTrap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function UserModal() {
  const { selectedUser, closeModal } = useUsers();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerElementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (!selectedUser) {
      return undefined;
    }

    triggerElementRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const removeFocusTrap = modalRef.current
      ? createFocusTrap(modalRef.current, handleClose)
      : () => {};

    return () => {
      window.clearTimeout(focusTimer);
      removeFocusTrap();
      document.body.style.overflow = '';

      if (triggerElementRef.current instanceof HTMLElement) {
        triggerElementRef.current.focus();
      }
    };
  }, [selectedUser, handleClose]);

  return (
    <AnimatePresence>
      {selectedUser && (
        <motion.div
          ref={modalRef}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-status"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200/60 bg-white/95 p-6 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Close user details dialog"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={selectedUser.avatar}
                  alt=""
                  aria-hidden="true"
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/10"
                />
                <span
                  className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-slate-900 ${
                    selectedUser.online ? 'bg-emerald-500' : 'bg-red-600'
                  }`}
                  aria-hidden="true"
                />
              </div>

              <h2 id="modal-title" className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                {selectedUser.name}
              </h2>

              <p
                id="modal-status"
                className={`mt-2 rounded-full px-3 py-1 text-sm font-semibold ${
                  selectedUser.online
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                    : 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100'
                }`}
              >
                {selectedUser.online ? 'Online' : 'Offline'}
              </p>
            </div>

            <dl className="mt-6 space-y-4">
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
            </dl>

            <button
              type="button"
              onClick={handleClose}
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
      <dt className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}
