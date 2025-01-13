import { BaseButton, ErrorFallback, MainContent, ProductsDataGrid } from '@coldpbc/components';
import React from "react";
import {withErrorBoundary} from "react-error-boundary";
import { useNavigate } from 'react-router-dom';

const _ProductsPage = () => {
  const navigate = useNavigate();
  const getPageButtons = () => {
    return <div>
      <BaseButton
        onClick={() => navigate('/products/new')}
        label={'Add New'}
        className={'h-[40px]'}
      />
    </div>
  };

  return (
    <MainContent title="Products" headerElement={getPageButtons()} className={'w-[calc(100%-100px)]'}>
      <ProductsDataGrid />
    </MainContent>
  );
}

export const ProductsPage = withErrorBoundary(_ProductsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductsPage: ', error);
  },
});
