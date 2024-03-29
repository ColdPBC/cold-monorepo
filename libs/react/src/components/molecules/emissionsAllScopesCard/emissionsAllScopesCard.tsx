import { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { EmissionPayload } from '@coldpbc/interfaces';
import { Card, EmissionsDonutChart, EmissionsDonutChartVariants, SubCategoryTotal } from '@coldpbc/components';
import { forEach, forOwn, isArray, map, uniq } from 'lodash';
import { ChartData } from 'chart.js';
import { HexColors } from '@coldpbc/themes';

export const EmissionsAllScopesCard = () => {
  const {
    data,
    selectedFacility,
    selectedYear,
  }: {
    data: EmissionPayload;
    selectedFacility: string;
    selectedYear: number;
  } = useContext(ColdEmissionsContext);

  const uniqueScopes = uniq(
    map(data.definition, facility => {
      if (facility.facility_id.toString() !== selectedFacility && selectedFacility !== 'all') return [];
      return map(facility.periods, period => {
        return map(period.emissions, emission => {
          return emission.scope.ghg_category;
        }).flat();
      }).flat();
    }).flat(),
  );

  const scopeColors: {
    [key: number]: 'lightblue' | 'purple' | 'green' | 'teal';
  } = {
    1: 'lightblue',
    2: 'teal',
    3: 'green',
  };

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: Array<number>(),
        borderRadius: 2,
        borderWidth: 0,
        backgroundColor: Array<string>(),
      },
    ],
    labels: Array<string>(),
  };

  const scopeData: {
    [key: number]: number;
  } = {};

  const totals: Array<SubCategoryTotal> = [];
  let totalEmissions = 0;
  const hoverColorArray = Array<string>();

  forEach(uniqueScopes, scope => {
    let value = 0;
    let nullFootprint = true;
    forEach(data.definition, facility => {
      if (facility.facility_id.toString() === selectedFacility || selectedFacility === 'all') {
        forEach(facility.periods, period => {
          if (period.value !== selectedYear) return;
          forEach(period.emissions, emission => {
            if (emission.scope.ghg_category === scope) {
              forEach(emission.activities, activity => {
                value += activity.tco2e;
                totalEmissions += activity.tco2e;
                nullFootprint = false;
              });
              if (!nullFootprint) {
                if (scopeData[scope]) {
                  scopeData[scope] += value;
                } else {
                  scopeData[scope] = value;
                }
              }
            }
          });
        });
      }
    });
  });

  forOwn(scopeData, (emissions, scope) => {
    const color = scopeColors[parseInt(scope)];
    const name = `Scope ${scope}`;
    totals.push({
      value: emissions,
      color: color,
      name: name,
      subcategoryKey: scope,
      percent: (emissions / totalEmissions) * 100,
    });
  });

  const totalsSorted = totals.sort((a, b) => a.value - b.value);

  forEach(totalsSorted, total => {
    chartData.labels?.push(total.name);
    chartData.datasets[0].data.push(total.value);

    if (isArray(chartData.datasets[0].backgroundColor)) {
      chartData.datasets[0].backgroundColor?.push(scopeColors[parseInt(total.subcategoryKey)]);
    }
    hoverColorArray.push(HexColors[scopeColors[parseInt(total.subcategoryKey)]].DEFAULT_BRIGHTEN);

    chartData.labels?.push(null);
    chartData.datasets[0].data.push(totalEmissions / 100);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chartData.datasets[0].backgroundColor?.push('#FFFFFF00'); // make spacer transparent
  });

  return (
    <Card title="Scope 1, 2, 3">
      <EmissionsDonutChart
        variant={EmissionsDonutChartVariants.vertical}
        chartData={chartData}
        subcategoryTotals={totalsSorted}
        totalEmissions={totalEmissions}
        hoverColorArray={hoverColorArray}
      />
    </Card>
  );
};
