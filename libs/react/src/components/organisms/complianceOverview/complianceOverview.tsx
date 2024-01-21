import React from 'react';
import { Compliance, OrgCompliance, ToastMessage } from '@coldpbc/interfaces';
import { find } from 'lodash';
import { getComplianceProgress } from '@coldpbc/lib';
import { ComplianceOverviewCard } from '@coldpbc/components';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios/index';
import { ErrorType } from '@coldpbc/enums';
import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

export interface ComplianceOverviewProps {
  complianceData: Compliance;
  orgComplianceData: OrgCompliance | undefined;
}

export const ComplianceOverview = (props: ComplianceOverviewProps) => {
  const { complianceData, orgComplianceData } = props;
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { logError } = useColdContext();

  const complianceProgress = getComplianceProgress(
    orgComplianceData === undefined
      ? {
          ...complianceData,
          surveys: [],
        }
      : complianceFound.compliance_definition,
  );

  const getCTAOnClick = async (compliance: Compliance) => {
    // check if the compliance is orgCompliance
    const found = find(orgCompliances.data, { compliance_id: compliance.id });

    if (found !== undefined) {
      navigate(`/compliance/${compliance.name}`);
      return;
    } else {
      const response = await axiosFetcher([`/compliance_definitions/${compliance.name}/organization/${orgId}`, 'POST']);
      // todo: handle getting updates from the server
      if (isAxiosError(response)) {
        logError(response.message, ErrorType.AxiosError, response);
        await addToastMessage({ message: 'Compliance could not be added', type: ToastMessage.FAILURE });
      } else {
        const newComplianceData = response as {
          id: string;
          organization_id: string;
          compliance_id: string;
          created_at: string;
          updated_at: string;
        };
        await mutate(
          [`/compliance_definitions/organization/${orgId}`, 'GET'],
          data => {
            return [
              ...data,
              {
                ...newComplianceData,
                compliance_definition: compliance,
              },
            ];
          },
          {
            revalidate: false,
          },
        );
        await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
      }
    }
  };

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
};
