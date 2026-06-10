export function calculateStatistics(users) {
  const totalUsers = users.length;
  const activeSessions = users.filter((user) => user.online).length;
  const organizations = new Set(users.map((user) => user.company)).size;
  const countries = new Set(users.map((user) => user.country)).size;

  return {
    totalUsers,
    activeSessions,
    organizations,
    countries,
  };
}

export function getUserNameEmailList(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
}

function getValueCounts(users, getValue) {
  const counts = new Map();

  users.forEach((user) => {
    const value = getValue(user);
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getOrganizationNames(users) {
  return getValueCounts(users, (user) => user.company);
}

export function getCountryNames(users) {
  return getValueCounts(users, (user) => user.country);
}

export function getOnlineOfflineCounts(users) {
  const online = users.filter((user) => user.online).length;
  const offline = users.length - online;

  return { online, offline };
}
