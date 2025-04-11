import React, { useEffect, useState, useRef } from 'react';
import {
  DocumentDetailsSidebar,
  DocumentDetailsSidebarFileState,
  DocumentsEditMaterialsModal,
  DeleteDocumentModal, MaterialWithTier2Supplier, ErrorFallback
} from '@coldpbc/components';
import { FilesWithAssurances, Claims, ToastMessage } from '@coldpbc/interfaces';
import { useAddToastMessage, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios';
import { KeyedMutator } from 'swr';
import { ApolloQueryResult } from '@apollo/client';
import {withErrorBoundary} from "react-error-boundary";

export interface DocumentDetailsSidebarContainerProps {
  selectedDocument: string | undefined;
  setSelectedDocument: (id: string | undefined) => void;
  files: FilesWithAssurances[];
  refreshFiles: KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>>;
  sustainabilityAttributes: Claims[];
  allMaterials: MaterialWithTier2Supplier[];
}

const _DocumentDetailsSidebarContainer = (props: DocumentDetailsSidebarContainerProps) => {
  const {selectedDocument,
    setSelectedDocument,
    files,
    refreshFiles,
    sustainabilityAttributes,
    allMaterials,
  } = props
  // State management
  const [documentToDelete, setDocumentToDelete] = useState<FilesWithAssurances | undefined>(undefined);
  const [editDocumentFileState, setEditDocumentFileState] = useState<DocumentDetailsSidebarFileState | undefined>(undefined);
  const [editMaterialsModalIsOpen, setEditMaterialsModalIsOpen] = useState(false);
  const [selectedDocumentURL, setSelectedDocumentURL] = useState<string | undefined>(undefined);

  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const ref = useRef<HTMLDivElement>(null);

  // Get the selected file from files array
  const selectedFile = files.find(file => file.id === selectedDocument);

  // Fetch the signed URL for the selected document
  const selectedFileURLSWR = useOrgSWR<string>(
    selectedDocument ? [`/files/${selectedDocument}/url`, 'GET'] : null,
    axiosFetcher
  );

  // Update the selectedDocumentURL when the URL is fetched
  useEffect(() => {
    if (selectedFileURLSWR.data && !isAxiosError(selectedFileURLSWR.data)) {
      setSelectedDocumentURL(selectedFileURLSWR.data);
    }
  }, [selectedFileURLSWR]);

  const openEditMaterials = (fileState: DocumentDetailsSidebarFileState) => {
    setEditDocumentFileState(fileState);
    setEditMaterialsModalIsOpen(true);
  };

  const onDeleteClick = (id: string) => {
    const file = files.find(file => file.id === id);
    if (file) {
      setDocumentToDelete(file);
    }
    setSelectedDocument(undefined);
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

  const onSidebarClose = () => {
    setSelectedDocument(undefined);
    setEditDocumentFileState(undefined);
  };

  logBrowser('DocumentsSidebar rendered', 'info', { selectedDocument, editDocumentFileState, allMaterials });

  return (
    <>
      {
        selectedDocument && (
          <DocumentDetailsSidebar
            file={selectedFile}
            fileState={editDocumentFileState}
            setFileState={setEditDocumentFileState}
            sustainabilityAttributes={sustainabilityAttributes}
            refreshFiles={refreshFiles}
            closeSidebar={onSidebarClose}
            innerRef={ref}
            deleteFile={onDeleteClick}
            isLoading={selectedFileURLSWR.isLoading}
            downloadFile={onDocumentDownload}
            signedUrl={selectedDocumentURL}
            openEditMaterials={openEditMaterials}
            allMaterials={allMaterials}
          />
        )
      }

      {/* Modals */}
      {
        documentToDelete && (
          <DeleteDocumentModal
            show={!!documentToDelete}
            setShowModal={(show: boolean) => {
              if (!show) {
                setDocumentToDelete(undefined);
              }
            }}
            id={documentToDelete.id || ''}
            documentName={documentToDelete.originalName || ''}
            refresh={refreshFiles}
          />
        )
      }

      {editDocumentFileState && (
        <DocumentsEditMaterialsModal
          allMaterials={allMaterials}
          fileState={editDocumentFileState}
          setSelectedValueIds={(entityIds: string[]) => (
            setEditDocumentFileState({ ...editDocumentFileState, entityIds: entityIds })
          )}
          isOpen={editMaterialsModalIsOpen}
          onClose={() => setEditMaterialsModalIsOpen(false)}
        />
      )}
    </>
  );
};

export const DocumentDetailsSidebarContainer = withErrorBoundary(_DocumentDetailsSidebarContainer, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DocumentDetailsSidebarContainer: ', error);
  },
});
