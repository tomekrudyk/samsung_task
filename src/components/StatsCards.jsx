import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';
import {
  getCountryNames,
  getOrganizationNames,
  getUserNameEmailList,
} from '../utils/statistics';

const STAT_CONFIG = [
  {
    key: 'totalUsers',
    label: 'Total Users',
    details: 'users',
    toggleLabel: 'Show name and email',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'activeSessions',
    label: 'Active Sessions',
    details: null,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'organizations',
    label: 'Organizations',
    details: 'organizations',
    toggleLabel: 'Show company names',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    key: 'countries',
    label: 'Countries',
    details: 'countries',
    toggleLabel: 'Show country names',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
  },
];

const ACTIVE_RECORD_CLASS =
  'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-400/40 dark:border-indigo-400 dark:bg-indigo-950/50';

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function StatDetailsToggle({ panelId, toggleLabel, ariaLabel, isEmpty, resetKey, fullWidth = false, children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [resetKey]);

  if (isEmpty) {
    return (
      <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300" aria-live="polite">
        No items match current filters
      </p>
    );
  }

  return (
    <div className={`mt-3 min-w-0 ${fullWidth ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
      >
        <span className="truncate">{isOpen ? 'Hide details' : toggleLabel}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full min-w-0 overflow-hidden"
            role="region"
            aria-label={ariaLabel}
          >
            <div className="stat-scroll-panel mt-2 w-full min-w-0 max-h-44 rounded-lg border border-slate-300 bg-slate-100 p-2 dark:border-slate-600 dark:bg-slate-800">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserDetailsList({ users, recordFilter, onSelectUser }) {
  return (
    <ul className="w-full min-w-0 space-y-2" aria-label="User names and emails">
      {users.map((user) => {
        const isActive = recordFilter?.type === 'user' && recordFilter.id === user.id;

        return (
          <li key={user.id} className="w-full min-w-0">
            <button
              type="button"
              onClick={() => onSelectUser(user)}
              aria-pressed={isActive}
              aria-label={`Filter users by ${user.name}`}
              className={`w-full rounded-md border px-3 py-2 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-slate-800 ${
                isActive
                  ? ACTIVE_RECORD_CLASS
                  : 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900'
              }`}
            >
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="mt-0.5 truncate text-xs text-slate-600 dark:text-slate-300">{user.email}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function TextDetailsList({ items, ariaLabel, countLabel, filterType, recordFilter, onSelectItem }) {
  return (
    <ul className="space-y-1.5" aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = recordFilter?.type === filterType && recordFilter.value === item.name;

        return (
          <li key={item.name} className="w-full">
            <button
              type="button"
              onClick={() => onSelectItem(item.name)}
              aria-pressed={isActive}
              aria-label={`Filter users by ${item.name}, ${item.count} ${countLabel}`}
              className={`flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-slate-800 ${
                isActive
                  ? ACTIVE_RECORD_CLASS
                  : 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900'
              }`}
            >
              <span className="min-w-0 truncate text-sm font-medium text-slate-900 dark:text-white">
                {item.name}
              </span>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {item.count}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function StatsCards() {
  const { statistics, baseFilteredUsers, recordFilter, applyRecordFilter } = useUsers();

  const detailData = useMemo(
    () => ({
      users: getUserNameEmailList(baseFilteredUsers),
      organizations: getOrganizationNames(baseFilteredUsers),
      countries: getCountryNames(baseFilteredUsers),
    }),
    [baseFilteredUsers]
  );

  const detailsResetKey = useMemo(
    () => baseFilteredUsers.map((user) => user.id).join('-'),
    [baseFilteredUsers]
  );

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      role="region"
      aria-label="User statistics"
    >
      {STAT_CONFIG.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="min-w-0 rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{stat.label}</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white" aria-live="polite">
                {statistics[stat.key]}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
              aria-hidden="true"
            >
              {stat.icon}
            </div>
          </div>

          {stat.details === 'users' && (
            <StatDetailsToggle
              panelId="stat-details-users"
              toggleLabel={stat.toggleLabel}
              ariaLabel="Filtered user names and emails"
              isEmpty={detailData.users.length === 0}
              resetKey={detailsResetKey}
              fullWidth
            >
              <UserDetailsList
                users={detailData.users}
                recordFilter={recordFilter}
                onSelectUser={(user) =>
                  applyRecordFilter({ type: 'user', id: user.id, value: user.name })
                }
              />
            </StatDetailsToggle>
          )}

          {stat.details === 'organizations' && (
            <StatDetailsToggle
              panelId="stat-details-organizations"
              toggleLabel={stat.toggleLabel}
              ariaLabel="Organization company names"
              isEmpty={detailData.organizations.length === 0}
              resetKey={detailsResetKey}
            >
              <TextDetailsList
                items={detailData.organizations}
                ariaLabel="Company names with user counts"
                countLabel="users"
                filterType="company"
                recordFilter={recordFilter}
                onSelectItem={(name) => applyRecordFilter({ type: 'company', value: name })}
              />
            </StatDetailsToggle>
          )}

          {stat.details === 'countries' && (
            <StatDetailsToggle
              panelId="stat-details-countries"
              toggleLabel={stat.toggleLabel}
              ariaLabel="Country names"
              isEmpty={detailData.countries.length === 0}
              resetKey={detailsResetKey}
            >
              <TextDetailsList
                items={detailData.countries}
                ariaLabel="Country names with user counts"
                countLabel="users"
                filterType="country"
                recordFilter={recordFilter}
                onSelectItem={(name) => applyRecordFilter({ type: 'country', value: name })}
              />
            </StatDetailsToggle>
          )}
        </motion.div>
      ))}
    </div>
  );
}
