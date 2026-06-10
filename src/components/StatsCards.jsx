import { useMemo } from 'react';
import { motion } from 'framer-motion';
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
    dropdown: 'users',
    placeholder: 'View name and email',
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
    dropdown: null,
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
    dropdown: 'organizations',
    placeholder: 'View company names',
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
    dropdown: 'countries',
    placeholder: 'View country names',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
  },
];

const SELECT_CLASS =
  'mt-3 w-full rounded-lg border border-slate-200/60 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:bg-white/15';

function StatDropdown({ id, label, placeholder, options, resetKey }) {
  if (!options.length) {
    return (
      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500" aria-live="polite">
        No items match current filters
      </p>
    );
  }

  return (
    <div className="mt-3">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        key={resetKey}
        id={id}
        defaultValue=""
        className={SELECT_CLASS}
        aria-label={label}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function StatsCards() {
  const { statistics, filteredUsers } = useUsers();

  const dropdownOptions = useMemo(
    () => ({
      users: getUserNameEmailList(filteredUsers).map((user) => ({
        value: user.id,
        label: user.label,
      })),
      organizations: getOrganizationNames(filteredUsers).map((name) => ({
        value: name,
        label: name,
      })),
      countries: getCountryNames(filteredUsers).map((name) => ({
        value: name,
        label: name,
      })),
    }),
    [filteredUsers]
  );

  const dropdownResetKey = useMemo(
    () => filteredUsers.map((user) => user.id).join('-'),
    [filteredUsers]
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
          className="rounded-2xl border border-slate-200/60 bg-white/70 p-5 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white" aria-live="polite">
                {statistics[stat.key]}
              </p>

              {stat.dropdown === 'users' && (
                <StatDropdown
                  id="stat-dropdown-users"
                  label="View filtered users by name and email"
                  placeholder={stat.placeholder}
                  options={dropdownOptions.users}
                  resetKey={`users-${dropdownResetKey}`}
                />
              )}

              {stat.dropdown === 'organizations' && (
                <StatDropdown
                  id="stat-dropdown-organizations"
                  label="View organization company names"
                  placeholder={stat.placeholder}
                  options={dropdownOptions.organizations}
                  resetKey={`organizations-${dropdownResetKey}`}
                />
              )}

              {stat.dropdown === 'countries' && (
                <StatDropdown
                  id="stat-dropdown-countries"
                  label="View country names"
                  placeholder={stat.placeholder}
                  options={dropdownOptions.countries}
                  resetKey={`countries-${dropdownResetKey}`}
                />
              )}
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
              aria-hidden="true"
            >
              {stat.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
