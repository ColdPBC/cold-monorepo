import { SupplierGraphQL, SustainabilityAttribute } from '@coldpbc/interfaces';
import { Card, DEFAULT_GRID_COL_DEF, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumnList } from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid';
import { processEntityLevelAssurances } from '@coldpbc/lib';
import { uniq } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useNavigate } from 'react-router-dom';

interface MaterialsSuppliedTabProps {
	supplier: SupplierGraphQL;
}

const _MaterialsSuppliedTab: React.FC<MaterialsSuppliedTabProps> = ({ supplier }) => {
	const ldFlags = useFlags();
	const navigate = useNavigate();

	const uniqCategories = uniq(supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.materialCategory || ''))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const uniqSubCategories = uniq(supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.materialSubcategory || ''))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const columns: GridColDef[] = [
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

	return (
		<Card title={'Materials Supplied'} className={'w-full'} data-testid={'materials-supplied-tab-card'}>
			<MuiDataGrid
				rows={rows}
				onRowClick={params => {
					if (ldFlags.materialDetailPageCold997) {
						navigate(`/materials/${params.id}`);
					}
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
