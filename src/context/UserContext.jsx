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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(() => loadStoredFilters().search);
  const [debouncedSearch, setDebouncedSearch] = useState(() => loadStoredFilters().search);
  const [activeFilter, setActiveFilter] = useState(() => loadStoredFilters().activeFilter);
  const [selectedUser, setSelectedUser] = useState(null);
  const [theme, setTheme] = useState(loadStoredTheme);
  const [recordFilter, setRecordFilter] = useState(null);

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
    setSelectedUser(null);
    setRecordFilter(null);

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

  const applyRecordFilter = useCallback((filter) => {
    setRecordFilter((current) => {
      const isSameFilter =
        current?.type === filter.type &&
        current?.value === filter.value &&
        (filter.type !== 'user' || current?.id === filter.id);

      return isSameFilter ? null : filter;
    });
  }, []);

  const clearRecordFilter = useCallback(() => {
    setRecordFilter(null);
  }, []);

  const handleActiveFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    setRecordFilter(null);
  }, []);

  const displayUsers = useMemo(() => {
    if (!recordFilter) {
      return filteredUsers;
    }

    if (recordFilter.type === 'user') {
      return filteredUsers.filter((user) => user.id === recordFilter.id);
    }

    if (recordFilter.type === 'company') {
      return filteredUsers.filter((user) => user.company === recordFilter.value);
    }

    if (recordFilter.type === 'country') {
      return filteredUsers.filter((user) => user.country === recordFilter.value);
    }

    return filteredUsers;
  }, [filteredUsers, recordFilter]);

  const statistics = useMemo(
    () => calculateStatistics(displayUsers),
    [displayUsers]
  );

  const chartData = useMemo(
    () => getOnlineOfflineCounts(displayUsers),
    [displayUsers]
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
      filteredUsers: displayUsers,
      baseFilteredUsers: filteredUsers,
      loading,
      error,
      search,
      setSearch,
      activeFilter,
      setActiveFilter: handleActiveFilterChange,
      recordFilter,
      applyRecordFilter,
      clearRecordFilter,
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
      displayUsers,
      filteredUsers,
      loading,
      error,
      search,
      activeFilter,
      handleActiveFilterChange,
      recordFilter,
      applyRecordFilter,
      clearRecordFilter,
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
