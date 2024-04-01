import React from 'react';
import {
  AppContent,
  DismissableInfoCard,
  EmissionsCarbonFootprintCharts,
  EmissionsDonutChartVariants,
  EmissionsYearlyCarbonFootprintChart,
  FootprintOverviewCard,
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

export const CarbonFootprint = () => {
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

  if (isAxiosError(error) && error.response?.status === 404) {
    return (
      <AppContent title="Carbon Footprint">
        <DismissableInfoCard
          text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
          onDismiss={() => {}}
          dismissKey="footprint-page"
        />
        <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.horizontal} headerless />
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
        {uniqueScopes === undefined || uniqueScopes.length === 0 ? (
          <>
            <DismissableInfoCard
              text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
              onDismiss={() => {}}
              dismissKey="footprint-page"
            />
            <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.horizontal} headerless />
          </>
        ) : (
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
            <EmissionsYearlyCarbonFootprintChart emissionFacilities={data?.definition} />
            <EmissionsCarbonFootprintCharts emissionPayload={data} />
          </div>
        )}
      </AppContent>
    </ColdEmissionsContext.Provider>
  );
};
