import React from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Compliance, IButtonProps, OrgCompliance, ToastMessage } from '@coldpbc/interfaces';
import { ComplianceOverviewCard } from '@coldpbc/components';
import { ButtonTypes, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface ComplianceOverviewProps {
  complianceData: Compliance;
  orgComplianceData: OrgCompliance | undefined;
}

export const ComplianceOverview = (props: ComplianceOverviewProps) => {
  const { complianceData, orgComplianceData } = props;
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const { logError } = useColdContext();

  const getCTAOnClick = async () => {
    if (orgComplianceData !== undefined) {
      navigate(`/compliance/${orgComplianceData.compliance_definition.name}`);
      return;
    } else {
      const response = await axiosFetcher([`/compliance_definitions/${complianceData.name}/organization/${orgId}`, 'POST']);
      if (isAxiosError(response)) {
        await addToastMessage({ message: 'Compliance could not be added', type: ToastMessage.FAILURE });
        logError(response.message, ErrorType.AxiosError, response);
      } else {
        await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
        await navigate(`/compliance/${complianceData.name}`);
      }
    }
  };

  const getCTAButton = (): IButtonProps => {
    if (orgComplianceData !== undefined) {
      return {
        label: 'See Details',
        variant: ButtonTypes.secondary,
        size: GlobalSizes.large,
        onClick: () => {
          getCTAOnClick();
        },
      };
    } else {
      return {
        label: 'Activate',
        variant: ButtonTypes.primary,
        size: GlobalSizes.large,
        onClick: () => {
          getCTAOnClick();
        },
      };
    }
  };

  return (
    <ComplianceOverviewCard
      complianceData={undefined}
      isOverview={true}
      onOverviewPage={true}
      ctas={[getCTAButton()]}
      title={complianceData.title}
      logo_url={complianceData.logo_url}
    />
  );
};
