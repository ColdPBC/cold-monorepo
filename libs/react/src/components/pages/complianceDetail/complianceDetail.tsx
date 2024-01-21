import React, { useEffect } from 'react';
import { CenterColumnContent, MainContent, Spinner } from '@coldpbc/components';
import { ComplianceOverviewCard } from '../../organisms/complianceOverviewCard/complianceOverviewCard';
import { useAuth0Wrapper, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { forEach, forOwn, isUndefined } from 'lodash';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Compliance, OrgCompliance, SurveyPayloadType } from '@coldpbc/interfaces';
import { getComplianceProgress } from '@coldpbc/lib';
import { mutate as globalMutate } from 'swr/_internal';
import useSWR from 'swr';
import { ComplianceSectionOverview } from '../../organisms/complianceSectionOverview/complianceSectionOverview';

export const ComplianceDetail = () => {
  const { orgId } = useAuth0Wrapper();
  const params = useParams();
  const complianceName = params['name'];
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organization/${orgId}`, 'GET'], axiosFetcher);

  if (orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (orgCompliances.error) {
    console.log('Error loading compliance data');
  }

  if (orgCompliances.data) {
    const compliance = orgCompliances.data.find(compliance => {
      return compliance.compliance_definition.name === complianceName;
    });
    if (compliance) {
      return (
        <CenterColumnContent title="REI Compliance">
          <div className={'w-full space-y-10'}>
            <div className={'w-full space-y-[24px]'}>
              {compliance.compliance_definition.surveys.map((survey, index) => {
                return <ComplianceSectionOverview surveyName={survey} />;
              })}
            </div>
          </div>
        </CenterColumnContent>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};
