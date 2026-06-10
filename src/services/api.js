const API_URL = 'https://randomuser.me/api/?results=12';

export async function fetchUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    throw new Error('Invalid API response: expected an array of users.');
  }

  return data.results;
}
