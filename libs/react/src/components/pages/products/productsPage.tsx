import { ErrorFallback, MainContent, ProductsDataGrid } from '@coldpbc/components';
import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';

const _ProductsPage = () => {
	return (
		<MainContent title="Products" className={'w-[calc(100%-100px)]'}>
			<ProductsDataGrid />
		</MainContent>
	);
};

export const ProductsPage = withErrorBoundary(_ProductsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductsPage: ', error);
	},
});
