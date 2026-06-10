import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useUsers } from '../hooks/useUsers';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart() {
  const { chartData, theme } = useUsers();

  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  const data = useMemo(
    () => ({
      labels: ['Online Users', 'Offline Users'],
      datasets: [
        {
          data: [chartData.online, chartData.offline],
          backgroundColor: ['#34d399', '#f87171'],
          borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    }),
    [chartData, theme]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
          titleColor: theme === 'dark' ? '#f1f5f9' : '#1e293b',
          bodyColor: theme === 'dark' ? '#cbd5e1' : '#475569',
          borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
    }),
    [textColor, theme]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
      role="region"
      aria-label="User online status chart"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">User Status Analytics</h2>
      <div className="relative mx-auto h-64 max-w-xs">
        <Doughnut data={data} options={options} aria-label="Doughnut chart showing online and offline users" />
      </div>
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="text-slate-500 dark:text-slate-400">
            Online: <span className="font-semibold text-slate-900 dark:text-white">{chartData.online}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
          <span className="text-slate-500 dark:text-slate-400">
            Offline: <span className="font-semibold text-slate-900 dark:text-white">{chartData.offline}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
