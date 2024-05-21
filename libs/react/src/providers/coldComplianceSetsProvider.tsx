import React, { PropsWithChildren } from 'react';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { Spinner } from '@coldpbc/components';
import { ColdCompliancePageContext } from '@coldpbc/context';
import { CompliancePageFilter } from '@coldpbc/enums';

export const ColdComplianceSetsProvider = ({ children }: PropsWithChildren) => {
  const { orgId } = useAuth0Wrapper();
  const [filter, setFilter] = React.useState<CompliancePageFilter>(CompliancePageFilter.all);
  const complianceSets = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  if (complianceSets.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (complianceSets.error || orgCompliances.error) {
    return null;
  }

  if (complianceSets.data && orgCompliances.data) {
    return (
      <ColdCompliancePageContext.Provider
        value={{
          data: {
            complianceSets: complianceSets.data.filter(compliance => compliance.visible),
            orgComplianceSets: orgCompliances.data,
          },
          filter,
          setFilter,
        }}>
        {children}
      </ColdCompliancePageContext.Provider>
    );
  }
};
