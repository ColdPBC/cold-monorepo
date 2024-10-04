import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import React, { useRef } from 'react';
import { forEach } from 'lodash';
import { axiosFetcher } from '@coldpbc/fetchers';
import {AxiosError, AxiosRequestConfig, isAxiosError} from 'axios';
import { IButtonProps, ToastMessage, ToastMessageType } from '@coldpbc/interfaces';
import { BaseButton } from '@coldpbc/components';
import { KeyedMutator, useSWRConfig } from 'swr';

export interface DocumentUploadButtonProps {
  buttonProps: IButtonProps;
  mutateFunction?: KeyedMutator<any>;
  successfulToastMessage?: Partial<ToastMessageType>;
  failureToastMessage?: Partial<ToastMessageType>;
}

export const DocumentUploadButton = (props: DocumentUploadButtonProps) => {
  const { buttonProps, mutateFunction, successfulToastMessage, failureToastMessage} = props;
  const [sending, setSending] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logBrowser } = useColdContext();
  const { mutate } = useSWRConfig();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSending(true);
    const files = event.target.files;
    const formData = new FormData();
    forEach(files, file => {
      formData.append('file', file);
    });
    const config = JSON.stringify({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    } as AxiosRequestConfig);
    const response = await axiosFetcher([`/organizations/${orgId}/files`, 'POST', formData, config]);
    if (isAxiosError(response)) {
      const error: AxiosError = response;
      if(error.response?.status === 409) {
        await addToastMessage({
          message: 'File already exists. Error Uploading',
          type: ToastMessage.FAILURE,
          ...failureToastMessage,
        });
        logBrowser('Duplicate file uploaded', 'error', {orgId, formData: { ...formData }, response});
      } else {
        await addToastMessage({
          type: ToastMessage.FAILURE,
          message: 'Upload failed',
          ...failureToastMessage,
        });
        logBrowser('Upload failed', 'error', {orgId, formData: { ...formData }, response});
      }
    } else {
      await addToastMessage({
        message: 'Upload successful',
        type: ToastMessage.SUCCESS,
        ...successfulToastMessage,
      });
      logBrowser('File Upload successful', 'info', { orgId, formData: { ...formData } });
    }


    if (mutateFunction) {
      await mutateFunction();
    } else {
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
    }
    setSending(false);
  };

  const uploadButton = async () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  return (
    <>
      <BaseButton {...buttonProps} onClick={() => uploadButton()} disabled={sending} loading={sending} />
      <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden multiple />
    </>
  );
};
