const COMPANIES = ['Google', 'Microsoft', 'Spotify', 'Netflix', 'Amazon', 'OpenAI'];

const COUNTRY_FLAGS = {
  AU: '🇦🇺',
  BR: '🇧🇷',
  CA: '🇨🇦',
  CH: '🇨🇭',
  DE: '🇩🇪',
  DK: '🇩🇰',
  ES: '🇪🇸',
  FI: '🇫🇮',
  FR: '🇫🇷',
  GB: '🇬🇧',
  IE: '🇮🇪',
  IN: '🇮🇳',
  IR: '🇮🇷',
  MX: '🇲🇽',
  NL: '🇳🇱',
  NO: '🇳🇴',
  NZ: '🇳🇿',
  RS: '🇷🇸',
  TR: '🇹🇷',
  UA: '🇺🇦',
  US: '🇺🇸',
};

function getRandomCompany() {
  return COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
}

function getRandomOnlineStatus() {
  return Math.random() > 0.4;
}

export function getCountryFlag(countryCode) {
  return COUNTRY_FLAGS[countryCode] || '🌍';
}

export function mapUsers(rawUsers) {
  return rawUsers.map((user, index) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    avatar: user.picture.large,
    country: user.location.country,
    countryCode: user.nat,
    company: getRandomCompany(),
    online: getRandomOnlineStatus(),
    recentlyAdded: index < 4,
  }));
}
