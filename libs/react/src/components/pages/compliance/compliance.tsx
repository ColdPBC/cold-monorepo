import React from 'react';
import { CenterColumnContent, ErrorFallback, Spinner } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { find } from 'lodash';
import { Compliance, OrgCompliance, ToastMessage } from '@coldpbc/interfaces';
import useSWR, { useSWRConfig } from 'swr';
import { ErrorType } from '@coldpbc/enums';
import { ComplianceOverview } from '../../organisms/complianceOverview/complianceOverview';
import { withErrorBoundary } from 'react-error-boundary';

const _CompliancePage = () => {
  const { orgId } = useAuth0Wrapper();
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organization/${orgId}`, 'GET'], axiosFetcher);
  const { logError } = useColdContext();

  if (compliances.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error) {
    logError(compliances.error, ErrorType.SWRError);
    return null;
  }

  if (compliances.data && orgCompliances.data) {
    return (
      <CenterColumnContent title="Compliance">
        <div className={'w-full space-y-10'}>
          {compliances.data.map((compliance, index) => {
            const complianceFound = find(orgCompliances.data, { compliance_id: compliance.id });
            return (
              <div key={'compliance_' + index}>
                <ComplianceOverview complianceData={compliance} orgComplianceData={complianceFound} />
              </div>
            );
          })}
        </div>
      </CenterColumnContent>
    );
  } else {
    return null;
  }
};

export const CompliancePage = withErrorBoundary(_CompliancePage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
