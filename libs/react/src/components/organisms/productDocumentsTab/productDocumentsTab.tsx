import { withErrorBoundary } from 'react-error-boundary';
import { Card, DocumentsTable, ErrorFallback } from '@coldpbc/components';
import React from 'react';
import { FilesWithAssurances } from '@coldpbc/interfaces';

export const _ProductDocumentsTab = (props: { files: FilesWithAssurances[] }) => {
	const { files } = props;
	return (
		<Card title={'Documents'} className={'w-full'} data-testid={'product-documents-tab-card'}>
			<DocumentsTable files={files} selectDocument={() => {}} />
		</Card>
	);
};

export const ProductDocumentsTab = withErrorBoundary(_ProductDocumentsTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductDocumentsTab: ', error);
	},
});
