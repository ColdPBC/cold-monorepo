import { Card, ErrorFallback } from '@coldpbc/components';
import { forOwn, get, isArray, map, max } from 'lodash';
import { BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import opacity from 'hex-color-opacity';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { AnyObject, EmptyObject } from 'chart.js/dist/types/basic';
import { InputOption } from '@coldpbc/interfaces';

const _EmissionsYearlyCarbonFootprintChart = () => {
  const chartRef = React.useRef(null);
  const { selectedFacility, selectedYear, setSelectedYear, data } = useContext(ColdEmissionsContext);
  const { emissions, yearOptions } = data;
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
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };
  const tickColors = Array<string>();

  map(emissions?.definition, facility => {
    if (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString()) {
      return;
    }
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
      if (selectedYear.value === 'all') {
        yearsChartData.datasets[0].backgroundColor.push(HexColors.primary['200']);
        tickColors.push('white');
      } else {
        if (year === selectedYear.value) {
          tickColors.push('white');
          yearsChartData.datasets[0].backgroundColor.push(HexColors.primary['300']);
        } else {
          const lowerOpacityWhite = opacity(HexColors.white, 0.5);
          tickColors.push(lowerOpacityWhite);
          yearsChartData.datasets[0].backgroundColor.push(opacity(HexColors.primary['200'], 0.5));
        }
      }
    }
  });

  const maxEmission = max(yearsChartData.datasets[0].data) as number;

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    backgroundColor: 'transparent',
    plugins: {
      datalabels: {
        color: 'white',
        opacity: context => {
          // change the opacity of the label based on the active state
          if (selectedYear.value === 'all') {
            return 1;
          } else {
            const yearIndex = yearOptions.findIndex(yearOption => yearOption.value === selectedYear.value);
            return context.dataIndex === yearIndex - 1 ? 1 : 0.5;
          }
        },
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
        grid: {
          color: HexColors.bgc.accent,
        },
      },
      x: {
        ticks: {
          color: tickColors,
        },
      },
    },
    onClick(event: ChartEvent, elements) {
      const element = elements[0];
      if (!element) {
        return;
      }
      const index = element.index;
      const yearOption = get(yearOptions, index + 1);
      setSelectedYear(yearOption);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - inject this into the chart options
    selectedYear,
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

  const barPlugins: PluginType<'bar'>[] = [
    ChartDataLabels,
    {
      id: 'clickEventPlugin',
      beforeDraw: (chart: ChartJS, args: AnyObject, options: EmptyObject) => {
        chart.getDatasetMeta(0).data.forEach((bar, index) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const passedInSelectedYear: InputOption = chart.config.options?.selectedYear as InputOption;
          if (passedInSelectedYear.value === yearOptions[index + 1].value) {
            bar.options.borderColor = HexColors.primary['100'];
            bar.options.borderWidth = 2;
          }
        });
      },
    },
  ];

  return (
    <Card title={'Emissions'} glow={false}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-left text-label'}>Thousands of tones of carbon dioxide equivalents (tCO2e) per year</div>
        <Bar className={'w-full'} ref={chartRef} plugins={barPlugins} options={chartOptions} data={yearsChartData} width={'897.001px'} height={'294px'} />
      </div>
    </Card>
  );
};

export const EmissionsYearlyCarbonFootprintChart = withErrorBoundary(_EmissionsYearlyCarbonFootprintChart, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
