import React from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { AppContent, CenterColumnContent, Dropdown, EmissionsAllScopesCard, EmissionsScopeChartCard, RightColumnContent } from '@coldpbc/components';
import { find, forEach, map, uniq } from 'lodash';
import { EmissionPayload } from '@coldpbc/interfaces';
import { subYears } from 'date-fns';

export const EmissionsCarbonFootprintCharts = ({ emissionPayload }: { emissionPayload: EmissionPayload | undefined }) => {
  const [selectedYear, setSelectedYear] = React.useState<string>(subYears(new Date(), 1).getFullYear().toString());
  const [selectedFacility, setSelectedFacility] = React.useState<string>('all');

  const uniqueScopes = uniq(
    map(emissionPayload?.definition, facility => {
      return map(facility.periods, period => {
        return map(period.emissions, emission => {
          return emission.scope.ghg_category;
        }).flat();
      }).flat();
    }).flat(),
  );

  const yearOptions = Array<{
    label: string;
    value: string;
  }>();
  const facilityOptions = Array<{
    label: string;
    value: string;
  }>();

  facilityOptions.push({
    label: 'All Facilities',
    value: 'all',
  });

  forEach(emissionPayload?.definition, facility => {
    facilityOptions.push({
      label: facility.facility_name,
      value: facility.facility_id.toString(),
    });
    forEach(facility.periods, period => {
      if (find(yearOptions, { value: period.value.toString() })) {
        return;
      }
      yearOptions.push({
        label: `${period.value} Emissions`,
        value: period.value.toString(),
      });
    });
  });

  return (
    <ColdEmissionsContext.Provider
      value={{
        data: emissionPayload,
        selectedYear: parseInt(selectedYear),
        selectedFacility: selectedFacility,
      }}>
      <div className={'flex flex-col space-y-[35px]'}>
        <div className={'flex flex-row space-x-4 justify-start'}>
          <Dropdown options={yearOptions} selected={selectedYear} onSelect={setSelectedYear} containerClassName={'w-[255px]'} />
          <Dropdown options={facilityOptions} selected={selectedFacility} onSelect={setSelectedFacility} containerClassName={'w-[255px]'} />
        </div>
        <AppContent>
          <CenterColumnContent>
            {uniqueScopes.map(scope => {
              return (
                <div key={scope} data-testid={`emission-scope-chart-scope-${scope}`} className={'w-full'}>
                  <EmissionsScopeChartCard scope_category={scope} />
                </div>
              );
            })}
          </CenterColumnContent>
          <RightColumnContent>
            <EmissionsAllScopesCard />
          </RightColumnContent>
        </AppContent>
      </div>
    </ColdEmissionsContext.Provider>
  );
};
