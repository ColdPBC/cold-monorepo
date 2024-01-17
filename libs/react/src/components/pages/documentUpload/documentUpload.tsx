import React from 'react';
import { AppContent, BaseButton, Card, Datagrid } from '@coldpbc/components';
import { ButtonTypes, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ToastMessage } from '@coldpbc/interfaces';

export const DocumentUpload = () => {
  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logError } = useColdContext();

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
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      uploadDocument(file);
    }
  };

  const deleteDocument = () => {
    console.log('delete document');
  };

  const data = [
    {
      name: <div className="flex items-center text-tc-primary">billing</div>,
      type: <span className="text-white font-medium text-sm leading-normal">docx</span>,
      delete: (
        <span className={'flex justify-end'}>
          <BaseButton
            size={GlobalSizes.medium}
            variant={ButtonTypes.secondary}
            onClick={() => {
              deleteDocument();
            }}
            label={'Delete'}
          />
        </span>
      ),
    },
  ];

  return (
    <AppContent title="Documents">
      <Card title={'Documents List'} className={'w-full px-4'}>
        <input id="file" type="file" onChange={handleFileChange} />
        <Datagrid definitionURL={'/components/documents_list_table'} items={data} />
      </Card>
    </AppContent>
  );
};
