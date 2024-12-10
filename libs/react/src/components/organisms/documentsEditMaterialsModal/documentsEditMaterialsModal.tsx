import {
  BaseButton,
  Card,
  DocumentDetailsSidebarFileState,
  ErrorFallback, MaterialWithTier2Supplier,
  MuiDataGrid,
  Spinner,
} from '@coldpbc/components';
import { ButtonTypes, EntityLevel, GlobalSizes } from '@coldpbc/enums';
import React, { useEffect } from 'react';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { get } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { GridCellParams, GridColDef, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';



interface DocumentsEditMaterialsModalProps {
  allMaterials: MaterialWithTier2Supplier[];
  fileState: DocumentDetailsSidebarFileState;
  setSelectedValueIds: (value: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}



const haveSameItems = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  return arr2.every(item => set1.has(item));
};

export const _DocumentsEditMaterialsModal: React.FC<DocumentsEditMaterialsModalProps> = ({
  allMaterials,
  fileState,
  setSelectedValueIds,
  isOpen,
  onClose,
}) => {
  const [ shownMaterials, setShownMaterials ] = React.useState<MaterialWithTier2Supplier[]>([]);
  const allMaterialIds = allMaterials.map(material => material.id);
  // We seed the selected IDs with the entity IDs, as long as they are for materials.
  const [ selectedMaterialIds, setSelectedMaterialIds ] = React.useState<string[]>(fileState.entityIds.filter(id => allMaterialIds.includes(id)));

  useEffect(() => {
    const firstSelectedMaterialId = selectedMaterialIds[0];
    const firstSelectedMaterial = allMaterials.find(material => material.id === firstSelectedMaterialId);
    if (firstSelectedMaterial) {
      const materialsWithSameTier2Supplier = allMaterials.filter(material => material.tier2SupplierId === firstSelectedMaterial.tier2SupplierId)
      setShownMaterials(materialsWithSameTier2Supplier);
    } else {
      setShownMaterials(allMaterials)
    }
  }, [selectedMaterialIds, allMaterials])

  if (fileState.sustainabilityAttribute?.level !== EntityLevel.MATERIAL) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      editable: false,
      sortable: false,
      hideSortIcons: true,
      width: 100,
      headerClassName: 'bg-gray-30',
      cellClassName: 'bg-gray-10',
      renderCell: (params: GridCellParams) => (
        <Checkbox
          checked={selectedMaterialIds.includes(params.row.id) || false}
          onClick={() => {
            if (selectedMaterialIds.includes(params.row.id)) {
              setSelectedMaterialIds(selectedMaterialIds.filter(id => id !== params.row.id));
            } else {
              setSelectedMaterialIds([...selectedMaterialIds, params.row.id]);
            }
          }}
        />
      ),
      renderHeader: params => (
        <Checkbox
          checked={selectedMaterialIds.length === shownMaterials.length && selectedMaterialIds.length > 0}
          indeterminate={selectedMaterialIds.length > 0 && selectedMaterialIds.length < shownMaterials.length}
          onClick={() => {
            if (selectedMaterialIds.length === shownMaterials.length) {
              setSelectedMaterialIds([]);
              setShownMaterials(allMaterials);
            } else if (selectedMaterialIds.length > 0 && shownMaterials.length < allMaterials.length) {
              setSelectedMaterialIds(shownMaterials.map(r => r.id));
            }
          }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 130,
      flex: 1,
      headerClassName: 'bg-gray-30',
      cellClassName: 'bg-gray-10',
    },
    {
      field: 'tier2SupplierName',
      headerName: 'Tier 2 Supplier',
      minWidth: 130,
      flex: 1,
      headerClassName: 'bg-gray-30',
      cellClassName: 'bg-gray-10',
    }
  ];

  const getToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );

  const title = `Edit materials`;
  const buttonText = 'Update materials';

  return (
    <FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
      <Card className="relative p-4 w-[962px] bg-gray-20">
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-row text-h3">{title}</div>
          <div className="flex flex-row text-body">All selected materials must be from the same supplier.</div>
          <div className="w-full h-[400px]">
            <MuiDataGrid
              rows={shownMaterials}
              columns={columns}
              sx={{
                '--DataGrid-overlayHeight': '300px',
              }}
              className="h-full"
              autoHeight={false}
              slots={{
                toolbar: getToolbar,
              }}
              disableColumnMenu={true}
              rowSelection={false}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <BaseButton label="Cancel" onClick={onClose} variant={ButtonTypes.secondary} />
          <div className="flex flex-row gap-[16px] items-center">
            <div className="text-body font-bold text-tc-secondary">
              {selectedMaterialIds.length}/{shownMaterials.length} Selected
            </div>
            <BaseButton
              label={buttonText}
              onClick={() => {
                setSelectedValueIds(selectedMaterialIds);
                onClose();
              }}
              disabled={haveSameItems(fileState.entityIds, selectedMaterialIds)}
            />
          </div>
        </div>
      </Card>
    </FBModal>
  );
};

export const DocumentsEditMaterialsModal = withErrorBoundary(_DocumentsEditMaterialsModal, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsEditMaterialsModal: ', error);
	},
});
