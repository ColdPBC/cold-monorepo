import { Card, ErrorFallback } from '@coldpbc/components';
import { find, forEach, forOwn, get, isArray, map, reduce, set } from 'lodash';
import { BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartEvent, ChartOptions, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import opacity from 'hex-color-opacity';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { useColdContext } from '@coldpbc/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import regression, { DataPoint } from 'regression';

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

  const yearsChartData: ChartData = {
    labels: Array<string>(),
    datasets: [
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderSkipped: false,
        borderRadius: [],
        minBarLength: 10,
        label: 'Scope 3',
      },
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderSkipped: false,
        borderRadius: [],
        minBarLength: 10,
        label: 'Scope 2',
      },
      {
        data: Array<number>(),
        backgroundColor: Array<string>(),
        barThickness: 76,
        borderRadius: [],
        borderSkipped: false,
        minBarLength: 20,
        label: 'Scope 1',
      },
    ],
  };
  const tickColors = Array<string>();
  const defaultScopeColors = [HexColors.lightblue['200'], HexColors.purple['200'], HexColors.teal['200']];
  let maxEmission = 0;
  const regressionData: DataPoint[] = Array<DataPoint>();

  map(emissions, facility => {
    if (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString()) {
      return;
    }
    map(facility.periods, period => {
      const yearEmissions = yearsData[period.value.toString()] || {};
      let yearEmissionsTotal = get(yearEmissions, 'total', 0);
      map(period.emissions, emission => {
        const scope = emission.scope.ghg_category;
        let scopeEmissions = get(yearEmissions, scope.toString(), 0);
        map(emission.activities, activity => {
          yearEmissionsTotal += activity.tco2e;
          scopeEmissions += activity.tco2e;
        });
        yearEmissions[scope.toString()] = scopeEmissions;
      });
      yearEmissions.total = yearEmissionsTotal;
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
    if (selectedYear.value === 'all') {
      regressionData.push([Object.keys(yearsData).indexOf(year), emissions.total]);
    }
    let totalEmission = 0;
    forOwn(emissions, (emission, scope) => {
      if (scope === 'total') {
        return;
      }
      totalEmission += emission;
    });
    maxEmission = maxEmission < totalEmission ? totalEmission : maxEmission;
  });
  const regressionResult = regression.linear(regressionData);

  if (selectedYear.value === 'all') {
    yearsChartData.datasets.push({
      data: map(regressionResult.points, point => {
        return [point[0], point[1]];
      }),
      backgroundColor: HexColors.gray['90'],
      borderColor: HexColors.gray['90'],
      borderWidth: 3,
      type: 'line',
    });
  }

  const chartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: 'transparent',
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        callbacks: {
          title: function (tooltipItem) {
            return '';
          },
        },
      },
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
            if (selectedYear.value === 'all') {
              if (index < context.chart.data.datasets.length - 1) {
                if (dataset.data[context.dataIndex] !== undefined) {
                  dataSetArray.push(dataset.data[context.dataIndex] as number);
                }
              }
            } else {
              if (dataset.data[context.dataIndex] !== undefined) {
                dataSetArray.push(dataset.data[context.dataIndex] as number);
              }
            }
          });
          const total = reduce(dataSetArray, (sum, num) => sum + num, 0);
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
      const allYearsOption = find(yearOptions, { value: 'all' });
      // if the year is already selected, select 'all' option
      if (selectedYear.value === yearOption.value && allYearsOption) {
        setSelectedYear(allYearsOption);
        return;
      } else {
        setSelectedYear(yearOption);
        return;
      }
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - inject this into the chart options
    selectedYear,
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, LineController, Tooltip);

  const barPlugins: PluginType[] = [ChartDataLabels];

  forOwn(yearsData, (emissions, year) => {
    const yearIndex = Object.keys(yearsData).indexOf(year);
    // check all the datasets and get the first and last dataset with data
    const firstDataSetIndex = 0;
    const lastDataSetIndex = 0;
    const specificYearChartData = Array<number>();
    forEach(yearsChartData.datasets, (dataset, index) => {
      if (selectedYear.value === 'all' && index === yearsChartData.datasets.length - 1) {
        return;
      }
      if (dataset.data[yearIndex] !== undefined && dataset.data[yearIndex] !== 0) {
        specificYearChartData.push(index);
      }
    });
    if (specificYearChartData.length === 1) {
      const firstDataSet = yearsChartData.datasets[specificYearChartData[0]];
      const firstBorderRadiuses = get(
        firstDataSet,
        'borderRadius',
        Array<{
          topLeft: number;
          topRight: number;
          bottomLeft: number;
          bottomRight: number;
        }>(),
      );
      firstBorderRadiuses.push({
        topLeft: 4,
        topRight: 4,
        bottomLeft: 4,
        bottomRight: 4,
      });
      set(yearsChartData.datasets[firstDataSetIndex], 'borderRadius', firstBorderRadiuses);
    } else {
      const firstDataSet = yearsChartData.datasets[specificYearChartData[0]];
      const lastDataSet = yearsChartData.datasets[specificYearChartData[specificYearChartData.length - 1]];
      const firstBorderRadiuses = get(
        firstDataSet,
        'borderRadius',
        Array<{
          topLeft: number;
          topRight: number;
          bottomLeft: number;
          bottomRight: number;
        }>(),
      );
      const lastBorderRadiuses = get(
        lastDataSet,
        'borderRadius',
        Array<{
          topLeft: number;
          topRight: number;
          bottomLeft: number;
          bottomRight: number;
        }>(),
      );
      firstBorderRadiuses.push({
        topLeft: 0,
        topRight: 0,
        bottomLeft: 4,
        bottomRight: 4,
      });
      lastBorderRadiuses.push({
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0,
      });
      set(yearsChartData.datasets[lastDataSetIndex], 'borderRadius', lastBorderRadiuses);
      set(yearsChartData.datasets[firstDataSetIndex], 'borderRadius', firstBorderRadiuses);
    }
  });

  // add a fake third year to the char data for linear regression testing
  // if (yearsChartData.labels) {
  //   yearsChartData.labels.push('2024');
  // }
  // yearsChartData.datasets.forEach(dataset => {
  //   dataset.data.push(500);
  //   if (isArray(dataset.backgroundColor)) {
  //     dataset.backgroundColor.push(HexColors.gray['90']);
  //   }
  // });

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
    regressionResult,
    yearsChartData,
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
        <Chart type={'bar'} className={'w-full'} ref={chartRef} plugins={barPlugins} options={chartOptions} data={yearsChartData} width={'897.001px'} height={'294px'} />
      </div>
    </Card>
  );
};

export const EmissionsYearlyCarbonFootprintChart = withErrorBoundary(_EmissionsYearlyCarbonFootprintChart, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
