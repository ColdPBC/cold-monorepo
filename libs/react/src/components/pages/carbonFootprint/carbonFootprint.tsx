import React from 'react';
import { AppContent, EmissionsCarbonFootprintCharts, EmissionsYearlyCarbonFootprintChart } from '@coldpbc/components';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import { EmissionPayload } from '@coldpbc/interfaces';

export const CarbonFootprint = () => {
  const { data, isLoading, error } = useOrgSWR<EmissionPayload, any>(['/emissions', 'GET'], axiosFetcher);
  const { logError, logBrowser } = useColdContext();

  if (error) {
    logBrowser('Error fetching emissions data', 'error', { error }, error);
    logError(error, ErrorType.SWRError);
    console.error(error);
  }

  return (
    <AppContent title="Carbon Footprint" isLoading={isLoading}>
      <div className={'flex flex-col space-y-[35px]'}>
        <EmissionsYearlyCarbonFootprintChart emissionFacilities={data?.definition} />
        <EmissionsCarbonFootprintCharts emissionPayload={data} />
      </div>
    </AppContent>
  );
};
