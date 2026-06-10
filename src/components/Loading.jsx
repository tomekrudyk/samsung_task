export default function Loading() {
  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      role="status"
      aria-label="Loading users"
      aria-live="polite"
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200/60 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-700/50" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700/50" />
              <div className="h-4 w-full rounded-lg bg-slate-200/80 dark:bg-slate-700/40" />
              <div className="h-4 w-2/3 rounded-lg bg-slate-200/80 dark:bg-slate-700/40" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-20 rounded-lg bg-slate-200/80 dark:bg-slate-700/40" />
                <div className="h-6 w-24 rounded-lg bg-slate-200/80 dark:bg-slate-700/40" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading user data...</span>
    </div>
  );
}
