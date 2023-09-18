import { useCreateGradient } from "@coldpbc/hooks";
import { HexColors } from "@coldpbc/themes";
import { Chart as ChartJS, Filler, LineElement, PointElement, RadarController, RadialLinearScale, Title  } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { emptyChartData, options } from "./constants";
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    RadarController,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Filler,
);

export const EmptyChart = () => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState(emptyChartData);

  const emptyDataChartBackgroundColor = useCreateGradient(
    chartRef.current?.ctx,
    chartRef.current?.chartArea,
    HexColors.white + '00',
    HexColors.white + '60',
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData({
        ...chartData,
        datasets: [
          {
            data: chartData.datasets[0].data.map(_ => Math.floor(Math.random() * (80 - 30 + 1) + 30))
          }
        ]
      });
    }, 1200);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
        <div className="relative h-[150px] w-full">
          <Chart
            ref={chartRef}
            options={{
              ...options,
              backgroundColor: emptyDataChartBackgroundColor,
              elements: {
                line: {
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                },
                point: {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFFFFF',
                  radius: 1,
                },
              },
            }}
            type="radar"
            data={chartData}
          />
        </div>
      );
}