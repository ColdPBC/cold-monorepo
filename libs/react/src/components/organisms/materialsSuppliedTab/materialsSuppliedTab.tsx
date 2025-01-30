import { SupplierGraphQL, SustainabilityAttribute } from '@coldpbc/interfaces';
import {
	BulkEditMaterialAttributesModal,
	Card,
	DEFAULT_GRID_COL_DEF,
	EditEntityAssociationsModal,
	ErrorFallback,
	MuiDataGrid,
	SustainabilityAttributeColumnList,
} from '@coldpbc/components';
import { GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import { uniq } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import { Checkbox } from '@mui/material';

interface MaterialsSuppliedTabProps {
	supplier: SupplierGraphQL;
	refreshData: () => void;
}

const _MaterialsSuppliedTab: React.FC<MaterialsSuppliedTabProps> = ({ supplier, refreshData }) => {
  const [showBulkEditAttributesModal, setShowBulkEditAttributesModal] = React.useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
	const navigate = useNavigate();

	const uniqCategories = uniq(supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.materialCategory || ''))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const uniqSubCategories = uniq(supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.materialSubcategory || ''))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const rows: {
		id: string;
		material: string;
		materialCategory: string;
		materialSubcategory: string;
		sustainabilityAttributes: SustainabilityAttribute[];
	}[] = supplier.materialSuppliers.map(materialSupplier => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const material = materialSupplier.material!;
		const susAttributes = processEntityLevelAssurances([material]);
		return {
			id: material.id,
			material: material.name,
			materialCategory: material.materialCategory || '',
			materialSubcategory: material.materialSubcategory || '',
			sustainabilityAttributes: susAttributes,
		};
	});

  const getMaterialsSelected = () => {
    return rows.filter(row => rowsSelected.includes(row.id));
  }

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      editable: false,
      sortable: false,
      hideSortIcons: true,
      width: 100,
      headerClassName: 'bg-gray-30',
      renderCell: (params: GridCellParams) => (
        <Checkbox
          data-testid={`select-checkbox-materials-supplied-${params.row.id}`}
          checked={rowsSelected.includes(params.row.id) || false}
          onClick={() => setRowsSelected((prev) => {
            if (prev.includes(params.row.id)) {
              return prev.filter((id) => id !== params.row.id);
            } else {
              return [...prev, params.row.id];
            }
          })}
        />
      ),
      renderHeader: (params) => (
        <Checkbox
          data-testid={'select-all-checkbox-materials-supplied'}
          checked={rowsSelected.length === rows.length && rowsSelected.length > 0}
          indeterminate={rowsSelected.length > 0 && rowsSelected.length < rows.length}
          onClick={(e) => {
            if(rowsSelected.length === rows.length) {
              setRowsSelected([]);
            } else if(rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(rows.map(r => r.id));
            }
          }}
        />
      ),
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'material',
      headerName: 'Material',
      flex: 1,
      minWidth: 230,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'materialCategory',
      headerName: 'Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'materialSubcategory',
      headerName: 'Sub Category',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqSubCategories,
    },
    {
      ...DEFAULT_GRID_COL_DEF,
      field: 'sustainabilityAttributes',
      headerName: 'Sustainability Attributes',
      flex: 1,
      minWidth: 300,
      renderCell: params => {
        return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value as SustainabilityAttribute[]} />;
      },
    },
  ];


	return (
		<Card
			title={'Materials Supplied'}
			className={'w-full'}
			data-testid={'materials-supplied-tab-card'}
			ctas={[
        {
          child: <EditEntityAssociationsModal
            buttonText={'Edit Materials'}
            refresh={refreshData}
            title={'Edit Materials'}
            entityLevelToAdd={EntityLevel.MATERIAL}
            entityLevelToBeAddedTo={EntityLevel.SUPPLIER}
            entityToBeAddedId={supplier.id}
            saveButtonText={'Save'}
            idsSelected={rows.map(r => r.id)}
          />
        },
				{
					text: 'Bulk Edit Attributes',
					action: () => {
						setShowBulkEditAttributesModal(true);
					},
					variant: ButtonTypes.secondary,
          disabled: rowsSelected.length === 0,
				},
			]}>
			<MuiDataGrid
				rows={rows}
        onCellClick={params => {
          if (params.field === 'checkbox') {
            return;
          }
          navigate(`/materials/${params.id}`);
        }}
				columns={columns}
				showSearch
				showManageColumns
				columnHeaderHeight={55}
				rowHeight={72}
				initialState={{
					sorting: {
						sortModel: [{ field: 'material', sort: 'asc' }],
					},
				}}
        disableRowSelectionOnClick={true}
        searchKey={`${supplier.id}materialsSuppliedSearchValue`}
      />
			<BulkEditMaterialAttributesModal
				show={showBulkEditAttributesModal}
				onClose={() => {
					setShowBulkEditAttributesModal(false);
          refreshData();
          setRowsSelected([]);
				}}
        materialsSelected={getMaterialsSelected()}
			/>
		</Card>
	);
};

export const MaterialsSuppliedTab = withErrorBoundary(_MaterialsSuppliedTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in MaterialsSuppliedTab: ', error);
	},
});
