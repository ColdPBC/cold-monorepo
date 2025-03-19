import {BaseButton, EntityExport, ErrorFallback, MainContent, MaterialsDataGrid} from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GridState, useGridApiRef} from "@mui/x-data-grid-pro";
import {EntityLevel} from "@coldpbc/enums";
import {useFlags} from "launchdarkly-react-client-sdk";

const _MaterialsPage = () => {
  const ldFlags = useFlags()
  const navigate = useNavigate();
  const [isGridReady, setIsGridReady] = useState(false);

  const apiRef = useGridApiRef()

  const getPageButtons = () => {
    return <div className={'flex flex-row gap-5'}>
      {
        ldFlags.showSspDatagridExportButton &&
        <EntityExport
          entityLevel={EntityLevel.MATERIAL}
          gridAPI={isGridReady ? apiRef.current : null}
        />
      }
      <BaseButton
        onClick={() => navigate('/materials/new')}
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
    <MainContent title="Materials" headerElement={getPageButtons()}>
      <MaterialsDataGrid
        onStateChange={handleGridStateChange}
        // @ts-ignore
        apiRef={apiRef}
      />
    </MainContent>
  );
};

export const MaterialsPage = withErrorBoundary(_MaterialsPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in MaterialsPage: ', error);
  },
});
