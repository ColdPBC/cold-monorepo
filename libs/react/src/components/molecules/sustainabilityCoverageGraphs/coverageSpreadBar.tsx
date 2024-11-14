import { Bar } from 'react-chartjs-2';
import React from 'react';
import { Chart as ChartJS, ChartOptions, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { HexColors } from '@coldpbc/themes';

interface CoverageSpreadBarProps {
  data: {
    category: string;
    percentage: number;
  }[];
  accentColor: string;
  backgroundColor?: string;
}

const INACTIVE_COLOR = HexColors.bgc.menu;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const CoverageSpreadBar: React.FC<CoverageSpreadBarProps> = ({
  data,
  accentColor,
}) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        // Main percentage value
        data: data.map(item => Math.round(item.percentage)),
        backgroundColor: accentColor,
        borderWidth: 0,
        borderRadius: {
          topLeft: 4,
          bottomLeft: 4
        },
        barThickness: 20,
        barPercentage: 0.95,
        stack: 'stack1'
      },
      {
        // Remainder to reach 100%
        data: data.map(item => 100 - Math.round(item.percentage)),
        backgroundColor: INACTIVE_COLOR,
        borderWidth: 0,
        borderRadius: {
          topRight: 4,
          bottomRight: 4
        },
        barThickness: 20,
        barPercentage: 0.95,
        stack: 'stack1'
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 100,
        stacked: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
          drawTicks: false,
          lineWidth: 1,
          offset: false
        },
        ticks: {
          color: 'white',
          callback: (value) => `${value}%`,
          font: {
            family: 'Inter'
          },
          stepSize: 25
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          color: 'white',
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: 'white',
        bodyColor: 'white',
        bodyFont: {
          size: 12,
          family: 'Inter'
        },
        titleFont: {
          family: 'Inter'
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            // Only show tooltip for the first dataset (the percentage value)
            if (context.datasetIndex === 0) {
              return `${context.formattedValue}% has attribute`;
            } else {
              return `${context.formattedValue}% does not have attribute`;
            }
          }
        }
      }
    }
  };

  return (
    // Height is the same as the totalCoverageDonut for consistency
    <div className="relative h-80 w-full min-w-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};
