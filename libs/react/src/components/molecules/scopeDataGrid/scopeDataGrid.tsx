import React from 'react';
import { capitalize, forEach, map, orderBy, sortBy } from 'lodash';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { Table } from 'flowbite-react';
import { darkTableTheme } from '@coldpbc/themes';
import { EmissionsScope3Categories, IconNames } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import numeral from 'numeral';

export interface ScopeDataGridProps {
  scope_category: number;
  byActivity: boolean;
  maxEmissions: number;
  totalEmissions: number;
  allEmissions: { scope: number; activity: string; emissions: number; color: string }[];
  otherActivities: { scope: number; activity: string; emissions: number; color: string }[];
  selectedActivity: {
    scope: number;
    activity: string;
  } | null;
  setSelectedActivity: (selectedActivity: { scope: number; activity: string } | null) => void;
  getActivityFromSegment: () => { scope: number; activity: string; emissions: number; color: string } | null;
}

const _ScopeDataGrid = (props: ScopeDataGridProps) => {
  const { scope_category, byActivity, maxEmissions, selectedActivity, setSelectedActivity, getActivityFromSegment, allEmissions, totalEmissions, otherActivities } = props;
  const activityFromSegment = getActivityFromSegment();
  const [showOtherActivities, setShowOtherActivities] = React.useState(false);

  const scopeEmissions = allEmissions.filter(emission => emission.scope === scope_category);

  const tableData = {
    definition: [
      {
        field: 'activity',
        cellStyle: '',
        headerStyle: '',
        headerTitle: `Scope ${scope_category}`,
      },
      {
        field: 'percentage',
        cellStyle: '',
        headerStyle: '',
        headerTitle: '%',
      },
      {
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
      color: string;
    }>(),
  };

  const sortedActivities = sortBy(scopeEmissions, emission => {
    if (byActivity) {
      return -emission.emissions;
    } else {
      if (scope_category === 3) {
        return EmissionsScope3Categories.indexOf(emission.activity);
      } else {
        return -emission.emissions;
      }
    }
  });

  if (byActivity) {
    forEach(sortedActivities, (activity) => {
      const percentage = ((activity.emissions / totalEmissions) * 100).toFixed(1) + '%';
      tableData.data.push({
        activity: activity.activity,
        percentage: percentage,
        tCO2e: activity.emissions,
        color: activity.color,
      });
    });
  } else {
    forEach(sortedActivities, activity => {
      const percentage = ((activity.emissions / totalEmissions) * 100).toFixed(1) + '%';
      if (scope_category === 3) {
        tableData.data.push({
          activity: activity.activity,
          percentage: percentage,
          tCO2e: activity.emissions,
          color: activity.color,
        });
      } else {
        tableData.data.push({
          activity: `Scope ${scope_category}`,
          percentage: percentage,
          tCO2e: activity.emissions,
          color: activity.color,
        });
      }
    });
  }

  // for scope 3 and by activity, we need to put activity name 'Other Activities' at the end of the table data
  if (scope_category === 3 && byActivity) {
    const otherActivity = tableData.data.find(activity => activity.activity === 'Other Activities');
    if (otherActivity) {
      tableData.data = tableData.data.filter(activity => activity.activity !== 'Other Activities');
      tableData.data.push(otherActivity);
    }
    // add other activities to the end of the table data
    // sort the other activities by emissions and then name
    if (showOtherActivities) {
      const sortedOtherActivities = orderBy(otherActivities, ['emissions', 'activity'], ['desc', 'asc']);
      forEach(sortedOtherActivities, activity => {
        const percentage = ((activity.emissions / totalEmissions) * 100).toFixed(1) + '%';
        tableData.data.push({
          activity: activity.activity,
          percentage: percentage,
          tCO2e: activity.emissions,
          color: 'transparent',
        });
      });
    }
  }

  if (tableData.data.length < 1) {
    return null;
  }

  const getTableRowClassName = (activity: string) => {
    if (isRowSelected(activity)) {
      return `px-4 py-4 bg-gray-70`;
    } else {
      return 'px-4 py-4';
    }
  };

  const getTableActivityClassName = (activity: string) => {
    if (isRowSelected(activity)) {
      return `px-0 py-0 pr-4 bg-gray-70`;
    } else {
      return 'px-4 py-4';
    }
  };

  const isRowSelected = (activity: string) => {
    if (activityFromSegment) {
      return activityFromSegment.activity === activity && activityFromSegment.scope === scope_category;
    } else {
      return selectedActivity?.activity === activity && selectedActivity.scope === scope_category;
    }
  };

  const getCategoryChip = (category: string) => {
    // get the category number from the category name
    if (!byActivity && scope_category === 3) {
      const categoryNumber = EmissionsScope3Categories.indexOf(category) + 1;
      return <div className={'rounded-[20px] bg-gray-50 px-[8px] text-label mr-4'}>{`Category ${categoryNumber}`}</div>;
    } else {
      return null;
    }
  };

  const getTableActivityItem = (row: { activity: string; percentage: string; tCO2e: number; color: string }) => {
    return (
      <Table.Cell className={`${getTableActivityClassName(row.activity)}`} theme={darkTableTheme.table?.body?.cell}>
        <div className={'flex flex-row items-center w-full font-bold whitespace-nowrap'}>
          {isRowSelected(row.activity) && (
            <div
              className="h-[51px] w-[4px]"
              style={{
                backgroundColor: row.color,
              }}></div>
          )}
          <div
            style={{
              background: row.color,
              border: '2px solid rgba(0, 0, 0, 0.2)',
            }}
            className={`mr-2 h-[10px] w-[10px] min-w-[10px] rounded-xl ${isRowSelected(row.activity) ? 'ml-3' : ''}`}
          />
          {getCategoryChip(row.activity)}
          <div className={'w-full truncate'}>
            <span>{capitalize(row.activity)}</span>
          </div>
          {
            // show 'Other Activities' row only for scope 3 and by activity
            scope_category === 3 && byActivity && row.activity === 'Other Activities' && (
              <div className={'w-[8px] h-[8px]'}>
                <ColdIcon name={showOtherActivities ? IconNames.ColdChevronUpIcon : IconNames.ColdChevronDownIcon} />
              </div>
            )
          }
        </div>
      </Table.Cell>
    );
  };

  return (
    <div className={'w-full'}>
      <Table className="text-white table-fixed" theme={darkTableTheme.table} data-testid={'footprint-detail-chart-table'}>
        <colgroup>
          <col className="w-1/2" />
          <col className="w-4/12" />
          <col className="w-2/12" />
        </colgroup>
        <Table.Head className="text-white normal-case">
          {map(tableData.definition, (def, i) => (
            <Table.HeadCell key={`${def.field}-${i}`} theme={darkTableTheme.table?.head?.cell}>
              {def.headerTitle}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.data.map((row, i) => (
            <Table.Row
              key={`${row.activity}-${i}`}
              theme={darkTableTheme.table?.row}
              className={'w-full'}
              onMouseEnter={() => {
                setSelectedActivity({ scope: scope_category, activity: row.activity });
              }}
              onMouseLeave={() => {
                setSelectedActivity(null);
              }}
              onClick={() => {
                if (scope_category === 3 && byActivity && row.activity === 'Other Activities') {
                  setShowOtherActivities(!showOtherActivities);
                }
              }}>
              {getTableActivityItem(row)}
              <Table.Cell theme={darkTableTheme.table?.body?.cell} className={`${getTableRowClassName(row.activity)}`}>
                <div className={'flex flex-row items-center h-full'}>
                  <div className={'min-w-[65px] h-full'}>{row.percentage}</div>
                  <div className={'w-full flex flex-row items-center h-full'}>
                    <div
                      className="h-1 rounded-lg"
                      style={{
                        backgroundColor: row.color,
                        width: `${(row.tCO2e / maxEmissions) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell theme={darkTableTheme.table?.body?.cell} className={`${getTableRowClassName(row.activity)}`}>
                {numeral(row.tCO2e).format('0,0,0')}
              </Table.Cell>
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
