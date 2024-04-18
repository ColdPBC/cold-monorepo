import React, { useContext } from 'react';
import { Card, ErrorFallback, FootprintDetailChip, ScopeDataGrid } from '@coldpbc/components';
import { ColdEmissionsContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';
import { forEach, get, set, sortBy } from 'lodash';
import { ChartOptions } from 'chart.js';
import { useActiveSegment } from '@coldpbc/hooks';
import { Chart } from 'react-chartjs-2';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { ScopeColors } from '@coldpbc/enums';

const _EmissionsCarbonFootprintCharts = () => {
  const [byActivity, setByActivity] = React.useState(true);
  const { data, selectedYear, setSelectedYear, selectedFacility, setSelectedFacility, isSingleYear } = useContext(ColdEmissionsContext);

  const { uniqueScopes, emissions } = data;

  let totalEmissions = 0;
  // const scopeActivities: {
  //   [key: string]: {
  //     emissions: number;
  //     percentage: string;
  //   };
  // } = {};

  const allScopeActivities: {
    [key: string]: {
      [key: string]: {
        emissions: number;
        percentage: string;
      };
    };
  } = {};

  // const colors = getSchemeForColor(HexColors[ScopeColors[scope_category]]);
  const scopeColors = {
    '1': getSchemeForColor(HexColors[ScopeColors['1']]),
    '2': getSchemeForColor(HexColors[ScopeColors['2']]),
    '3': getSchemeForColor(HexColors[ScopeColors['3']]),
  };

  const emissionsDataSet = {
    chartData: {
      datasets: [
        {
          data: Array<number>(),
          backgroundColor: Array<string>(),
          borderColor: Array<string>(),
          borderWidth: 1,
          hoverBackgroundColor: Array<string>(),
        },
      ],
      labels: Array<string>(),
    },
  };

  forEach(emissions, facility => {
    if (facility.facility_id.toString() === selectedFacility.value || selectedFacility.value === 'all') {
      forEach(facility.periods, period => {
        if (period.value.toString() !== selectedYear.value && selectedYear.value !== 'all') {
          return;
        }
        forEach(period.emissions, emission => {
          const scopeNumber = emission.scope.ghg_category;
          const scopeActivities = get(allScopeActivities, scopeNumber, {});
          forEach(emission.activities, activity => {
            totalEmissions += activity.tco2e;
            const scopeActivity = get(scopeActivities, activity.name, {
              emissions: 0,
              percentage: '0%',
            });
            if (scopeActivity.emissions === 0) {
              scopeActivity.emissions += activity.tco2e;
              scopeActivity.percentage = '0%';
            } else {
              scopeActivity.emissions = activity.tco2e;
              scopeActivity.percentage = '0%';
            }
            set(scopeActivities, activity.name, scopeActivity);
          });
          set(allScopeActivities, scopeNumber, scopeActivities);
        });
      });
    }
  });

  const allEmissions = Array<{
    activity: string;
    emissions: number;
    color: string;
  }>();

  // sort the activities by emissions in each scope
  forEach(allScopeActivities, (scopeActivities, scope) => {
    const sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
      return -scopeActivities[activity].emissions;
    });
    const scopeColor = get(scopeColors, scope, scopeColors['1']);
    forEach(sortedActivities, (activity, index) => {
      allEmissions.push({
        activity,
        emissions: scopeActivities[activity].emissions,
        color: scopeColor[index],
      });
      // const scopeActivity = scopeActivities[activity];
      // scopeActivity.percentage = ((scopeActivity.emissions / totalEmissions) * 100).toFixed(1) + '%';
      // emissionsDataSet.chartData.datasets[0].data.push(scopeActivity.emissions);
      // emissionsDataSet.chartData.datasets[0].backgroundColor.push(scopeColor[index]);
      // emissionsDataSet.chartData.datasets[0].hoverBackgroundColor.push(scopeColor[index]);
      // emissionsDataSet.chartData.datasets[0].borderColor.push(scopeColor[index]);
      // emissionsDataSet.chartData.labels.push(activity);
    });
  });

  const sortedEmissions = sortBy(allEmissions, emission => {
    return -emission.emissions;
  });

  forEach(sortedEmissions, (emission, index) => {
    emissionsDataSet.chartData.datasets[0].data.push(emission.emissions);
    emissionsDataSet.chartData.datasets[0].backgroundColor.push(emission.color);
    emissionsDataSet.chartData.datasets[0].hoverBackgroundColor.push(emission.color);
    emissionsDataSet.chartData.datasets[0].borderColor.push(emission.color);
    emissionsDataSet.chartData.labels.push(emission.activity);
  });

  const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({ chartHasSpacers: false });

  const chartPlugins: PluginType<'doughnut'>[] = [
    // {
    //   id: 'sliceThickness',
    //   // @ts-expect-error todo: fix type error
    //   beforeDraw: (chart: ChartJS) => chartBeforeDraw(chart, hoverColorArray ?? []),
    // },
  ];

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    onHover: segmentOnHover,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - inject this into the chart options
    activeSegment,
  };

  const onEmissionTypeClick = (isActivity: boolean) => {
    setByActivity(isActivity);
  };

  console.log({
    totalEmissions,
  });

  return (
    <div className={'flex flex-col space-y-[35px] w-full'}>
      <div className={'flex flex-row'}>
        <Card glow={false} className={'w-full text-tc-primary'}>
          <div className={'w-full flex flex-col gap-[40px]'}>
            <div className={'w-full flex flex-row justify-between'}>
              <div className={'text-h2 text-start'}>Emissions by {byActivity ? 'Activity' : 'Category'}</div>
              <div className={'w-auto flex flex-row bg-bgc-accent border-[1px] border-gray-70 rounded-[8px] p-[8px]'}>
                <div className={`rounded-[8px] cursor-pointer p-[8px] text-button ${byActivity ? 'bg-bgc-accent' : 'bg-primary-300'}`} onClick={() => onEmissionTypeClick(false)}>
                  Category
                </div>
                <div className={`rounded-[8px] cursor-pointer p-[8px] text-button ${byActivity ? 'bg-primary-300' : 'bg-bgc-accent'}`} onClick={() => onEmissionTypeClick(true)}>
                  Activity
                </div>
              </div>
            </div>
            <div className={'flex flex-row gap-[32px]'}>
              <div className={'flex flex-col justify-between'}>
                <div className={'w-[300px] h-[300px] relative'}>
                  <FootprintDetailChip emissions={totalEmissions} large center />
                  <Chart options={chartOptions} type="doughnut" data={emissionsDataSet.chartData} plugins={chartPlugins} data-chromatic="ignore" width={300} height={300} />
                </div>
              </div>
              <div className={'flex flex-col gap-[16px]'}>
                {uniqueScopes.map(scope => {
                  return <ScopeDataGrid scope_category={scope} key={scope} byActivity={byActivity} />;
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const EmissionsCarbonFootprintCharts = withErrorBoundary(_EmissionsCarbonFootprintCharts, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
