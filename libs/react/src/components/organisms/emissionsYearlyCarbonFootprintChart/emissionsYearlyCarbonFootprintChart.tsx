import { Card, ErrorFallback } from '@coldpbc/components';
import { forOwn, isArray, map, max } from 'lodash';
import { BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartOptions, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';

const _EmissionsYearlyCarbonFootprintChart = () => {
  const { selectedFacility, selectedYear, data } = useContext(ColdEmissionsContext);
  const { emissions } = data;
  const yearsData: {
    [year: string]: number;
  } = {};
  const yearsChartData: ChartData<'bar'> = {
    labels: Array<string>(),
    datasets: [
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
      },
    ],
  };

  map(emissions?.definition, facility => {
    if (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString()) {
      return;
    }
    map(facility.periods, period => {
      if (selectedYear.value !== 'all' && selectedYear.value !== period.value.toString()) {
        return;
      }
      let yearEmissions = yearsData[period.value] || 0;
      map(period.emissions, emission => {
        map(emission.activities, activity => {
          yearEmissions += activity.tco2e;
        });
      });
      yearsData[period.value.toString()] = yearEmissions;
    });
  });

  forOwn(yearsData, (emissions, year) => {
    yearsChartData.labels?.push(year);
    yearsChartData.datasets[0].data.push(emissions);
    if (isArray(yearsChartData.datasets[0].backgroundColor)) {
      yearsChartData.datasets[0].backgroundColor.push(HexColors.primary['200']);
    }
  });

  const maxEmission = max(yearsChartData.datasets[0].data) as number;

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    backgroundColor: 'transparent',
    plugins: {
      datalabels: {
        color: 'white',
        align: 'top',
        anchor: 'end',
        formatter: function (value, context) {
          return Math.round(value * 100) / 100;
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
        max: Math.round(maxEmission + (maxEmission > 10 ? maxEmission / 10 : 1)),
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title);
  console.log({
    chartOptions,
    yearsChartData,
  });

  return (
    <Card title={'Emissions'} glow={false}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-left text-label'}>Thousands of tones of carbon dioxide equivalents (tCO2e) per year</div>
        <Bar className={'w-full'} plugins={[ChartDataLabels]} options={chartOptions} data={yearsChartData} width={'897.001px'} height={'294px'} />
      </div>
    </Card>
  );
};

export const EmissionsYearlyCarbonFootprintChart = withErrorBoundary(_EmissionsYearlyCarbonFootprintChart, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
