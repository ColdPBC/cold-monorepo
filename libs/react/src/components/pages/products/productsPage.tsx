import {BaseButton, EntityExport, ErrorFallback, MainContent, ProductsDataGrid} from '@coldpbc/components';
import React, {useState} from "react";
import {withErrorBoundary} from "react-error-boundary";
import {useNavigate} from 'react-router-dom';
import {GridState, useGridApiRef} from "@mui/x-data-grid-pro";
import {EntityLevel} from "@coldpbc/enums";

const _ProductsPage = () => {
  const navigate = useNavigate();
  const [isGridReady, setIsGridReady] = useState(false);

  const apiRef = useGridApiRef()

  const getPageButtons = () => {
    return <div className={'flex flex-row gap-5'}>
      <EntityExport
        entityLevel={EntityLevel.PRODUCT}
        gridAPI={isGridReady ? apiRef.current : null}
        />
      <BaseButton
        onClick={() => navigate('/products/new')}
        label={'Add New'}
        className={'h-[40px]'}
      />
    </div>
  };

  const handleGridStateChange = (state: GridState) => {
    // When grid state changes, ensure we mark it as ready
    if (!isGridReady && state.columns && state.sorting) {
      setIsGridReady(true);
    }
  };

  return (
    <MainContent title="Products" headerElement={getPageButtons()} className={'w-[calc(100%-100px)]'}>
      <ProductsDataGrid
        onStateChange={handleGridStateChange}
        // @ts-ignore
        apiRef={apiRef}
      />
    </MainContent>
  );
}

export const ProductsPage = withErrorBoundary(_ProductsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductsPage: ', error);
  },
});
