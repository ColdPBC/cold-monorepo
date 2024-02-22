import React, { useContext, useRef } from 'react';
import { ComplianceWizardLairBase, WizardContext } from '@coldpbc/components';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios';
import { Compliance, ToastMessage } from '@coldpbc/interfaces';
import { forEach } from 'lodash';
import { useSWRConfig } from 'swr';
import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';

export const DocumentsUploadComplianceFlowStep = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, cache } = useSWRConfig();
  const { logError } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const { nextStep, data } = useContext(WizardContext);
  const complianceSet = data['compliances'].find((compliance: Compliance) => compliance.name === data['name']);
  const { title } = complianceSet;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formData = new FormData();
    forEach(files, file => {
      formData.append('file', file);
    });
    const headers = JSON.stringify({
      'Content-Type': 'multipart/form-data',
    });
    const response = await axiosFetcher([`/organizations/${orgId}/files`, 'POST', formData, headers]);
    if (isAxiosError(response)) {
      await addToastMessage({
        message: 'Upload failed',
        type: ToastMessage.FAILURE,
      });
      logError(response.message, ErrorType.AxiosError, response);
    } else {
      await addToastMessage({
        message: 'Upload successful',
        type: ToastMessage.SUCCESS,
      });
      await mutate([`/organizations/${orgId}/files`, 'GET'], (cachedData: any) => {
        const newFiles: Array<any> = [];
        if (cachedData !== undefined) newFiles.push(...cachedData);
        forEach(files, file => {
          newFiles.push({
            original_name: file.name,
          });
        });
        return newFiles;
      });
      nextStep();
    }
  };

  const uploadButton = () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  return (
    <>
      <ComplianceWizardLairBase
        title={`Automate your ${title} Form`}
        markdown={`Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information. \n\nYou'll always be able to review and edit yourself before submitting anything. \n\nYou can upload as many or as few documents as you want. We recommend uploading any of the following for ${title}. \n1. Other retailer sustainability compliance forms \n2. Supplier code of conduct \n3. Climate or environmental impact statements or documents \n4. Sustainability Certifications \n5. Diversity and inclusion policies`}
        ctas={[
          { label: 'Start', onClick: () => uploadButton(), className: 'h-[72px] w-full bg-green-500 hover:bg-green-400 active:bg-green-300' },
          { label: 'Skip For Now', onClick: () => nextStep(), variant: ButtonTypes.secondary, className: 'h-[72px] w-full' },
        ]}
      />
      <input onChange={handleChange} ref={fileInputRef} type="file" hidden multiple />
    </>
  );
};
