import { ErrorFallback, ErrorPage, MainContent, ProductDetailsTab, Spinner, Tabs } from '@coldpbc/components';
import { useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { ProductsQuery } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { ProductBOMTab } from '../../organisms/productBOMTab/productBOMTab';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _ProductDetail = () => {
	const { id } = useParams();

	const productQuery = useGraphQLSWR<{
		product: ProductsQuery | null;
	}>('GET_PRODUCT', {
		id: id,
	});

	if (productQuery.isLoading) {
		return <Spinner />;
	}

	if (isError(productQuery.data)) {
		const error = get(productQuery.data, 'error', new Error('An error occurred'));
		return <ErrorPage error={error.message} showLogout={false} />;
	}

	const product = get(productQuery.data, 'data.product');

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
						content: null,
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
