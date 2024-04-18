import React, { useContext } from 'react';
import { CarbonFootprintDetailChip, Card, ErrorFallback, ScopeDataGrid } from '@coldpbc/components';
import { ColdEmissionsContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';
import { findIndex, forEach, get, set, sortBy } from 'lodash';
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
          const subcategory = emission.scope.ghg_subcategory;
          forEach(emission.activities, activity => {
            totalEmissions += activity.tco2e;
            if (byActivity) {
              const scopeActivity = get(scopeActivities, activity.name, {
                emissions: 0,
                percentage: '0%',
              });
              scopeActivity.emissions += activity.tco2e;
              scopeActivity.percentage = '0%';
              set(scopeActivities, activity.name, scopeActivity);
            } else {
              // by category
              if (scopeNumber in [1, 2]) {
                const scopeActivity = get(scopeActivities, `Scope ${scopeNumber}`, {
                  emissions: 0,
                  percentage: '0%',
                });
                scopeActivity.emissions += activity.tco2e;
                scopeActivity.percentage = '0%';
                set(scopeActivities, `Scope ${scopeNumber}`, scopeActivity);
              } else {
                const scopeActivity = get(scopeActivities, `Category ${subcategory}`, {
                  emissions: 0,
                  percentage: '0%',
                });
                scopeActivity.emissions += activity.tco2e;
                scopeActivity.percentage = '0%';
                set(scopeActivities, `Category ${subcategory}`, scopeActivity);
              }
            }
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

  let maxEmissions = 0;
  // sort the activities by emissions in each scope
  forEach(allScopeActivities, (scopeActivities, scope) => {
    let sortedActivities = Array<string>();
    if (byActivity) {
      sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
        return -scopeActivities[activity].emissions;
      });
    } else {
      sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
        return activity;
      });
    }
    const scopeColor = get(scopeColors, scope, scopeColors['1']);
    forEach(sortedActivities, (activity, index) => {
      if (scope === '3' && byActivity) {
        if (index < 3) {
          allEmissions.push({
            activity,
            emissions: scopeActivities[activity].emissions,
            color: scopeColor[index],
          });
        } else {
          // get from allEmissions with activity 'Other Activities'
          const otherActivitiesIndex = findIndex(allEmissions, emission => {
            return emission.activity === 'Other Activities';
          });
          if (otherActivitiesIndex !== -1) {
            const otherActivities = allEmissions[otherActivitiesIndex];
            otherActivities.emissions += scopeActivities[activity].emissions;
            set(allEmissions, otherActivitiesIndex, otherActivities);
          } else {
            allEmissions.push({
              activity: 'Other Activities',
              emissions: scopeActivities[activity].emissions,
              color: scopeColor[index],
            });
          }
        }
      } else {
        allEmissions.push({
          activity,
          emissions: scopeActivities[activity].emissions,
          color: scopeColor[index],
        });
      }
    });
  });

  const sortedEmissions = sortBy(allEmissions, emission => {
    return -emission.emissions;
  });

  forEach(sortedEmissions, (emission, index) => {
    if (emission.emissions > maxEmissions) {
      maxEmissions = emission.emissions;
    }
    emissionsDataSet.chartData.datasets[0].data.push(emission.emissions);
    emissionsDataSet.chartData.datasets[0].backgroundColor.push(emission.color);
    emissionsDataSet.chartData.datasets[0].hoverBackgroundColor.push(emission.color);
    emissionsDataSet.chartData.datasets[0].borderColor.push('black');
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
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - inject this into the chart options
    activeSegment,
  };

  const onEmissionTypeClick = (isActivity: boolean) => {
    setByActivity(isActivity);
  };

  console.log({
    maxEmissions,
    allScopeActivities,
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
              <div className={'flex flex-col justify-between w-[347px] gap-[32px]'}>
                <div className={'w-[347px] h-[347px] relative'}>
                  <CarbonFootprintDetailChip emissions={totalEmissions} center />
                  <Chart options={chartOptions} type="doughnut" data={emissionsDataSet.chartData} plugins={chartPlugins} data-chromatic="ignore" />
                </div>
                <div className={'w-full h-[77px] flex flex-row gap-[16px]'}>
                  <div className={'h-full w-[77px]'}>Change</div>
                  <div className={'text-caption text-tc-disabled whitespace-pre-wrap'}>
                    Emissions factors and methodology powered by The Change Climate Project, the leading independent emissions accounting & certification nonprofit.
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-[16px]'}>
                {uniqueScopes.map(scope => {
                  return <ScopeDataGrid scope_category={scope} key={scope} byActivity={byActivity} maxEmissions={maxEmissions} />;
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
