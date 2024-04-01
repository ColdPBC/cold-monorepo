import React, { useContext } from 'react';
import { AppContent, CenterColumnContent, EmissionsAllScopesCard, EmissionsScopeChartCard, RightColumnContent, Select } from '@coldpbc/components';
import { EmissionPayload } from '@coldpbc/interfaces';
import { ColdEmissionsContext } from '@coldpbc/context';

export const EmissionsCarbonFootprintCharts = ({ emissionPayload }: { emissionPayload: EmissionPayload | undefined }) => {
  const { data, selectedYear, setSelectedYear } = useContext(ColdEmissionsContext);

  const { uniqueScopes, yearOptions } = data;

  return (
    <div className={'flex flex-col space-y-[35px] w-full'}>
      <div className={'flex flex-row justify-between w-full'}>
        <div className={'text-tc-primary text-h2'}>Emissions Details By Scope</div>
        <Select
          options={yearOptions}
          value={selectedYear.name}
          onChange={input => {
            setSelectedYear(input);
          }}
          name={'Year'}
          className={'w-[255px]'}
        />
      </div>
      <div className={'flex flex-row'}>
        <AppContent>
          <CenterColumnContent>
            {uniqueScopes.map(scope => {
              return <EmissionsScopeChartCard scope_category={scope} key={scope} />;
            })}
          </CenterColumnContent>
          <RightColumnContent>
            <EmissionsAllScopesCard />
          </RightColumnContent>
        </AppContent>
      </div>
    </div>
  );
};
