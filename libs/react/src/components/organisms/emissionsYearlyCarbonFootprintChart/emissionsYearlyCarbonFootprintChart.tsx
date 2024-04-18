import { Card, ErrorFallback } from '@coldpbc/components';
import { forEach, forOwn, get, isArray, map, reduce } from 'lodash';
import { BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import opacity from 'hex-color-opacity';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { useColdContext } from '@coldpbc/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const _EmissionsYearlyCarbonFootprintChart = () => {
  const chartRef = React.useRef(null);
  const { selectedFacility, selectedYear, setSelectedYear, data } = useContext(ColdEmissionsContext);
  const { logBrowser } = useColdContext();
  const { emissions, yearOptions } = data;
  const yearsData: {
    [year: string]: {
      total: number;
      [scope: string]: number;
    };
  } = {};

  const yearsChartData: ChartData<'bar'> = {
    labels: Array<string>(),
    datasets: [
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderSkipped: false,
        minBarLength: 10,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 4,
          bottomRight: 4,
        },
      },
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderSkipped: false,
        minBarLength: 10,
      },
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderSkipped: false,
        minBarLength: 20,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };
  const tickColors = Array<string>();
  const defaultScopeColors = [HexColors.lightblue['200'], HexColors.purple['200'], HexColors.teal['200']];
  let maxEmission = 0;

  map(emissions, facility => {
    if (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString()) {
      return;
    }
    map(facility.periods, period => {
      const yearEmissions = yearsData[period.value.toString()] || {};
      map(period.emissions, emission => {
        const scope = emission.scope.ghg_category;
        let scopeEmissions = get(yearEmissions, scope.toString(), 0);
        map(emission.activities, activity => {
          scopeEmissions += activity.tco2e;
        });
        yearEmissions[scope.toString()] = scopeEmissions;
      });
      yearsData[period.value.toString()] = yearEmissions;
    });
  });

  forOwn(yearsData, (emissions, year) => {
    yearsChartData.labels?.push(year);
    if (selectedYear.value === 'all') {
      tickColors.push('white');
    } else {
      if (year === selectedYear.value) {
        tickColors.push('white');
      } else {
        const lowerOpacityWhite = opacity(HexColors.white, 0.5);
        tickColors.push(lowerOpacityWhite);
      }
    }
    forOwn(emissions, (emission, scope) => {
      if (scope === 'total') {
        return;
      }
      let scopeIndex = 0;
      switch (scope) {
        case '1':
          scopeIndex = 2;
          break;
        case '2':
          scopeIndex = 1;
          break;
        case '3':
          scopeIndex = 0;
          break;
      }
      // console.log('scopeIndex', scopeIndex, 'emission', emission, 'scope', scope);
      yearsChartData.datasets[scopeIndex].data.push(emission);
      if (isArray(yearsChartData.datasets[scopeIndex].backgroundColor)) {
        if (selectedYear.value === 'all') {
          // @ts-ignore
          yearsChartData.datasets[scopeIndex].backgroundColor.push(defaultScopeColors[parseInt(scope) - 1]);
        } else {
          if (year === selectedYear.value) {
            // @ts-ignore
            yearsChartData.datasets[scopeIndex].backgroundColor.push(defaultScopeColors[parseInt(scope) - 1]);
          } else {
            // @ts-ignore
            yearsChartData.datasets[scopeIndex].backgroundColor.push(opacity(defaultScopeColors[parseInt(scope) - 1], 0.5));
          }
        }
      }
    });
  });

  forOwn(yearsData, (emissions, year) => {
    // iterate over the scopes and get the total emission for the year
    let totalEmission = 0;
    forOwn(emissions, (emission, scope) => {
      if (scope === 'total') {
        return;
      }
      totalEmission += emission;
    });
    maxEmission = maxEmission < totalEmission ? totalEmission : maxEmission;
  });

  const getMaxYTick = () => {
    const max = Math.round(maxEmission + (maxEmission > 10 ? maxEmission / 10 : 1));

    return max;
  };

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
          const dataSetArray = Array<number>();
          forEach(context.chart.data.datasets, (dataset, index) => {
            if (dataset.data[context.dataIndex] !== undefined) {
              dataSetArray.push(dataset.data[context.dataIndex] as number);
            }
          });
          const total = reduce(dataSetArray, (sum, num) => sum + num, 0);
          // only show the label for the top most bar
          if (context.datasetIndex === dataSetArray.length - 1) {
            return Math.round(total * 100) / 100;
          } else {
            return '';
          }
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: HexColors.bgc.accent,
        },
        stacked: true,
        suggestedMax: Math.round(maxEmission + (maxEmission > 10 ? maxEmission / 10 : 1)),
      },
      x: {
        ticks: {
          color: tickColors,
        },
        stacked: true,
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

  const barPlugins: PluginType<'bar'>[] = [Tooltip, ChartDataLabels];

  logBrowser('EmissionsYearlyCarbonFootprintChart', 'info', { yearsChartData, chartOptions });

  const getScopeLegend = (scope: number) => {
    return (
      <div className={'flex flex-row gap-2'}>
        <div className={'w-[29px] h-[23px] rounded-[4px]'} style={{ backgroundColor: defaultScopeColors[scope - 1] }}></div>
        <div className={'text-caption flex items-center'}>Scope {scope}</div>
      </div>
    );
  };

  console.log({
    maxEmission,
    yearsData,
  });

  return (
    <Card title={'Emissions'} glow={false} className={'w-auto'}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'w-full flex flex-row justify-between'}>
          <div className={'text-left text-caption'}>Thousands of tones of carbon dioxide equivalents (tCO2e) per year</div>
          <div className={'w-auto flex flex-row gap-[24px]'}>
            {getScopeLegend(1)}
            {getScopeLegend(2)}
            {getScopeLegend(3)}
          </div>
        </div>
        <Bar className={'w-full'} ref={chartRef} plugins={barPlugins} options={chartOptions} data={yearsChartData} width={'897.001px'} height={'294px'} />
      </div>
    </Card>
  );
};

export const EmissionsYearlyCarbonFootprintChart = withErrorBoundary(_EmissionsYearlyCarbonFootprintChart, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
