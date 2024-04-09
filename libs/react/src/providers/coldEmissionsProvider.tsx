import React, { PropsWithChildren } from 'react';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { EmissionPayload, InputOption } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Spinner } from '@coldpbc/components';
import { ErrorType } from '@coldpbc/enums';
import { ColdEmissionsContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';
import { find, forEach, map, uniq } from 'lodash';

export const ColdEmissionsProvider = ({ children }: PropsWithChildren) => {
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

  let uniqueScopes = Array<number>();

  if (isAxiosError(data) && data?.response?.status === 404) {
    logBrowser('No emissions data found', 'error', { data }, data);
  } else {
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

    uniqueScopes = uniq(
      map(data?.definition, facility => {
        return map(facility.periods, period => {
          return map(period.emissions, emission => {
            return emission.scope.ghg_category;
          }).flat();
        }).flat();
      }).flat(),
    ).sort();
  }

  logBrowser('Emissions Provider', 'info', { data, uniqueScopes, facilityOptions, yearOptions });

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
      {children}
    </ColdEmissionsContext.Provider>
  );
};
