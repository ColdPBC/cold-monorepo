import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLSWR, useOrgSWR } from '@coldpbc/hooks';
import { DocumentDetailsSidebar, DocumentsHeaderTypes, DocumentsTable, DocumentUploadButton, ErrorFallback, MainContent, Modal, Spinner } from '@coldpbc/components';
import React, { useEffect } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { FilesWithAssurances, ToastMessage } from '@coldpbc/interfaces';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { isAxiosError } from 'axios';
import { withErrorBoundary } from 'react-error-boundary';
import { get } from 'lodash';

const _DocumentsPage = () => {
	const [selectedDocument, setSelectedDocument] = React.useState<FilesWithAssurances | undefined>(undefined);
	const [documentToDelete, setDocumentToDelete] = React.useState<FilesWithAssurances | undefined>(undefined);
	const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(false);
	const [files, setFiles] = React.useState<FilesWithAssurances[]>([]);
	const [selectedDocumentURL, setSelectedDocumentURL] = React.useState<string | undefined>(undefined);
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const selectedFileURLSWR = useOrgSWR<string>(selectedDocument ? [`/files/${selectedDocument?.id}/url`, 'GET'] : null, axiosFetcher);
	const ref = React.useRef<HTMLDivElement>(null);
	const allFiles = useGraphQLSWR('GET_ALL_FILES');
	const allSustainabilityAttributes = useGraphQLSWR('GET_ALL_SUS_ATTRIBUTES');

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

	const getPageButtons = () => {
		return (
			<div className={'h-auto'}>
				<DocumentUploadButton
					buttonProps={{
						label: 'Add New',
						iconLeft: IconNames.PlusIcon,
					}}
					mutateFunction={allFiles.mutate}
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
		const document = files.find(file => file.id === id);
		if (selectedDocument && selectedDocument.id === id) {
			setSelectedDocument(undefined);
		} else {
			setSelectedDocument(document);
		}
	};

	const updateFile = async () => {
		await allFiles.mutate();
	};

	const onSidebarClose = () => {
		setSelectedDocument(undefined);
	};

	return (
		<div className="relative overflow-y-auto h-full w-full">
			<MainContent title="Documents" className={'gap-[40px]'} headerElement={getPageButtons()}>
				<DocumentsHeaderTypes files={files} />
				<DocumentsTable
					files={files}
					sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
					selectedDocument={selectedDocument}
					setSelectedDocument={setSelectedDocument}
					selectDocument={selectDocument}
				/>
			</MainContent>
			<DocumentDetailsSidebar
				file={selectedDocument}
				sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
				refreshFiles={updateFile}
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
		</div>
	);
};

export const DocumentsPage = withErrorBoundary(_DocumentsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsPage: ', error);
	},
});
