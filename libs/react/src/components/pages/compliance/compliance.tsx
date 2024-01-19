import React from 'react';
import { CenterColumnContent, Spinner } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { find } from 'lodash';
import { ComplianceOverviewCard } from '../../organisms/complianceOverviewCard/complianceOverviewCard';
import { Compliance } from '@coldpbc/interfaces';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { getComplianceProgress } from '@coldpbc/lib';
import { isAxiosError } from 'axios';
import { ErrorType } from '@coldpbc/enums';

export const ComplianceOverview = () => {
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const compliances = useSWR<Compliance[], any, any>(['/compliance', 'GET'], axiosFetcher);
  const orgCompliances = useOrgSWR<Compliance[], any>(['/compliance', 'GET'], axiosFetcher);
  const { mutate } = useSWRConfig();
  const { logError } = useColdContext();

  const getCTAOnClick = async (compliance: Compliance) => {
    // check if the compliance is orgCompliance
    const found = find(orgCompliances.data, { id: compliance.id });

    if (found !== undefined) {
      navigate(`/compliance/${compliance.name}`);
      return;
    } else {
      const response = await axiosFetcher([
        `/organizations/${orgId}/compliance/`,
        'POST',
        JSON.stringify({
          org_id: orgId,
          compliance_id: compliance.id,
        }),
      ]);
      // todo: handle getting updates from the server
      await mutate([`/organizations/${orgId}/compliance`, 'GET'], data => {
        return [...data, response];
      });
    }
  };

  if (compliances.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error) {
    console.log('Error loading compliance data');
  }

  if (compliances.data && orgCompliances.data) {
    return (
      <CenterColumnContent title="Compliance">
        <div className={'w-full space-y-10'}>
          {compliances.data.map((compliance, index) => {
            const complianceFound = find(orgCompliances.data, { id: compliance.id });
            const complianceProgress = getComplianceProgress(
              complianceFound === undefined
                ? {
                    ...compliance,
                    surveys: [],
                  }
                : complianceFound,
            );

            return (
              <ComplianceOverviewCard
                complianceData={complianceProgress}
                isOverview={true}
                onOverviewPage={true}
                ctaOnClick={() => {
                  getCTAOnClick(compliance);
                }}
              />
            );
          })}
        </div>
      </CenterColumnContent>
    );
  } else {
    return null;
  }
};
