import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchUsers } from '../services/api';
import { mapUsers } from '../utils/mapUsers';
import { calculateStatistics, getOnlineOfflineCounts } from '../utils/statistics';

export const UserContext = createContext(null);

const FILTER_STORAGE_KEY = 'userhub-filters';
const THEME_STORAGE_KEY = 'userhub-theme';

function loadStoredFilters() {
  try {
    const stored = localStorage.getItem(FILTER_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        search: parsed.search || '',
        activeFilter: parsed.activeFilter || 'all',
      };
    }
  } catch {
    // ignore parse errors
  }
  return { search: '', activeFilter: 'all' };
}

function loadStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'dark';
}

export function UserProvider({ children }) {
  const storedFilters = loadStoredFilters();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(storedFilters.search);
  const [debouncedSearch, setDebouncedSearch] = useState(storedFilters.search);
  const [activeFilter, setActiveFilter] = useState(storedFilters.activeFilter);
  const [selectedUser, setSelectedUser] = useState(null);
  const [theme, setTheme] = useState(loadStoredTheme);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({ search, activeFilter })
    );
  }, [search, activeFilter]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rawUsers = await fetchUsers();
      setUsers(mapUsers(rawUsers));
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    let result = users;

    if (activeFilter === 'online') {
      result = result.filter((user) => user.online);
    } else if (activeFilter === 'recent') {
      result = result.filter((user) => user.recentlyAdded);
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.company.toLowerCase().includes(query)
      );
    }

    return result;
  }, [users, activeFilter, debouncedSearch]);

  const statistics = useMemo(
    () => calculateStatistics(filteredUsers),
    [filteredUsers]
  );

  const chartData = useMemo(
    () => getOnlineOfflineCounts(filteredUsers),
    [filteredUsers]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const openModal = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const value = useMemo(
    () => ({
      users,
      filteredUsers,
      loading,
      error,
      search,
      setSearch,
      activeFilter,
      setActiveFilter,
      selectedUser,
      openModal,
      closeModal,
      statistics,
      chartData,
      theme,
      toggleTheme,
      refreshUsers: loadUsers,
    }),
    [
      users,
      filteredUsers,
      loading,
      error,
      search,
      activeFilter,
      selectedUser,
      openModal,
      closeModal,
      statistics,
      chartData,
      theme,
      toggleTheme,
      loadUsers,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
