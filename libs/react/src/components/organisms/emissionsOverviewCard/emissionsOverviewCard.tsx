import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { EmissionPayload, InputOption } from '@coldpbc/interfaces';
import { ErrorType } from '@coldpbc/enums';
import { Card, EmissionsAllScopesCard, EmissionsDonutChart, EmissionsDonutChartVariants, ErrorFallback, Spinner } from '@coldpbc/components';
import React from 'react';
import { isAxiosError } from 'axios';
import { ColdEmissionsContext } from '@coldpbc/context';
import { find, forEach, map, uniq } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

const _EmissionsOverviewCard = () => {
  const { logError, logBrowser } = useColdContext();
  const { data, isLoading, error } = useOrgSWR<EmissionPayload, any>(['/emissions', 'GET'], axiosFetcher);
  const [selectedFacility, setSelectedFacility] = React.useState<InputOption>({
    id: 0,
    name: 'All Facilities',
    value: 'all',
  });
  const [selectedYear, setSelectedYear] = React.useState<InputOption>({
    id: 0,
    name: 'All Years',
    value: 'all',
  });

  const yearOptions = Array<{
    id: number;
    name: string;
    value: string;
  }>();

  const facilityOptions = Array<{
    id: number;
    name: string;
    value: string;
  }>();

  facilityOptions.push({
    id: 0,
    name: 'All Facilities',
    value: 'all',
  });

  yearOptions.push({
    id: 0,
    name: 'All Years',
    value: 'all',
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    logBrowser('Error fetching emissions data', 'error', { error }, error);
    logError(error, ErrorType.SWRError);
    return null;
  }

  if (isAxiosError(data) && data?.response?.status === 404) {
    return (
      <Card title={'Emissions Overview'}>
        <EmissionsDonutChart
          isEmptyData={true}
          subcategoryTotals={[]}
          variant={EmissionsDonutChartVariants.horizontal}
          chartData={{
            labels: [],
            datasets: [],
          }}
        />
        <div className="m-auto table w-1">
          <h4 className="text-h4 text-center whitespace-nowrap m-4">{'We need more data to show your footprint'}</h4>
          <p className="text-center text-sm leading-normal">We'll be in touch soon to collect info needed for your latest footprint</p>
        </div>
      </Card>
    );
  }

  forEach(data?.definition, (facility, index) => {
    facilityOptions.push({
      id: index + 1,
      name: facility.facility_name,
      value: facility.facility_id.toString(),
    });
    forEach(facility.periods, (period, index) => {
      if (find(yearOptions, { value: period.value.toString() })) {
        return;
      }
      yearOptions.push({
        id: index,
        name: `${period.value} Emissions`,
        value: period.value.toString(),
      });
    });
  });

  const uniqueScopes = uniq(
    map(data?.definition, facility => {
      return map(facility.periods, period => {
        return map(period.emissions, emission => {
          return emission.scope.ghg_category;
        }).flat();
      }).flat();
    }).flat(),
  ).sort();

  return (
    <ColdEmissionsContext.Provider
      value={{
        data: {
          emissions: data,
          uniqueScopes,
          yearOptions,
          facilityOptions,
        },
        selectedYear: selectedYear,
        selectedFacility: selectedFacility,
        setSelectedYear,
        setSelectedFacility,
      }}>
      <EmissionsAllScopesCard variant={EmissionsDonutChartVariants.horizontal} title={'Emissions Overview'} />
    </ColdEmissionsContext.Provider>
  );
};

export const EmissionsOverviewCard = withErrorBoundary(_EmissionsOverviewCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
