import {
  AppContent,
  Card,
  CenterColumnContent,
  DismissableInfoCard,
  EmissionsCarbonFootprintCharts,
  EmissionsDonutChart,
  EmissionsDonutChartVariants,
  EmissionsYearlyCarbonFootprintChart,
  Select,
} from '@coldpbc/components';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';
import { useColdContext } from '@coldpbc/hooks';

export const EmissionsCarbonFootprintBase = () => {
  const { logBrowser } = useColdContext();
  const { data, setSelectedFacility, selectedFacility } = useContext(ColdEmissionsContext);
  const { facilityOptions, emissions } = data;

  if (isAxiosError(emissions) && emissions?.response?.status === 404) {
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

  return (
    <AppContent title="Carbon Footprint">
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
  );
};
