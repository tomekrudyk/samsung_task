import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';

export default function SearchBar() {
  const { search, setSearch } = useUsers();
  const { register, watch, setValue } = useForm({
    defaultValues: { query: search },
  });

  const query = watch('query');

  useEffect(() => {
    setSearch(query || '');
  }, [query, setSearch]);

  useEffect(() => {
    setValue('query', search);
  }, [search, setValue]);

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="relative w-full"
      role="search"
      aria-label="Search users"
    >
      <label htmlFor="user-search" className="sr-only">
        Search users by name, email, or company
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        id="user-search"
        type="search"
        placeholder="Search by name, email, or company..."
        autoComplete="off"
        {...register('query')}
        className="w-full rounded-xl border border-slate-200/60 bg-white/70 py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 shadow-glass backdrop-blur-xl transition-all duration-200 focus:border-indigo-400/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
        aria-label="Search users by name, email, or company"
      />
    </form>
  );
}
