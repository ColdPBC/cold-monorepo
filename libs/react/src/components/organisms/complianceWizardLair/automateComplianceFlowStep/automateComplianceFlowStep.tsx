import React, { useContext, useState } from 'react';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ComplianceWizardLairBase, ErrorFallback, WizardContext } from '@coldpbc/components';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { useSWRConfig } from 'swr';
import { withErrorBoundary } from 'react-error-boundary';
import Cookies from 'js-cookie';
import { addMinutes } from 'date-fns';
import { isAxiosError } from 'axios';
import { ToastMessage } from '@coldpbc/interfaces';

const _AutomateComplianceFlowStep = () => {
  const documents = useOrgSWR<any, any>(['/files', 'GET'], axiosFetcher);
  const { logError, logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { nextStep, setCurrentStep, data } = useContext(WizardContext);
  const { mutate } = useSWRConfig();
  const { name } = data;
  // get cookie using the orgId
  let initialState = false;
  if (orgId) {
    initialState = Cookies.get(`automationKickoff-${orgId}-${name}`) === 'true';
  }
  const [automationKickoff, setAutomationKickoff] = useState(initialState);

  const startAutomation = async () => {
    // post to start automation
    const response = await axiosFetcher([`/compliance_definitions/${name}/organizations/${orgId}`, 'PUT']);
    if (isAxiosError(response)) {
      logBrowser('Error starting automation', 'error', {
        orgId,
        name,
      });
      await addToastMessage({ message: 'Automation could not be started', type: ToastMessage.FAILURE });
    } else {
      // set cookie to true. it should expire in 5 minutes
      logBrowser('Automation successfully started', 'info', {
        orgId,
        name,
      });
      await mutate([`/compliance_definitions/organizations/${orgId}`, 'GET']);
      await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
      const expires = addMinutes(new Date(), 5);
      Cookies.set(`automationKickoff-${orgId}-${name}`, 'true', {
        expires: expires,
      });
      setAutomationKickoff(true);
      nextStep();
    }
  };

  if (documents.error) {
    logBrowser('Error fetching documents', 'error', { ...documents.error }, documents.error);
    logError(documents.error, ErrorType.SWRError);
    return null;
  }
  // convert documents to list and then to concatenated string for markdown to display
  const documentsList: string = documents.data
    ?.map((document: any) => {
      // separate the original_name of each document to file name and extension. use the file name only
      const fileName = document.original_name.split('.')[0];
      return ` \n * ${fileName}`;
    })
    .join('');

  const getAutomationButtonClassName = () => {
    if (automationKickoff) {
      return 'h-[72px] w-full';
    } else {
      return 'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300';
    }
  };

  return (
    <ComplianceWizardLairBase
      title={'Start Automation'}
      markdown={`Cold will pre-fill as much of the form as possible based on the documents below. You'll always be able to review and edit responses yourself before submission. \n\nDocuments being used: ${documentsList}`}
      ctas={[
        {
          label: 'Start',
          onClick: () => startAutomation(),
          className: getAutomationButtonClassName(),
          disabled: automationKickoff,
        },
        {
          label: 'Skip For Now',
          onClick: () => setCurrentStep('questionnaire'),
          variant: ButtonTypes.secondary,
          className: 'h-[72px] w-full',
        },
      ]}
      isLoading={documents.isLoading}
    />
  );
};

export const AutomateComplianceFlowStep = withErrorBoundary(_AutomateComplianceFlowStep, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in AutomateComplianceFlowStep: ', error);
  },
});
