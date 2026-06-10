import { useUsers } from '../hooks/useUsers';

export default function ErrorState() {
  const { error, refreshUsers } = useUsers();

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center backdrop-blur-xl"
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
        <svg
          className="h-8 w-8 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Unable to load users</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {error || 'Something went wrong while fetching user data. Please try again.'}
      </p>
      <button
        type="button"
        onClick={refreshUsers}
        className="mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        aria-label="Retry loading users"
      >
        Try Again
      </button>
    </div>
  );
}
