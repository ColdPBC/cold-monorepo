import React, { useContext } from 'react';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { BaseButton, Markdown, Spinner, WizardContext } from '@coldpbc/components';
import ReactMarkdown from 'react-markdown';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { ToastMessage } from '@coldpbc/interfaces';
import { useSWRConfig } from 'swr';

export const AutomateComplianceStep = () => {
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

  if (documents.isLoading) {
    return <Spinner />;
  }

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
    <div className={'w-full h-full flex flex-col justify-center items-center text-tc-primary'}>
      <div className={'w-[847px]'}>
        <div className={'text-h1 text-left'}>Start Automation</div>
        <Markdown
          markdown={
            `Cold Climate will pre-fill as much of the form as possible based on the documents below. You'll always be able to review and edit yourself before submitting anything. \n\nDocuments` +
            `${documentsList}`
          }
        />
        <div className={'w-full flex flex-row space-x-4'}>
          <BaseButton className={'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300'} label={'Start'} onClick={() => startAutomation()} />
          <BaseButton
            className={'h-[72px] w-full'}
            label={'Skip For Now'}
            onClick={() => {
              navigateToStep('questionnaire');
            }}
            variant={ButtonTypes.secondary}
          />
        </div>
      </div>
    </div>
  );
};
