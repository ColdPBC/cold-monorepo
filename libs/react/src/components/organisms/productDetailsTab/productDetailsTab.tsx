import React from 'react';
import { ErrorFallback, ProductDetailsCard, ProductSustainabilityAttributesCard } from '@coldpbc/components';
import type { ProductsQuery } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';

interface ProductDetailsTabProps {
  product: ProductsQuery;
}

const _ProductDetailsTab: React.FC<ProductDetailsTabProps> = ({ product }) => {
  return (
    <div className='w-full h-full flex gap-6 items-start mt-4 mb-20'>
      <ProductDetailsCard product={product} />
      <ProductSustainabilityAttributesCard product={product} />
    </div>
  );
};

export const ProductDetailsTab = withErrorBoundary(_ProductDetailsTab, {
  fallbackRender: props => <ErrorFallback {...props} />,
});
