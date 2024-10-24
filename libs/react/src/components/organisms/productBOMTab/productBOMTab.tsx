import { ProductsQuery, SustainabilityAttribute } from '@coldpbc/interfaces';
import { Card, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumnList } from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid';
import { mapAttributeAssurancesToSustainabilityAttributes } from '@coldpbc/lib';
import { get } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';

export const DEFAULT_GRID_COL_DEF = {
	headerClassName: 'bg-gray-30 text-body',
};

const _ProductBOMTab = (props: { product: ProductsQuery }) => {
	const { product } = props;

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
			field: 'tier2Supplier',
			headerName: 'Tier 2 Supplier',
			flex: 1,
			minWidth: 230,
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
		materialId: string;
		material: string;
		tier2Supplier: string;
		sustainabilityAttributes: SustainabilityAttribute[];
	}[] = product.productMaterials
		.filter(productMaterial => productMaterial.material !== null)
		.map(productMaterial => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const material = productMaterial.material!;
			const susAttributes = mapAttributeAssurancesToSustainabilityAttributes(material.attributeAssurances || []);
			const tier2Supplier = get(material.materialSuppliers, '[0].organizationFacility.name', '');
			return {
				id: productMaterial.id,
				materialId: material.id,
				material: material.name,
				tier2Supplier: tier2Supplier,
				sustainabilityAttributes: susAttributes,
			};
		});

	return (
		<Card title={'Bill of Materials'} className={'w-full'} data-testid={'product-bom-tab-card'}>
			<MuiDataGrid
				rows={rows}
				columns={columns}
				showSearch
				columnHeaderHeight={55}
				rowHeight={72}
			/>
		</Card>
	);
};

export const ProductBOMTab = withErrorBoundary(_ProductBOMTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductBOMTab: ', error);
	},
});
