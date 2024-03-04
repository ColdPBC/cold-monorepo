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
  const [loading, setLoading] = React.useState<boolean>(false);
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const { logError } = useColdContext();

  const getCTAOnClick = async () => {
    if (orgComplianceData !== undefined) {
      await navigate(`/wizard/compliance/${orgComplianceData.compliance_definition.name}`);
    } else {
      const response = await axiosFetcher([`/compliance_definitions/${complianceData.name}/organizations/${orgId}`, 'POST']);
      if (isAxiosError(response)) {
        await addToastMessage({ message: 'Compliance could not be added', type: ToastMessage.FAILURE });
        logError(response.message, ErrorType.AxiosError, response);
      } else {
        await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
        await navigate(`/wizard/compliance/${complianceData.name}`);
      }
    }
  };

  const getCTAButton = (): IButtonProps => {
    if (orgComplianceData !== undefined) {
      return {
        label: 'See Details',
        variant: ButtonTypes.secondary,
        size: GlobalSizes.large,
        onClick: async () => {
          setLoading(true);
          await getCTAOnClick();
          setLoading(false);
        },
        loading: loading,
      };
    } else {
      return {
        label: 'Activate',
        variant: ButtonTypes.primary,
        size: GlobalSizes.large,
        onClick: async () => {
          setLoading(true);
          await getCTAOnClick();
          setLoading(false);
        },
        loading: loading,
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
