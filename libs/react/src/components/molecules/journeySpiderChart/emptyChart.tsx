import { useCreateGradient } from "@coldpbc/hooks";
import { HexColors } from "@coldpbc/themes";
import { Chart as ChartJS, Filler, LineElement, PointElement, RadarController, RadialLinearScale, Title  } from "chart.js";
import { useRef } from "react";
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

  const emptyDataChartBackgroundColor = useCreateGradient(
    chartRef.current?.ctx,
    chartRef.current?.chartArea,
    HexColors.white + '00',
    HexColors.white + '60',
  )

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
            data={emptyChartData}
          />
        </div>
      );
}