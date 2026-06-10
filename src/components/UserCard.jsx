import { motion } from 'framer-motion';
import { getCountryFlag } from '../utils/mapUsers';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function UserCard({ user, onClick }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
      className="list-none"
    >
      <motion.button
        type="button"
        whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.2 } }}
        onClick={() => onClick(user)}
        aria-label={`View details for ${user.name}, ${user.online ? 'online' : 'offline'}, ${user.company}, ${user.country}`}
        className="group w-full cursor-pointer rounded-2xl border border-slate-200/60 bg-white/70 p-5 text-left shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/90 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-900"
      >
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={user.avatar}
              alt=""
              aria-hidden="true"
              className="h-16 w-16 rounded-xl object-cover ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 ${
                user.online ? 'bg-emerald-500' : 'bg-red-600'
              }`}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-lg font-semibold text-slate-900 dark:text-white">{user.name}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  user.online
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                    : 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100'
                }`}
              >
                {user.online ? 'Online' : 'Offline'}
              </span>
            </div>

            <p className="mt-1 truncate text-sm text-slate-700 dark:text-slate-200">{user.email}</p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{user.phone}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
                {user.company}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-200">
                <span aria-hidden="true">{getCountryFlag(user.countryCode)}</span>
                {user.country}
              </span>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.li>
  );
}
