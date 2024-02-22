import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import React, { useRef } from 'react';
import { forEach } from 'lodash';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios';
import { IButtonProps, ToastMessage } from '@coldpbc/interfaces';
import { ErrorType } from '@coldpbc/enums';
import { BaseButton } from '@coldpbc/components';
import { useSWRConfig } from 'swr';

export interface DocumentUploadButtonProps {
  buttonProps: IButtonProps;
}

export const DocumentUploadButton = (props: DocumentUploadButtonProps) => {
  const { buttonProps } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logError } = useColdContext();
  const { mutate } = useSWRConfig();

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
      await mutate(
        [`/organizations/${orgId}/files`, 'GET'],
        (cachedData: any) => {
          const newFiles: Array<any> = [];
          if (cachedData !== undefined) newFiles.push(...cachedData);
          forEach(files, file => {
            newFiles.push({
              original_name: file.name,
            });
          });
          return newFiles;
        },
        {
          revalidate: false,
        },
      );
      props.buttonProps?.onClick && props.buttonProps?.onClick();
    }
  };

  const uploadButton = () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  return (
    <>
      <BaseButton {...buttonProps} onClick={() => uploadButton()} />
      <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden multiple />
    </>
  );
};
