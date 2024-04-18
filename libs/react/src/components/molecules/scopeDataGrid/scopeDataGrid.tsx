import React, { useContext } from 'react';
import { capitalize, forEach, get, map, sortBy } from 'lodash';
import { ErrorFallback } from '@coldpbc/components';
import { Table } from 'flowbite-react';
import { darkTableTheme, getSchemeForColor, HexColors } from '@coldpbc/themes';
import { formatTonnes } from '@coldpbc/lib';
import { ColdEmissionsContext } from '@coldpbc/context';
import { ScopeColors } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

export interface ScopeDataGridProps {
  scope_category: number;
  byActivity: boolean;
  maxEmissions: number;
}

const _ScopeDataGrid = (props: ScopeDataGridProps) => {
  const { scope_category, byActivity, maxEmissions } = props;
  const { data, selectedFacility, selectedYear } = useContext(ColdEmissionsContext);
  const { emissions } = data;

  // get all the scope activities and their emissions. also get the total emissions for the scope
  // and the percentage of the total emissions that each activity contributes
  let totalEmissions = 0;
  const scopeActivities: {
    [key: string]: {
      emissions: number;
      percentage: string;
    };
  } = {};

  const scopeByCategory: {
    [key: string]: {
      emissions: number;
      percentage: string;
    };
  } = {};

  const colors = getSchemeForColor(HexColors[ScopeColors[scope_category]]);

  const tableData = {
    definition: [
      {
        size: 'w-[379px]',
        field: 'activity',
        cellStyle: '',
        headerStyle: '',
        headerTitle: `Scope ${scope_category}`,
      },
      {
        size: 'w-[272px]',
        field: 'percentage',
        cellStyle: '',
        headerStyle: '',
        headerTitle: '%',
      },
      {
        size: 'w-[81px]',
        field: 'tCO2e',
        cellStyle: '',
        headerStyle: '',
        headerTitle: 'tcO2e',
      },
    ],
    data: Array<{
      activity: string;
      percentage: string;
      tCO2e: number;
    }>(),
  };

  forEach(emissions, facility => {
    if (facility.facility_id.toString() === selectedFacility.value || selectedFacility.value === 'all') {
      forEach(facility.periods, period => {
        if (period.value.toString() !== selectedYear.value && selectedYear.value !== 'all') {
          return;
        }
        forEach(period.emissions, emission => {
          forEach(emission.activities, activity => {
            totalEmissions += activity.tco2e;
            if (emission.scope.ghg_category === scope_category) {
              if (byActivity) {
                if (scopeActivities[activity.name]) {
                  scopeActivities[activity.name].emissions += activity.tco2e;
                  scopeActivities[activity.name].percentage = '0%';
                } else {
                  scopeActivities[activity.name] = {
                    emissions: activity.tco2e,
                    percentage: '0%',
                  };
                }
              } else {
                if (scope_category !== 3) {
                  const emissions = get(scopeByCategory, emission.scope.ghg_category.toString(), {
                    emissions: 0,
                    percentage: '0%',
                  });
                  emissions.emissions += activity.tco2e;
                  scopeByCategory[emission.scope.ghg_category] = emissions;
                } else {
                  // use the ghg_subcategory to group the emissions
                  const emissions = get(scopeByCategory, emission.scope.ghg_subcategory, {
                    emissions: 0,
                    percentage: '0%',
                  });
                  emissions.emissions += activity.tco2e;
                  scopeByCategory[emission.scope.ghg_subcategory] = emissions;
                }
              }
            }
          });
        });
      });
    }
  });

  const sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
    return -scopeActivities[activity].emissions;
  });

  if (byActivity) {
    forEach(sortedActivities, (activity, index) => {
      const scopeActivity = scopeActivities[activity];
      scopeActivity.percentage = ((scopeActivity.emissions / totalEmissions) * 100).toFixed(2) + '%';
      if (scope_category === 3) {
        // for the first 3 activities, use their names. but for the others, use 'Other Activities' and sum their emissions into one table row
        if (index < 3) {
          tableData.data.push({
            activity: activity,
            percentage: scopeActivity.percentage,
            tCO2e: scopeActivity.emissions,
          });
        } else {
          const otherActivities = get(tableData.data, '3', {
            activity: 'Other Activities',
            percentage: '0%',
            tCO2e: 0,
          });
          otherActivities.tCO2e += scopeActivity.emissions;
          otherActivities.percentage = ((otherActivities.tCO2e / totalEmissions) * 100).toFixed(2) + '%';
          tableData.data[3] = otherActivities;
        }
      } else {
        tableData.data.push({
          activity: activity,
          percentage: scopeActivity.percentage,
          tCO2e: scopeActivity.emissions,
        });
      }
    });
  } else {
    forEach(scopeByCategory, (scopeActivity, scope) => {
      scopeActivity.percentage = ((scopeActivity.emissions / totalEmissions) * 100).toFixed(2) + '%';
      if (scope_category === 3) {
        tableData.data.push({
          activity: `Category ${scope}`,
          percentage: scopeActivity.percentage,
          tCO2e: scopeActivity.emissions,
        });
      } else {
        tableData.data.push({
          activity: `Scope ${scope}`,
          percentage: scopeActivity.percentage,
          tCO2e: scopeActivity.emissions,
        });
      }
    });
  }

  if (tableData.data.length < 1) {
    return null;
  }

  return (
    <div className={'w-auto h-auto'}>
      <Table className="text-white" theme={darkTableTheme.table} data-testid={'footprint-detail-chart-table'}>
        <Table.Head className="text-white normal-case">
          {map(tableData.definition, (def, i) => (
            <Table.HeadCell key={`${def.field}-${i}`} theme={darkTableTheme.table?.head?.cell} className={def.size}>
              {def.headerTitle}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.data.map((row, i) => (
            <Table.Row key={`${row.activity}-${i}`} theme={darkTableTheme.table?.row}>
              <Table.Cell className="flex items-center font-bold min-w-[379px]" theme={darkTableTheme.table?.body?.cell}>
                <div
                  style={{
                    background: colors[i],
                    border: '2px solid rgba(0, 0, 0, 0.2)',
                  }}
                  className="mr-2 h-[10px] w-[10px] min-w-[10px] rounded-xl"
                />
                <div className={'w-[359px] truncate'}>{capitalize(row.activity)}</div>
              </Table.Cell>
              <Table.Cell theme={darkTableTheme.table?.body?.cell}>
                <div className={'flex flex-row items-center h-full'}>
                  <div className={'min-w-[65px] h-full'}>{row.percentage}</div>
                  <div className={'w-full flex flex-row items-center h-full'}>
                    <div
                      className="h-1 rounded-lg"
                      style={{
                        backgroundColor: colors[i],
                        width: `${(row.tCO2e / maxEmissions) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell theme={darkTableTheme.table?.body?.cell}>{formatTonnes(row.tCO2e)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const ScopeDataGrid = withErrorBoundary(_ScopeDataGrid, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
