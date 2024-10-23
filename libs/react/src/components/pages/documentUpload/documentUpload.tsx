import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { isArray } from 'lodash';
import { Card, Datagrid, DocumentUploadButton, ErrorFallback, MainContent, Spinner } from '@coldpbc/components';
import { ButtonTypes, ErrorType } from '@coldpbc/enums';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';

export const _DocumentUpload = () => {
	const { logError, logBrowser } = useColdContext();

	const filesSWR = useOrgSWR<any, any>([`/files`, 'GET'], axiosFetcher);

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
		logBrowser('Error fetching files', 'error', { ...filesSWR.error }, filesSWR.error);
		logError(filesSWR.error.message, ErrorType.SWRError, filesSWR.error);
	}

	if (filesSWR.isLoading) {
		return <Spinner />;
	}

	const data = isArray(filesSWR.data)
		? filesSWR.data?.map((file: any) => {
				const { name, extension } = getFileNameAndExtension(file);
				return {
					name: <div className="flex items-center text-tc-primary">{name}</div>,
					type: <span className="text-white font-medium text-sm leading-normal">{extension}</span>,
				};
		  })
		: [];

	logBrowser('Fetched files successfully', 'info');

	return (
		<MainContent title="Documents">
			<Card title={'Documents List'} className={'w-full px-4'} data-testid={'documents-list-card'}>
				<DocumentUploadButton
					buttonProps={{
						label: 'Upload Documents',
						variant: ButtonTypes.primary,
					}}
				/>
				{data.length > 0 ? (
					<Datagrid definitionURL={'/components/documents_list_table'} items={data} data-testid={'documents-list-table'} />
				) : (
					<Card glow={false} className="flex items-center justify-center w-full bg-bgc-elevate border-1 border-bgc-elevated" data-testid={'documents-list-card-no-documents'}>
						No documents uploaded
					</Card>
				)}
			</Card>
		</MainContent>
	);
};

export const DocumentUpload = withErrorBoundary(_DocumentUpload, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
