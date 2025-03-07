import {Modal} from "@coldpbc/components";
import {ButtonTypes} from "@coldpbc/enums";
import React from "react";
import {FilesWithAssurances, ToastMessage, UploadsQuery} from "@coldpbc/interfaces";
import {axiosFetcher} from "@coldpbc/fetchers";
import {AxiosError, isAxiosError} from "axios";
import {useAddToastMessage, useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {ApolloQueryResult} from "@apollo/client";
import {KeyedMutator} from "swr";


export const DeleteDocumentModal = ( props: {
  show: boolean;
  setShowModal: (show: boolean) => void;
  id: string;
  documentName: string;
  refresh: KeyedMutator<ApolloQueryResult<{
    organizationFiles: UploadsQuery[]
  }>> | KeyedMutator<ApolloQueryResult<{
    organizationFiles: FilesWithAssurances[] | null;
  }>>
}) => {
  const {logBrowser} = useColdContext();
  const {addToastMessage} = useAddToastMessage()
  const { orgId } = useAuth0Wrapper();
  const {show, setShowModal, id, documentName, refresh} = props;
  const [deletingDocument, setDeletingDocument] = React.useState(false);

  const deleteDocument = async () => {
    setDeletingDocument(true);
    const response = await axiosFetcher([`/organizations/${orgId}/files/${id}`, 'DELETE']);
    if (isAxiosError(response)) {
      const axiosError: AxiosError = response;
      if(axiosError.status === 401) {
        logBrowser('Unauthorized to delete file', 'error', { axiosError }, axiosError);
        await addToastMessage({
          message: 'Unauthorized to delete file',
          type: ToastMessage.FAILURE,
        });
      } else {
        logBrowser('Error deleting file', 'error', { axiosError }, axiosError);
        await addToastMessage({
          message: 'Error deleting file',
          type: ToastMessage.FAILURE,
        });
      }
    } else {
      logBrowser('File deleted', 'info', { response });
      await addToastMessage({
        message: 'File deleted successfully',
        type: ToastMessage.SUCCESS,
      });
    }
    await refresh();
    setDeletingDocument(false);
    setShowModal(false);
  };

  return (
    <Modal
      show={show}
      setShowModal={setShowModal}
      header={{
        title: `Are you sure you want to delete ${documentName}?`,
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
          onClick: () => setShowModal(false),
          variant: ButtonTypes.secondary,
        },
        resolveButton: {
          label: 'Yes, Delete',
          onClick: deleteDocument,
          disabled: deletingDocument,
          loading: deletingDocument,
          variant: ButtonTypes.warning,
        },
      }}
    />
  );
}
