import { useUsers } from '../hooks/useUsers';

const FILTERS = [
  { id: 'all', label: 'All Users' },
  { id: 'online', label: 'Online Only' },
  { id: 'recent', label: 'Recently Added' },
];

export default function FilterBar() {
  const { activeFilter, setActiveFilter } = useUsers();

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter users"
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            aria-pressed={isActive}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900 ${
              isActive
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                : 'border border-slate-200/60 bg-white/70 text-slate-800 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-white/20 dark:hover:bg-white/10'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
