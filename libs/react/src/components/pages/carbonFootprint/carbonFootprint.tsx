import React from 'react';
import {
  AppContent,
  Card,
  CenterColumnContent,
  DismissableInfoCard,
  EmissionsCarbonFootprintCharts,
  EmissionsDonutChart,
  EmissionsDonutChartVariants,
  EmissionsYearlyCarbonFootprintChart,
  ErrorFallback,
  Select,
  Spinner,
} from '@coldpbc/components';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import { EmissionPayload, InputOption } from '@coldpbc/interfaces';
import { find, forEach, map, uniq } from 'lodash';
import { ColdEmissionsContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';
import { withErrorBoundary } from 'react-error-boundary';

const _CarbonFootprint = () => {
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
    logBrowser('No emissions data found', 'error', { data }, data);
    return (
      <AppContent title="Carbon Footprint">
        <CenterColumnContent>
          <div className={'flex flex-col space-y-[35px]'}>
            <DismissableInfoCard
              text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
              onDismiss={() => {}}
              dismissKey="footprint-page"
            />
            <Card>
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
          </div>
        </CenterColumnContent>
      </AppContent>
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

  logBrowser('CarbonFootprint', 'info', { data, uniqueScopes, facilityOptions, yearOptions });

  return (
    <ColdEmissionsContext.Provider
      value={{
        data: {
          emissions: data,
          uniqueScopes: uniqueScopes,
          facilityOptions: facilityOptions,
          yearOptions: yearOptions,
        },
        selectedYear: selectedYear,
        setSelectedYear: setSelectedYear,
        selectedFacility: selectedFacility,
        setSelectedFacility: setSelectedFacility,
      }}>
      <AppContent title="Carbon Footprint" isLoading={isLoading}>
        <div className={'flex flex-col space-y-[35px]'}>
          <Select
            options={facilityOptions}
            value={selectedFacility.name}
            onChange={input => {
              setSelectedFacility(input);
            }}
            name={'Facility'}
            className={'w-[255px]'}
          />
          <EmissionsYearlyCarbonFootprintChart />
          <EmissionsCarbonFootprintCharts />
        </div>
      </AppContent>
    </ColdEmissionsContext.Provider>
  );
};

export const CarbonFootprint = withErrorBoundary(_CarbonFootprint, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
