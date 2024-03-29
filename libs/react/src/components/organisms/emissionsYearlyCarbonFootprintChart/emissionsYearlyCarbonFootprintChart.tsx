import { EmissionFacility } from '@coldpbc/interfaces';
import { Card } from '@coldpbc/components';
import { forOwn, isArray, map, max } from 'lodash';
import { BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartOptions, LinearScale, Title } from 'chart.js';
import { HexColors } from '@coldpbc/themes';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export interface EmissionsYearlyCarbonFootprintChartProps {
  emissionFacilities?: EmissionFacility[];
}

export const EmissionsYearlyCarbonFootprintChart = (props: EmissionsYearlyCarbonFootprintChartProps) => {
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
  map(props.emissionFacilities, facility => {
    map(facility.periods, period => {
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
      },
    },
    scales: {
      yAxis: {
        max: maxEmission + 30,
      },
      y: {
        display: false,
      },
    },
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

  return (
    <Card title={'Emissions'}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-left text-label'}>Thousands of tones of carbon dioxide equivalents (tCO2e) per year</div>
        <Bar className={'w-full'} plugins={[ChartDataLabels]} options={chartOptions} data={yearsChartData} width={'897.001px'} height={'294px'} />
      </div>
    </Card>
  );
};
