import React from 'react';
import {
  EditMaterialDetails, EditProductDetails,
  ErrorFallback, MaterialDetailsCard,
  ProductCarbonFootprintDonut,
  ProductDetailsCard,
  ProductSustainabilityAttributesCard,
} from '@coldpbc/components';
import { MaterialGraphQL, ProductsQuery } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { KeyedMutator } from 'swr';
import { ApolloQueryResult } from '@apollo/client';

interface ProductDetailsTabProps {
  product: ProductsQuery;
  setShowUpdateAttributesModal: (show: boolean) => void;
  refreshProduct: KeyedMutator<ApolloQueryResult<{   product: ProductsQuery | null; }>>;
}

const _ProductDetailsTab: React.FC<ProductDetailsTabProps> = ({ product, setShowUpdateAttributesModal, refreshProduct }) => {
  const [editProduct, setEditProduct] = React.useState<boolean>(false);

  return (
    <div className='w-full h-full flex flex-col gap-10 mt-4 mb-20'>
      <ProductCarbonFootprintDonut product={product} />
      <div className='w-full h-full flex gap-6 items-start'>
        {editProduct ? (
          <EditProductDetails
            key={product.id}
            product={product}
            onClose={() => setEditProduct(false)}
            refreshProduct={refreshProduct}
          />
        ) : (
          <ProductDetailsCard key={product.id} product={product} editProduct={() => setEditProduct(true)} />
        )}
        <ProductSustainabilityAttributesCard
          product={product}
          setShowUpdateAttributesModal={setShowUpdateAttributesModal}
        />
      </div>
    </div>
  );
};

export const ProductDetailsTab = withErrorBoundary(_ProductDetailsTab, {
  fallbackRender: props => <ErrorFallback {...props} />,
});
