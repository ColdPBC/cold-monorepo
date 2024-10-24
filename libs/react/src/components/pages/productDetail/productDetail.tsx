import { ErrorFallback, ErrorPage, MainContent, Spinner, Tabs, ProductBOMTab, ProductDetailsTab, ProductDocumentsTab} from '@coldpbc/components';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { FilesWithAssurances, ProductsQuery } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { parseDocumentsForProductDetails } from '@coldpbc/lib';

const _ProductDetail = () => {
	const { orgId } = useAuth0Wrapper();
	const { id } = useParams();

	const productQuery = useGraphQLSWR<{
		product: ProductsQuery | null;
	}>('GET_PRODUCT', {
		id: id,
	});

	const allFiles = useGraphQLSWR<{
		organizationFiles: FilesWithAssurances[];
	}>('GET_ALL_FILES', {
		filter: {
			organization: {
				id: orgId,
			},
			visible: true,
		},
	});

	if (productQuery.isLoading || allFiles.isLoading) {
		return <Spinner />;
	}

	if (isError(productQuery.data) || isError(allFiles.data)) {
		const error = get(productQuery.data, 'error', new Error('An error occurred'));
		// todo: create a new error handling component
		return <ErrorPage error={error.message} showLogout={false} />;
	}

	const product = get(productQuery.data, 'data.product');
	const files: FilesWithAssurances[] = get(allFiles.data, 'data.organizationFiles', []);

	if (product === null || product === undefined) {
		return null;
	}

	const subTitle = [product.productCategory, product.productSubcategory, product.seasonCode].filter(val => !!val).join(' | ');

	return (
		<MainContent title={product.name} subTitle={subTitle} breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Product Detail' }]} className={'w-[calc(100%)]'}>
			<Tabs
				tabs={[
					{
						label: 'Summary',
						content: <ProductDetailsTab product={product} />,
					},
					{
						label: 'BOM',
						content: <ProductBOMTab product={product} />,
					},
					{
						label: 'Documents',
						content: <ProductDocumentsTab files={parseDocumentsForProductDetails(product, files)} />,
					},
				]}
			/>
		</MainContent>
	);
};

export const ProductDetail = withErrorBoundary(_ProductDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductDetail: ', error);
	},
});
