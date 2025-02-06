import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLSWR, useOrgSWR } from '@coldpbc/hooks';
import {
  DocumentDetailsSidebar,
  DocumentsHeaderTypes,
  DocumentsTable,
  DocumentUploadButton,
  ErrorFallback,
  MainContent,
  Modal,
  Spinner,
  DocumentDetailsSidebarFileState,
  DocumentsEditMaterialsModal,
} from '@coldpbc/components';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { FilesWithAssurances, MaterialWithSupplier, ToastMessage } from '@coldpbc/interfaces';
import { AssuranceDocumentTypes, ButtonTypes, IconNames } from '@coldpbc/enums';
import {AxiosError, isAxiosError} from 'axios';
import { withErrorBoundary } from 'react-error-boundary';
import {get} from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';

export interface MaterialWithTier2Supplier {
  id: string;
  name: string;
  tier2SupplierId: string;
  tier2SupplierName: string;
}

const getTier2SupplierData = (material) => {
  const tier2Supplier = material.organizationFacility
  return { tier2SupplierId: tier2Supplier?.id || '', tier2SupplierName: tier2Supplier?.name || '' }
}

const _DocumentsPage = () => {
	const [selectedDocument, setSelectedDocument] = React.useState<string | undefined>(undefined);
	const [documentToDelete, setDocumentToDelete] = React.useState<FilesWithAssurances | undefined>(undefined);
  const [ editDocumentFileState, setEditDocumentFileState ] = React.useState<DocumentDetailsSidebarFileState | undefined>(undefined);
	const [ editMaterialsModalIsOpen, setEditMaterialsModalIsOpen ] = React.useState(false);
	const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
	const [files, setFiles] = React.useState<FilesWithAssurances[]>([]);
	const [selectedDocumentURL, setSelectedDocumentURL] = React.useState<string | undefined>(undefined);
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const selectedFileURLSWR = useOrgSWR<string>(selectedDocument ? [`/files/${selectedDocument}/url`, 'GET'] : null, axiosFetcher);
	const ref = React.useRef<HTMLDivElement>(null);
  const ldFlags = useFlags();
  const docTypeFilter = ldFlags.showNewDocumentUploadUxCold1410 ? { type_in: Object.values(AssuranceDocumentTypes) } : {};
	const allFiles = useGraphQLSWR<{
    organizationFiles: FilesWithAssurances[] | null;
  }>('GET_ALL_FILES', {
		filter: {
			organization: {
				id: orgId,
			},
      visible: true,
      ...docTypeFilter
		},
	});
	const allSustainabilityAttributes = useGraphQLSWR('GET_ALL_SUS_ATTRIBUTES', {
		pagination: {
			orderBy: {
				name: 'ASC',
			},
		},
	});

  const materialsQuery = useGraphQLSWR<{
    materials: MaterialWithSupplier[];
  }>(orgId ? 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT' : null, {
    organizationId: orgId,
  });

  const allMaterials: MaterialWithTier2Supplier[] = React.useMemo(() => {
    if (!materialsQuery.isLoading && !get(materialsQuery.data, 'errors', undefined)) {
      const data = get(materialsQuery.data, 'data.materials', []);
      return data.map(rawMaterial => ({
        id: rawMaterial.id,
        name: rawMaterial.name,
        ...getTier2SupplierData(rawMaterial),
      }));
    } else {
      return [];
    }
  }, [materialsQuery.isLoading, materialsQuery.data]);

	useEffect(() => {
		const files = get(allFiles.data, 'data.organizationFiles', []);
		if (files) {
			setFiles(files);
		}
	}, [allFiles.data]);

	useEffect(() => {
		if (selectedFileURLSWR.data && !isAxiosError(selectedFileURLSWR.data)) {
			setSelectedDocumentURL(selectedFileURLSWR.data);
		}
	}, [selectedFileURLSWR]);

	if (allFiles.error) {
		logBrowser('Error fetching files', 'error', { ...allFiles.error }, allFiles.error);
	}

	if (allFiles.isLoading || allSustainabilityAttributes.isLoading) {
		return <Spinner />;
	}

  const handleFileUpload = async (response: any, context: any) => {
    if (isAxiosError(response)) {
      logBrowser('Upload failed', 'error', {...context, response});
      const error: AxiosError = response;
      if(error.response?.status === 409) {
        await addToastMessage({
          type: ToastMessage.FAILURE,
          message: 'File already exists. Error Uploading',
          position: 'bottomRight',
        });
      } else {
        await addToastMessage({
          type: ToastMessage.FAILURE,
          message: 'Upload failed',
          position: 'bottomRight',
        });
      }
    } else {
      await addToastMessage({
        type: ToastMessage.SUCCESS,
        message: (
          <div className={'flex flex-col gap-[10px]'}>
            <div className={'font-bold'}>Upload Complete</div>
            <div className={'test-eyebrow'}>✨ Cold AI categorization has started</div>
          </div>
        ),
        position: 'bottomRight',
      });
      logBrowser('File Upload successful', 'info', {...context, response});
    }
  }

  const getPageButtons = () => {
    return (
      <div className={'h-auto'}>
        <DocumentUploadButton
          buttonProps={{
            label: ldFlags.showNewDocumentUploadUxCold1410 ? 'Upload Assurance Doc' : 'Add New',
            iconLeft: IconNames.PlusIcon,
          }}
          mutateFunction={allFiles.mutate}
          successfulToastMessage={{
            message: (
              <div className={'flex flex-col gap-[10px]'}>
                <div className={'font-bold'}>Upload Complete</div>
                <div className={'test-eyebrow'}>✨ Cold AI categorization has started</div>
              </div>
            ),
            position: 'bottomRight',
          }}
          failureToastMessage={{
            position: 'bottomRight',
          }}
        />
      </div>
    );
  };

	const deleteDocument = async (documentToDelete: FilesWithAssurances) => {
		setDeleteButtonLoading(true);
		const response = await axiosFetcher([`/organizations/${orgId}/files/${documentToDelete.id}`, 'DELETE']);
		await allFiles.mutate();
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

	const onDeleteClick = (id: string) => {
		setSelectedDocument(undefined);
		const file = files.find(file => file.id === id);
		if (file) {
			setDocumentToDelete(file);
		}
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

	const selectDocument = (id: string) => {
		if (selectedDocument && selectedDocument === id) {
			setSelectedDocument(undefined);
		} else {
			setSelectedDocument(id);
		}
	};

	const onSidebarClose = () => {
		setSelectedDocument(undefined);
    setEditDocumentFileState(undefined);
	};

	const getDeleteModal = () => {
		return (
			<Modal
				show={documentToDelete !== undefined}
				setShowModal={() => {
					setDocumentToDelete(undefined);
				}}
				header={{
					title: `Are you sure you want to delete ${documentToDelete?.originalName}?`,
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
		);
	};

	logBrowser('DocumentsPage rendered', 'info', { selectedDocument, documentToDelete, editDocumentFileState, files, allSustainabilityAttributes });

	return (
		<div className="relative overflow-y-auto h-full w-full">
			<MainContent title={ldFlags.showNewDocumentUploadUxCold1410 ? "Assurance Documents" : "Documents"} className={'gap-[40px] w-[calc(100%-100px)] min-w-[1129px]'} headerElement={getPageButtons()}>
				<DocumentsHeaderTypes files={files} />
				<DocumentsTable files={files} selectDocument={selectDocument} />
			</MainContent>
			<DocumentDetailsSidebar
				file={files.find(file => file.id === selectedDocument)}
        fileState={editDocumentFileState}
        setFileState={setEditDocumentFileState}
				sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
				refreshFiles={allFiles.mutate}
				closeSidebar={onSidebarClose}
				innerRef={ref}
				deleteFile={onDeleteClick}
				isLoading={selectedFileURLSWR.isLoading}
				downloadFile={onDocumentDownload}
				signedUrl={selectedDocumentURL}
        openEditMaterials={(fileState: DocumentDetailsSidebarFileState) => {
          setEditDocumentFileState(fileState);
          setEditMaterialsModalIsOpen(true);
        }}
        allMaterials={allMaterials}
			/>
			{getDeleteModal()}
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
		</div>
	);
};

export const DocumentsPage = withErrorBoundary(_DocumentsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsPage: ', error);
	},
});
