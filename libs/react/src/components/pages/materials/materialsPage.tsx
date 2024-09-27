import { ErrorFallback, MainContent, MaterialsDataGrid } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

const _MaterialsPage = () => {
  const getPageButtons = () => {
    // todo: add 'Add New' button
    return <></>;
  };

  return (
    <MainContent title="Materials" headerElement={getPageButtons()} className={'w-[calc(100%-100px)]'}>
      <MaterialsDataGrid />
    </MainContent>
  );
};

export const MaterialsPage = withErrorBoundary(_MaterialsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
