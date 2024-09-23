import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLSWR, useOrgSWR } from '@coldpbc/hooks';
import { DocumentDetailsSidebar, DocumentsHeaderTypes, DocumentsTable, DocumentUploadButton, ErrorFallback, MainContent, Modal, Spinner, DocumentsAddAssuranceModal } from '@coldpbc/components';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { FilesWithAssurances, SchemaEnum, ToastMessage } from '@coldpbc/interfaces';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { withErrorBoundary } from 'react-error-boundary';
import {get} from 'lodash';

const _DocumentsPage = () => {
	const [selectedDocument, setSelectedDocument] = React.useState<string | undefined>(undefined);
	const [documentToDelete, setDocumentToDelete] = React.useState<FilesWithAssurances | undefined>(undefined);
	const [documentToAddAssurance, setDocumentToAddAssurance] = React.useState<
		| {
				fileState: {
					id: string;
					type: string;
					originalName: string;
					metadata: any;
					startDate: Date | null;
					endDate: Date | null;
					sustainabilityAttribute: string;
				};
				isAdding: boolean;
		  }
		| undefined
	>(undefined);
	const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
	const [files, setFiles] = React.useState<FilesWithAssurances[]>([]);
  const [fileTypes, setFileTypes] = React.useState<string[]>([]);
	const [selectedDocumentURL, setSelectedDocumentURL] = React.useState<string | undefined>(undefined);
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const selectedFileURLSWR = useOrgSWR<string>(selectedDocument ? [`/files/${selectedDocument}/url`, 'GET'] : null, axiosFetcher);
	const ref = React.useRef<HTMLDivElement>(null);
	const allFiles = useGraphQLSWR('GET_ALL_FILES', {
		filter: {
			organization: {
				id: orgId,
			},
		},
	});
	const allSustainabilityAttributes = useGraphQLSWR('GET_ALL_SUS_ATTRIBUTES', {
		pagination: {
			orderBy: {
				name: 'ASC',
			},
		},
	});
  const allFileTypes = useGraphQLSWR('GET_ALL_SCHEMA_ENUMS');

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

  useEffect(() => {
    if(!allFileTypes.data) return;
    const fileTypes = get(allFileTypes.data, 'data._graphweaver.enums', []);
    const errors = get(allFileTypes.data, 'errors', []);
    if(!errors || (errors && errors.length === 0)) {
      // find the enum with the name 'OrganizationFilesType'
      const fileEnum = fileTypes.find((fileType: SchemaEnum) => fileType.name === 'OrganizationFilesType');
      // get all the value fields from the values array
      const typeValues = fileEnum?.values.map((value: {
        name: string;
        value: string;
      }) => value.value);
      if(typeValues) {
        setFileTypes(typeValues);
      }
    } else {
      setFileTypes([]);
    }
  }, [allFileTypes.data]);

	if (allFiles.error) {
		logBrowser('Error fetching files', 'error', { ...allFiles.error }, allFiles.error);
	}

	if (allFiles.isLoading || allSustainabilityAttributes.isLoading || allFileTypes.isLoading) {
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
            message: 'Upload failed',
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

	const updateFile = async () => {
		await allFiles.mutate();
	};

	const onSidebarClose = () => {
		setSelectedDocument(undefined);
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

	const onAddAssuranceClick = (
		fileState: {
			id: string;
			type: string;
			originalName: string;
			metadata: any;
			startDate: Date | null;
			endDate: Date | null;
			sustainabilityAttribute: string;
		},
		isAdding: boolean,
	) => {
		setDocumentToAddAssurance({
			fileState,
			isAdding,
		});
	};

	logBrowser('DocumentsPage rendered', 'info', { selectedDocument, documentToDelete, documentToAddAssurance, files, allSustainabilityAttributes, fileTypes });

	return (
		<div className="relative overflow-y-auto h-full w-full">
			<MainContent title="Documents" className={'gap-[40px] w-[calc(100%-100px)] min-w-[1129px]'} headerElement={getPageButtons()}>
				<DocumentsHeaderTypes files={files} />
				<DocumentsTable files={files} sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])} selectDocument={selectDocument} />
			</MainContent>
			<DocumentDetailsSidebar
				file={files.find(file => file.id === selectedDocument)}
				sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
        fileTypes={fileTypes}
				refreshFiles={updateFile}
				closeSidebar={onSidebarClose}
				innerRef={ref}
				deleteFile={onDeleteClick}
				isLoading={selectedFileURLSWR.isLoading}
				downloadFile={onDocumentDownload}
				signedUrl={selectedDocumentURL}
				addAssurance={onAddAssuranceClick}
			/>
			{getDeleteModal()}
			{documentToAddAssurance && (
				<DocumentsAddAssuranceModal
					files={files}
					allSustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
					documentToAddAssurance={documentToAddAssurance}
					close={() => {
						setDocumentToAddAssurance(undefined);
					}}
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
