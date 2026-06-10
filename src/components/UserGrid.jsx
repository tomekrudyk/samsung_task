import { AnimatePresence } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';
import UserCard from './UserCard';

export default function UserGrid() {
  const { filteredUsers, openModal } = useUsers();

  if (filteredUsers.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/60 bg-white/70 px-6 py-16 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-700/50">
          <svg
            className="h-8 w-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No users found</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      role="list"
      aria-label="User cards"
    >
      <AnimatePresence mode="popLayout">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} onClick={openModal} />
        ))}
      </AnimatePresence>
    </div>
  );
}
