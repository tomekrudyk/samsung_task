import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';
import { useReducedMotion } from '../hooks/useReducedMotion';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart() {
  const { chartData, theme } = useUsers();
  const prefersReducedMotion = useReducedMotion();

  const textColor = theme === 'dark' ? '#cbd5e1' : '#475569';
  const totalUsers = chartData.online + chartData.offline;

  const data = useMemo(
    () => ({
      labels: ['Online Users', 'Offline Users'],
      datasets: [
        {
          data: [chartData.online, chartData.offline],
          backgroundColor: ['#059669', '#dc2626'],
          borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderWidth: 3,
          hoverOffset: prefersReducedMotion ? 0 : 8,
        },
      ],
    }),
    [chartData, theme, prefersReducedMotion]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: prefersReducedMotion ? false : undefined,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { size: 13, family: 'Inter, system-ui, sans-serif' },
          },
        },
        tooltip: {
          backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          titleColor: theme === 'dark' ? '#f8fafc' : '#0f172a',
          bodyColor: theme === 'dark' ? '#e2e8f0' : '#334155',
          borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
    }),
    [textColor, theme, prefersReducedMotion]
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
      className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
      role="region"
      aria-labelledby="chart-title"
      aria-describedby="chart-summary"
    >
      <h2 id="chart-title" className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        User Status Analytics
      </h2>

      <table className="sr-only">
        <caption>User online and offline status counts for filtered users</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Online users</td>
            <td>{chartData.online}</td>
          </tr>
          <tr>
            <td>Offline users</td>
            <td>{chartData.offline}</td>
          </tr>
          <tr>
            <td>Total filtered users</td>
            <td>{totalUsers}</td>
          </tr>
        </tbody>
      </table>

      <p id="chart-summary" className="sr-only">
        {chartData.online} online users and {chartData.offline} offline users out of {totalUsers} filtered users.
      </p>

      <div className="relative mx-auto h-64 max-w-xs" aria-hidden="true">
        <Doughnut data={data} options={options} />
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-600" aria-hidden="true" />
          <span className="text-slate-700 dark:text-slate-200">
            Online: <span className="font-semibold text-slate-900 dark:text-white">{chartData.online}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-600" aria-hidden="true" />
          <span className="text-slate-700 dark:text-slate-200">
            Offline: <span className="font-semibold text-slate-900 dark:text-white">{chartData.offline}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
