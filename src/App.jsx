import { UserProvider } from './context/UserContext';
import { useUsers } from './hooks/useUsers';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import RecordFilterChip from './components/RecordFilterChip';
import StatsCards from './components/StatsCards';
import UserChart from './components/UserChart';
import UserGrid from './components/UserGrid';
import Loading from './components/Loading';
import ErrorState from './components/ErrorState';
import UserModal from './components/UserModal';

function Dashboard() {
  const { loading, error, refreshUsers, theme, toggleTheme, users } = useUsers();
  const isInitialLoad = loading && users.length === 0;

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              UserHub Explorer
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Discover and manage your user directory
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 transition-all duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-visible:ring-offset-slate-900"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={refreshUsers}
              disabled={loading}
              aria-busy={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
            >
              <svg
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Users
            </button>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        aria-busy={isInitialLoad}
      >
        {!isInitialLoad && !error && (
          <>
            <section className="mb-8" aria-labelledby="statistics-heading">
              <h2 id="statistics-heading" className="sr-only">
                User statistics
              </h2>
              <StatsCards />
            </section>

            <section className="mb-8 grid gap-6 lg:grid-cols-3" aria-labelledby="search-analytics-heading">
              <h2 id="search-analytics-heading" className="sr-only">
                Search, filters, and analytics
              </h2>
              <div className="space-y-4 lg:col-span-2">
                <SearchBar />
                <FilterBar />
                <RecordFilterChip />
              </div>
              <UserChart />
            </section>
          </>
        )}

        <section aria-labelledby="user-list-heading">
          <h2 id="user-list-heading" className="sr-only">
            User list
          </h2>
          {isInitialLoad && <Loading />}
          {error && !loading && <ErrorState />}
          {!isInitialLoad && !error && <UserGrid />}
        </section>
      </main>

      <UserModal />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}
