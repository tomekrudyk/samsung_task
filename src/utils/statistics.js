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
    label: `${user.name} — ${user.email}`,
  }));
}

export function getOrganizationNames(users) {
  return [...new Set(users.map((user) => user.company))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getCountryNames(users) {
  return [...new Set(users.map((user) => user.country))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getOnlineOfflineCounts(users) {
  const online = users.filter((user) => user.online).length;
  const offline = users.length - online;

  return { online, offline };
}
