import { useUsers } from '../hooks/useUsers';

const FILTER_LABELS = {
  user: 'User',
  company: 'Organization',
  country: 'Country',
};

export default function RecordFilterChip() {
  const { recordFilter, clearRecordFilter } = useUsers();

  if (!recordFilter) {
    return null;
  }

  const label = FILTER_LABELS[recordFilter.type] || 'Filter';

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-xl border border-indigo-300/60 bg-indigo-50 px-3 py-2 dark:border-indigo-500/40 dark:bg-indigo-950/40"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-slate-700 dark:text-slate-200">
        {label}:{' '}
        <span className="font-semibold text-slate-900 dark:text-white">{recordFilter.value}</span>
      </span>
      <button
        type="button"
        onClick={clearRecordFilter}
        className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-slate-900 dark:text-indigo-200 dark:hover:bg-slate-800"
        aria-label={`Clear ${label.toLowerCase()} filter for ${recordFilter.value}`}
      >
        Clear
      </button>
    </div>
  );
}
