# UserHub Explorer

A production-ready React dashboard for exploring user data from the RandomUser API. Built with React 18, Vite, Tailwind CSS, Context API, React Hook Form, Chart.js, and Framer Motion.

## Features

- **User Directory** — Fetches 12 users from the RandomUser API on startup
- **Real-time Search** — Debounced (300ms) search by name, email, or company via React Hook Form
- **Filters** — All Users, Online Only, Recently Added (persisted in localStorage)
- **Statistics Cards** — Total Users, Active Sessions, Organizations, Countries (updates with filters)
- **Analytics Chart** — Doughnut chart showing online vs offline users
- **User Details Modal** — Click any card to view full details (ESC / backdrop to close)
- **Dark/Light Theme** — Toggle with persistence in localStorage
- **Responsive Grid** — 1 / 2 / 4 columns for mobile / tablet / desktop
- **Loading Skeletons** — 12 animated placeholder cards
- **Error State** — Friendly message with retry button
- **Empty State** — Shown when no users match current filters

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Context API
- React Hook Form
- Chart.js + react-chartjs-2
- Framer Motion
- JavaScript (not TypeScript)

## Project Structure

```
src/
├── components/
│   ├── UserCard.jsx
│   ├── UserGrid.jsx
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   ├── StatsCards.jsx
│   ├── UserChart.jsx
│   ├── Loading.jsx
│   ├── ErrorState.jsx
│   └── UserModal.jsx
├── context/
│   └── UserContext.jsx
├── hooks/
│   └── useUsers.js
├── services/
│   └── api.js
├── utils/
│   ├── mapUsers.js
│   └── statistics.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd userhub-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Users load automatically on app startup from `https://randomuser.me/api/?results=12`
2. Use the search bar to filter by name, email, or company
3. Click filter buttons to show All Users, Online Only, or Recently Added
4. Click any user card to open the details modal
5. Use the theme toggle (sun/moon icon) to switch between dark and light modes
6. Click **Refresh Users** to fetch a new batch of users

## API

This app uses the free [RandomUser API](https://randomuser.me/) — no authentication required.

Company names and online status are generated dynamically since the API does not provide them.

## License

MIT
