import React from 'react';
import { AppContent, BaseButton, Card, Datagrid, Spinner } from '@coldpbc/components';
import { ButtonTypes, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ToastMessage } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { openAIFetcher } from '../../../fetchers/openAIFetcher';

export const DocumentUpload = () => {
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logError } = useColdContext();

  const filesSWR = useSWR<any, any, any>([`/organization/${orgId}/files`, 'GET'], openAIFetcher);

  const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
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
      await filesSWR.mutate(
        (data: any) => {
          return [
            ...data,
            {
              original_name: file.name,
            },
          ];
        },
        {
          revalidate: false,
        },
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      uploadDocument(file);
    }
  };

  const getFileNameAndExtension = (file: any) => {
    if (file.original_name) {
      const lastDotIndex = file.original_name.lastIndexOf('.');
      const name = file.original_name.substring(0, lastDotIndex);
      const extension = file.original_name.substring(lastDotIndex + 1);
      return { name, extension };
    } else {
      return {
        name: file.object,
        extension: file.object,
      };
    }
  };

  if (filesSWR.error) {
    logError(filesSWR.error.message, ErrorType.SWRError, filesSWR.error);
  }

  if (filesSWR.isLoading) {
    return <Spinner />;
  }

  const data = filesSWR.data?.map((file: any) => {
    const { name, extension } = getFileNameAndExtension(file);
    return {
      name: <div className="flex items-center text-tc-primary">{name}</div>,
      type: <span className="text-white font-medium text-sm leading-normal">{extension}</span>,
    };
  });

  return (
    <AppContent title="Documents">
      <Card title={'Documents List'} className={'w-full px-4'}>
        <input id="file" type="file" onChange={handleFileChange} />
        {data.length > 0 ? (
          <Datagrid definitionURL={'/components/documents_list_table'} items={data} />
        ) : (
          <Card glow={false} className="flex items-center justify-center w-full bg-bgc-elevate border-1 border-bgc-elevated">
            No documents uploaded
          </Card>
        )}
      </Card>
    </AppContent>
  );
};
