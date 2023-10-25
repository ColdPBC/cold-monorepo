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
import { forEach, isNumber, isString, some } from 'lodash';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { Spinner } from '../../atoms/spinner/spinner';
import { defaultChartData, options } from './constants';
import { createGradient, pickGradientValue } from './helpers';
import { EmptyChart } from './emptyChart';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useOrgSWR } from '../../../hooks/useOrgSWR';

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

function _JourneySpiderChart({ setIsEmptyData }: Props) {
  const chartRef = useRef<ChartJS>(null);

  const [chartOptions, setChartOptions] = useState<ChartOptions>(options);
  const [chartData, setChartData] = useState<ChartData>(defaultChartData);

  // Fetch chart data
  const { data, error, isLoading } = useOrgSWR<any>(
    ['/categories', 'GET'],
    axiosFetcher,
  );

  // Update chart data on receiving new data
  const isEmpty =
    !(
      data?.definition &&
      Object.keys(data.definition.categories).length !== 0 &&
      some(data.definition.categories, (category: any) =>
        some(
          category.subcategories,
          (subcategory: any) => subcategory.journey_score !== null,
        ),
      )
    ) || data?.response?.status === 404;
  useEffect(() => {
    if (!isEmpty) {
      const newLabels: string[] = [],
        newData: number[] = [];
      // Transform chart data
      forEach(data?.definition.categories, (category) => {
        forEach(category.subcategories, (subcategory) => {
          if (subcategory?.journey_score) {
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

      const maxAxisValue = chartOptions.scales?.r?.max || 100;

      const newChartOptions: ChartOptions = {
        ...chartOptions,
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
      if (newChartOptions.elements?.point)
        newChartOptions.elements.point.backgroundColor = pointColors;

      setChartOptions(newChartOptions);
      setChartData(newChartData);
      if (setIsEmptyData) setIsEmptyData(false);
    } else {
      if (setIsEmptyData) setIsEmptyData(true);
    }
  }, [data, chartRef.current]);

  const handleResize = (chart: ChartJS) => {
    setTimeout(() => {
      setChartOptions({
        ...chartOptions,
        backgroundColor: createGradient(
          chart.ctx,
          chart.chartArea,
          HexColors.white + '00',
          HexColors.primary.DEFAULT + '40',
        ), // 25% transparency
        borderColor: createGradient(
          chart.ctx,
          chart.chartArea,
          HexColors.gray['130'],
          HexColors.primary.DEFAULT,
        ),
      });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="h-[284px] flex items-center">
        <Spinner />
      </div>
    );
  } else if (isEmpty) {
    return <EmptyChart />;
  } else if (error) {
    return <div></div>;
  }

  return (
    <div className="relative h-[284px] w-full" data-chromatic="ignore">
      <Chart
        ref={chartRef}
        options={{
          ...chartOptions,
          onResize: handleResize,
        }}
        type="radar"
        data={chartData}
      />
    </div>
  );
}

export const JourneySpiderChart = withErrorBoundary(_JourneySpiderChart, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in JourneySpiderChart: ', error);
  },
});
