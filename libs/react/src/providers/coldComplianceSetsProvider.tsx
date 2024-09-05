import React, { PropsWithChildren } from 'react';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { AllCompliance } from '@coldpbc/interfaces';
import { Spinner } from '@coldpbc/components';
import { ColdCompliancePageContext } from '@coldpbc/context';
import { CompliancePageFilter } from '@coldpbc/enums';
import { get } from 'lodash';

export const ColdComplianceSetsProvider = ({ children }: PropsWithChildren) => {
  const { orgId } = useAuth0Wrapper();
  const [filter, setFilter] = React.useState<CompliancePageFilter>(CompliancePageFilter.all);
  const allComplianceSets = useSWR<AllCompliance[], any, any>([`/compliance/all/organizations/${orgId}`, 'GET'], axiosFetcher);
  const organizationSWR = useGraphQLSWR('query Organizations {organizations { id name displayName }}');

  if (allComplianceSets.isLoading || organizationSWR.isLoading) {
    return <Spinner />;
  }

  if (allComplianceSets.error) {
    return null;
  }

  console.log(get(organizationSWR, 'data.data.organizations', undefined));

  return (
    <ColdCompliancePageContext.Provider
      value={{
        data: {
          allComplianceSets: allComplianceSets.data?.filter(compliance => compliance.visible),
        },
        filter,
        setFilter,
      }}>
      {children}
    </ColdCompliancePageContext.Provider>
  );
};
