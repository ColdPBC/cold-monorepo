import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Title,
} from 'chart.js';
import { HexColors } from '../../../themes/cold_theme';
import {forEach, isNumber, isString, some} from 'lodash';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';
import { defaultChartData, options } from './constants';
import { pickGradientValue } from './helpers';
import { useCreateGradient } from '../../../hooks';
import { EmptyChart } from './emptyChart';

ChartJS.register(
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Filler,
);

interface Props {
  setIsEmptyData?: (isEmpty: boolean) => void;
}

export function JourneySpiderChart({ setIsEmptyData }: Props) {
  const chartRef = useRef<ChartJS>(null);

  const [chartOptions, setChartOptions] = useState<ChartOptions>(options);
  const [chartData, setChartData] = useState<ChartData>(defaultChartData);

  const chartBackgroundColor = useCreateGradient(
    chartRef.current?.ctx,
    chartRef.current?.chartArea,
    HexColors.white + '00',
    HexColors.primary.DEFAULT + '40',
  );

  const chartBorderColor = useCreateGradient(
    chartRef?.current?.ctx,
    chartRef?.current?.chartArea,
    HexColors.gray['130'],
    HexColors.primary.DEFAULT,
  );

  // Fetch chart data
  const { data, error, isLoading } = useSWR<any>(
    ['/categories/', 'GET'],
    axiosFetcher,
  );

  // Update chart data on receiving new data
  const isEmpty = !(data?.definition && Object.keys(data.definition.categories).length !== 0 && some(data.definition.categories, (category: any) => some(category.subcategories, (
    (subcategory: any) => subcategory.journey_score !== null)))) || data?.response?.status === 404;
  useEffect(() => {
    if (!isEmpty) {
      const newLabels: string[] = [],
        newData: number[] = [];
      // Transform chart data
      forEach(data?.definition.categories, (category) => {
        forEach(category.subcategories, (subcategory) => {
          if (subcategory.journey_score) {
            newLabels.push(subcategory.subcategory_name);
            newData.push(subcategory.journey_score);
          }
        });
      });

      const newChartData: ChartData = {
        datasets: [{ data: newData }],
        labels: newLabels,
      };

      const chart = chartRef.current;

      if (!chart) {
        return;
      }

      const maxAxisValue = options.scales?.r?.max || 100;

      const chartOptions: ChartOptions = {
        ...options,
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor,
      };

      // Get the right color for each of the points based on their value
      const pointColors: string[] = [];
      newChartData.datasets[0].data.forEach((dataPoint: any) => {
        pointColors.push(
          pickGradientValue(
            HexColors.white,
            HexColors.primary.DEFAULT,
            (isNumber(dataPoint) ? dataPoint : 0) /
              (isString(maxAxisValue)
                ? parseFloat(maxAxisValue)
                : maxAxisValue),
          ),
        );
      });
      if (chartOptions.elements?.point)
        chartOptions.elements.point.backgroundColor = pointColors;

      setChartOptions(chartOptions);
      setChartData(newChartData);
      if (setIsEmptyData) setIsEmptyData(false);
    } else {
      if (setIsEmptyData) setIsEmptyData(true);
    }
  }, [data, chartRef.current]);

  if (isLoading) {
    return (
      <div className="h-[284px] flex items-center">
        <Spinner />
      </div>
    );
  }
  else if (isEmpty) {
    return <EmptyChart />
  }
  else if (error) {
    return <div></div>;
  }

  return (
    <div className="relative h-[284px] w-full">
      <Chart
        ref={chartRef}
        options={chartOptions}
        type="radar"
        data={chartData}
      />
    </div>
  );
}
