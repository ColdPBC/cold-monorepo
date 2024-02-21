import React, { useContext } from 'react';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Spinner, WizardContext, ComplianceWizardLairBase } from '@coldpbc/components';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { ToastMessage } from '@coldpbc/interfaces';
import { useSWRConfig } from 'swr';

export const AutomateComplianceFlowStep = () => {
  const documents = useOrgSWR<any, any>(['/files'], axiosFetcher);
  const { logError } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { nextStep, navigateToStep } = useContext(WizardContext);
  const { mutate } = useSWRConfig();

  const startAutomation = async () => {
    // post to start automation
    const response = await axiosFetcher([`/compliance_definitions/rei/organization/${orgId}`, 'POST']);
    if (isAxiosError(response)) {
      await addToastMessage({ message: 'Automation could not be started', type: ToastMessage.FAILURE });
      logError(response.message, ErrorType.AxiosError, response);
    } else {
      await mutate([`/compliance_definitions/organization/${orgId}`, 'GET']);
      await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
      nextStep();
    }
  };

  if (documents.error) {
    logError(documents.error, ErrorType.SWRError);
    return null;
  }

  // convert documents to list and then to concatenated string for markdown to display
  const documentsList: string = documents.data
    ?.map((document: any) => {
      // separate the original_name of each document to file name and extension. use the file name only
      const fileName = document.original_name.split('.')[0];
      return ` \n * [${fileName}]`;
    })
    .join('');

  return (
    <ComplianceWizardLairBase
      title={'Start Automation'}
      markdown={`Cold Climate will pre-fill as much of the form as possible based on the documents below. You'll always be able to review and edit yourself before submitting anything. \n\nDocuments ${documentsList}`}
      ctas={[
        { label: 'Start', onClick: () => startAutomation(), className: 'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300' },
        { label: 'Skip For Now', onClick: () => navigateToStep('questionnaire'), variant: ButtonTypes.secondary, className: 'h-[72px] w-full' },
      ]}
      isLoading={documents.isLoading}
    />
  );
};
