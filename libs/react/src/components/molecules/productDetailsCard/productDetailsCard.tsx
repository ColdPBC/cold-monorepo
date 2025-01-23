import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ProductsQuery } from '@coldpbc/interfaces';
import { Card, DetailsItem } from '@coldpbc/components';

interface ProductDetailsCardProps {
  product: ProductsQuery;
  editProduct: () => void;
}

const _ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product, editProduct }) => (
  <Card title={'Details'}  ctas={[{text: 'Edit', action: editProduct}]} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'product-details-card'}>
		<DetailsItem category={'Name'} value={product.name} />
		<DetailsItem category={'Description'} value={product.description} />
    <DetailsItem
      category={'Tier 1 Supplier'}
      value={product.organizationFacility?.name}
      href={product.organizationFacility ? `/suppliers/${product.organizationFacility.id}` : undefined}
    />
    <DetailsItem category={'Season'} value={product.seasonCode} />
    <DetailsItem category={'UPC'} value={product.upcCode} />
    <DetailsItem category={'Category'} value={product.productCategory} />
    <DetailsItem category={'Sub-Category'} value={product.productSubcategory} />
    <DetailsItem category={'Brand Product ID'} value={product.brandProductId} />
    <DetailsItem category={'Supplier Product ID'} value={product.supplierProductId} />
	</Card>
);


export const ProductDetailsCard = withErrorBoundary(_ProductDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductDetailsCard: ', error);
	},
});
