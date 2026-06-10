import { motion } from 'framer-motion';
import { getCountryFlag } from '../utils/mapUsers';

export default function UserCard({ user, onClick }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onClick(user)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(user);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${user.name}`}
      className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/90 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-900"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="h-16 w-16 rounded-xl object-cover ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span
            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 ${
              user.online ? 'bg-emerald-400' : 'bg-red-500'
            }`}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white">{user.name}</h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                user.online
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {user.online ? 'Online' : 'Offline'}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.phone}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-300">
              {user.company}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <span aria-hidden="true">{getCountryFlag(user.countryCode)}</span>
              {user.country}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
