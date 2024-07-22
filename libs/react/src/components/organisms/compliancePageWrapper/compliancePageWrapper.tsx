import { ComplianceSetOverviewCard, MainContent, Select } from '@coldpbc/components';
import React, { useContext } from 'react';
import { CompliancePageFilter } from '@coldpbc/enums';
import { InputOption } from '@coldpbc/interfaces';
import { ColdCompliancePageContext } from '@coldpbc/context';

export const CompliancePageWrapper = () => {
  const { data, filter, setFilter } = useContext(ColdCompliancePageContext);
  const { allComplianceSets } = data;
  const getFilter = () => {
    const filterOptions: InputOption[] = [
      { id: 0, value: CompliancePageFilter.all, name: 'All Records' },
      { id: 1, value: CompliancePageFilter.upcoming, name: 'Upcoming' },
      { id: 2, value: CompliancePageFilter.passed, name: 'Passed' },
      { id: 3, value: CompliancePageFilter.active, name: 'Active' },
      { id: 4, value: CompliancePageFilter.notActive, name: 'Not Active' },
    ];

    return (
      <Select
        options={filterOptions}
        onChange={option => {
          setFilter(option.value as CompliancePageFilter);
        }}
        value={filter}
        name={'compliance-page-filter'}
        className={'w-[192px]'}
      />
    );
  };

  return (
    <MainContent title="Compliance" headerElement={getFilter()}>
      <div className={'w-full space-y-[24px]'}>
        {allComplianceSets
          ?.sort((a, b) => {
            return a.title.localeCompare(b.title);
          })
          .map((compliance, index) => {
            return (
              <div key={'compliance_' + index} data-testid={`compliance-${compliance.id}`}>
                <ComplianceSetOverviewCard complianceSet={compliance} />
              </div>
            );
          })}
      </div>
    </MainContent>
  );
};
