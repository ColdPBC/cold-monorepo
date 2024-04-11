import React, { useContext } from 'react';
import { AppContent, CenterColumnContent, EmissionsScopeChartCard, EmissionsScopesCard, ErrorFallback, RightColumnContent, Select } from '@coldpbc/components';
import { ColdEmissionsContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';

const _EmissionsCarbonFootprintCharts = () => {
  const { data, selectedYear, setSelectedYear, selectedFacility, setSelectedFacility, isSingleYear } = useContext(ColdEmissionsContext);

  const { uniqueScopes, yearOptions, facilityOptions } = data;

  const getFilters = () => {
    if (isSingleYear) {
      return (
        <div className={'flex flex-row space-x-2'}>
          <Select
            options={facilityOptions}
            value={selectedFacility.name}
            onChange={input => {
              setSelectedFacility(input);
            }}
            name={'Facility'}
            className={'w-[255px]'}
          />
          <div className={'w-[218px] p-[16px] text-tc-disabled text-left text-body p-4 border-[1px] border-bgc-accent rounded-lg'}>{selectedYear.name}</div>
        </div>
      );
    } else {
      return (
        <Select
          options={yearOptions}
          value={selectedYear.name}
          onChange={input => {
            setSelectedYear(input);
          }}
          name={'Year'}
          className={'w-[255px]'}
        />
      );
    }
  };

  return (
    <div className={'flex flex-col space-y-[35px] w-full'}>
      <div className={'flex flex-row justify-between w-full'}>
        <div className={'text-tc-primary text-h2'}>Emissions Details By Scope</div>
        {getFilters()}
      </div>
      <div className={'flex flex-row'}>
        <AppContent>
          <CenterColumnContent>
            {uniqueScopes.map(scope => {
              return <EmissionsScopeChartCard scope_category={scope} key={scope} />;
            })}
          </CenterColumnContent>
          <RightColumnContent>
            <EmissionsScopesCard />
          </RightColumnContent>
        </AppContent>
      </div>
    </div>
  );
};

export const EmissionsCarbonFootprintCharts = withErrorBoundary(_EmissionsCarbonFootprintCharts, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
