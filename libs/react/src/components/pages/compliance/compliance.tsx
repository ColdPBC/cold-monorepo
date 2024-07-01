import React from 'react';
import { CenterColumnContent, ComplianceOverview, CompliancePageWrapper, ErrorFallback, Spinner } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { find } from 'lodash';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { ErrorType } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ColdComplianceSetsProvider } from '@coldpbc/providers';

const _CompliancePage = () => {
  const { orgId } = useAuth0Wrapper();
  const { logError, logBrowser } = useColdContext();
  const ldFlags = useFlags();

  const getComplianceSetsURL = () => {
    if (ldFlags.showNewCompliancePageHomeCold671) {
      return null;
    } else {
      return ['/compliance_definitions', 'GET'];
    }
  };

  const getOrgComplianceSetsURL = () => {
    if (ldFlags.showNewComplianceManagerCold711) {
      return null;
    } else {
      return [`/compliance_definitions/organizations/${orgId}`, 'GET'];
    }
  };

  const compliances = useSWR<Compliance[], any, any>(getComplianceSetsURL(), axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>(getOrgComplianceSetsURL(), axiosFetcher);

  if (compliances.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error) {
    logBrowser(
      'Error loading compliance data',
      'error',
      {
        compliances,
        orgCompliances,
      },
      compliances.error || orgCompliances.error,
    );
    logError(compliances.error, ErrorType.SWRError);
    return null;
  }

  logBrowser('Compliance data loaded', 'info', { compliances, orgCompliances });

  if (ldFlags.showNewCompliancePageHomeCold671) {
    return (
      <ColdComplianceSetsProvider>
        <CompliancePageWrapper />
      </ColdComplianceSetsProvider>
    );
  } else {
    return (
      <CenterColumnContent title="Compliance">
        <div className={'w-full space-y-10'}>
          {compliances.data
            ?.filter(comp => {
              return comp.visible;
            })
            .map((compliance, index) => {
              const complianceFound = find(orgCompliances.data, { compliance_id: compliance.id });
              return (
                <div key={'compliance_' + index} data-testid={`compliance-${compliance.id}`}>
                  <ComplianceOverview complianceData={compliance} orgComplianceData={complianceFound} />
                </div>
              );
            })}
        </div>
      </CenterColumnContent>
    );
  }
};

export const CompliancePage = withErrorBoundary(_CompliancePage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
