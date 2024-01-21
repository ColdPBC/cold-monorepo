import React from 'react';
import { CenterColumnContent, Spinner } from '@coldpbc/components';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { find } from 'lodash';
import { Compliance, OrgCompliance, ToastMessage } from '@coldpbc/interfaces';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { getComplianceProgress } from '@coldpbc/lib';
import { isAxiosError } from 'axios';
import { ErrorType } from '@coldpbc/enums';
import { ComplianceOverview } from '../../organisms/complianceOverview/complianceOverview';

export const CompliancePage = () => {
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organization/${orgId}`, 'GET'], axiosFetcher);
  const { mutate } = useSWRConfig();
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
            return <ComplianceOverview complianceData={compliance} orgComplianceData={complianceFound} />;
          })}
        </div>
      </CenterColumnContent>
    );
  } else {
    return null;
  }
};
