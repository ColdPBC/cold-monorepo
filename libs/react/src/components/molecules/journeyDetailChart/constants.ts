import { HexColors } from '@coldpbc/themes';
import { ChartData, ChartOptions } from 'chart.js';

export const defaultChartData: ChartData = {
  datasets: [
    {
      data: [],
    },
  ],
};

export const emptyChartData: ChartData = {
  datasets: [
    {
      data: [50, 80, 68, 74, 25, 60, 80, 50],
    },
  ],
  labels: ['', '', '', '', '', '', '', ''],
};

export const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: 'easeOutQuint',
  },
  elements: {

  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
