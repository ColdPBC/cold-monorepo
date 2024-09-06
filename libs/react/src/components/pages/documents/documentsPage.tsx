import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { DocumentDetailsSidebar, DocumentsHeaderTypes, DocumentUploadButton, ErrorFallback, MainContent, Modal, Spinner } from '@coldpbc/components';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Files, ToastMessage } from '@coldpbc/interfaces';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { withErrorBoundary } from 'react-error-boundary';
import { DocumentsTable } from '../../organisms/documentsTable/documentsTable';

const _DocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = React.useState<Files | undefined>(undefined);
  const [documentToDelete, setDocumentToDelete] = React.useState<Files | undefined>(undefined);
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
  const [files, setFiles] = React.useState<Files[]>([]);
  const [selectedDocumentURL, setSelectedDocumentURL] = React.useState<string | undefined>(undefined);
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const filesSWR = useOrgSWR<Files[], any>([`/files`, 'GET'], axiosFetcher);
  const selectedFileURLSWR = useOrgSWR<string>(selectedDocument ? [`/files/${selectedDocument?.id}/url`, 'GET'] : null, axiosFetcher);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectDocument = (id: string) => {
    const document = files.find(file => file.id === id);
    if (document) {
      setSelectedDocument(document);
    }
  };

  const updateFile = async (fileState: Files | undefined) => {
    if (fileState) {
      const response = await axiosFetcher([
        `/organizations/${orgId}/files/${fileState?.id}`,
        'PATCH',
        {
          effective_end_date: fileState.effective_end_date,
          effective_start_date: fileState.effective_start_date,
          type: fileState.type,
        },
      ]);
      if (isAxiosError(response)) {
        addToastMessage({
          message: 'Error updating file',
          type: ToastMessage.FAILURE,
        });
        logBrowser('Error updating file', 'error', { ...response }, response);
      } else {
        addToastMessage({
          message: 'File updated successfully',
          type: ToastMessage.SUCCESS,
        });
      }
      await filesSWR.mutate();
    }
  };

  const checkIfFileChanged = (fileState: Files | undefined) => {
    if (filesSWR.data && fileState) {
      // check the filesSWR.data for the fileState.id
      const swrFile = filesSWR.data?.find(file => file.id === fileState?.id);
      if (swrFile) {
        return swrFile.effective_end_date !== fileState.effective_end_date || swrFile.effective_start_date !== fileState.effective_start_date || swrFile.type !== fileState.type;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onSidebarClose = () => {
    setSelectedDocument(undefined);
    if (checkIfFileChanged(selectedDocument)) {
      updateFile(selectedDocument);
    }
  };

  useEffect(() => {
    if (filesSWR.data && !isAxiosError(filesSWR.data)) {
      setFiles(filesSWR.data);
    }
  }, [filesSWR.data]);

  useEffect(() => {
    if (selectedFileURLSWR.data && !isAxiosError(selectedFileURLSWR.data)) {
      setSelectedDocumentURL(selectedFileURLSWR.data);
    }
  }, [selectedFileURLSWR]);

  if (filesSWR.error) {
    logBrowser('Error fetching files', 'error', { ...filesSWR.error }, filesSWR.error);
  }

  if (filesSWR.isLoading) {
    return <Spinner />;
  }

  const getPageButtons = () => {
    return (
      <div className={'h-auto'}>
        <DocumentUploadButton
          buttonProps={{
            label: 'Add New',
            iconLeft: IconNames.PlusIcon,
          }}
          mutateFunction={filesSWR.mutate}
        />
      </div>
    );
  };

  const deleteDocument = async (documentToDelete: Files) => {
    setDeleteButtonLoading(true);
    const response = await axiosFetcher([`/organizations/${orgId}/files/${documentToDelete.id}`, 'DELETE']);
    await filesSWR.mutate();
    if (isAxiosError(response)) {
      logBrowser('Error deleting file', 'error', { ...response }, response);
      addToastMessage({
        message: 'Error deleting file',
        type: ToastMessage.FAILURE,
      });
    } else {
      addToastMessage({
        message: 'File deleted successfully',
        type: ToastMessage.SUCCESS,
      });
    }
    setDeleteButtonLoading(false);
    setDocumentToDelete(undefined);
  };

  const onDeleteClick = (file: Files) => {
    setSelectedDocument(undefined);
    setDocumentToDelete(file);
  };

  const onDocumentDownload = async (fileURL: string | undefined) => {
    // open signedURL
    if (fileURL) {
      window.location.href = fileURL;
      addToastMessage({
        message: 'Downloaded file',
        type: ToastMessage.SUCCESS,
      });
    }
  };

  const exportClick = () => {
    // get all the signed urls for the files
  };

  return (
    <div className="relative overflow-y-auto h-full w-full">
      <MainContent title="Documents" className={'gap-[40px]'} headerElement={getPageButtons()}>
        <DocumentsHeaderTypes files={files} />
        <DocumentsTable
          files={files}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          selectDocument={selectDocument}
          checkIfFileChanged={checkIfFileChanged}
          updateFile={updateFile}
        />
      </MainContent>
      <DocumentDetailsSidebar
        file={selectedDocument}
        updateFile={setSelectedDocument}
        closeSidebar={onSidebarClose}
        innerRef={ref}
        deleteFile={onDeleteClick}
        isLoading={selectedFileURLSWR.isLoading}
        downloadFile={onDocumentDownload}
        signedUrl={selectedDocumentURL}
      />
      <Modal
        show={documentToDelete !== undefined}
        setShowModal={() => {
          setDocumentToDelete(undefined);
        }}
        header={{
          title: `Are you sure you want to delete ${documentToDelete?.original_name}?`,
          cardProps: {
            glow: false,
          },
        }}
        body={
          <div className={'text-body text-tc-primary'}>
            Once you delete, this document will be removed from Cold and no longer used in any assessments or reporting. This cannot be undone.
          </div>
        }
        footer={{
          rejectButton: {
            label: 'Cancel',
            onClick: () => setDocumentToDelete(undefined),
            variant: ButtonTypes.secondary,
          },
          resolveButton: {
            label: 'Yes, Delete',
            onClick: async () => {
              if (documentToDelete) {
                await deleteDocument(documentToDelete);
              }
            },
            disabled: deleteButtonLoading,
            loading: deleteButtonLoading,
            variant: ButtonTypes.warning,
          },
        }}
      />
    </div>
  );
};

export const DocumentsPage = withErrorBoundary(_DocumentsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DocumentsPage: ', error);
  },
});
