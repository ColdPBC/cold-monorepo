import { FilesWithAssurances } from '@coldpbc/interfaces';
import { ErrorFallback, MuiDataGrid } from '@coldpbc/components';
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import capitalize from 'lodash/capitalize';
import React, { ReactNode } from 'react';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';

const _DocumentSuppliersTable = (props: { assurances: FilesWithAssurances['attributeAssurances'] }) => {
	const { assurances } = props;

	const renderAssociatedMaterials = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
		let element: ReactNode | null = null;
		const supplier = params.row.supplier;

		if (supplier) {
			// if the supplier tier is 2 show the materials, if it is 1 dont add the materials
			if (supplier.supplierTier === 2) {
				element = params.value.map((record: string, index: number) => {
					return (
						<div key={index} className={'text-tc-primary text-body p-[4px] rounded-[32px] border-[1px] border-purple-200'}>
							{capitalize(record)}
						</div>
					);
				});
			} else {
				element = null;
			}
		}

		return <div className={'h-full w-full flex flex-row items-center gap-[10px]'}>{element}</div>;
	};

	// table with columns for each supplier: Name, country, tier, associated materials
	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'country',
			headerName: 'Country',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'tier',
			headerName: 'Tier',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'associations',
			headerName: 'Associated Materials/Products',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			renderCell: renderAssociatedMaterials,
		},
	];

	const rows = assurances.map((assurance, index) => {
		const supplier = assurance?.supplier;
		const supplierName = supplier?.name || '';
		const supplierCountry = supplier?.country || '';
		const supplierTier = supplier?.supplierTier || 0;
		const associatedMaterials = supplier?.materialSuppliers.map(materialSupplier => materialSupplier.material.name) || [];
		return {
			id: supplier?.id || index.toString(),
			name: supplierName,
			country: supplierCountry,
			tier: supplierTier,
			associations: associatedMaterials,
			supplier: supplier,
		};
	});

	return (
		<MuiDataGrid
			rows={rows}
			columns={columns}
			sx={{
				'--DataGrid-overlayHeight': '50px',
				'--DataGrid-rowBorderColor': HexColors.gray[50],
				'& .MuiTablePagination-root': {
					color: HexColors.tc.primary,
				},
				'& .MuiDataGrid-withBorderColor': {
					borderColor: HexColors.gray[50],
				},
				'& .MuiDataGrid-columnHeaderTitle': {
					fontWeight: 'bold',
				},
				'& .MuiDataGrid-cell:focus': {
					outline: 'none',
				},
				'& .MuiDataGrid-cell:focus-within': {
					outline: 'none',
				},
				'& .MuiDataGrid-columnHeader:focus': {
					outline: 'none',
				},
				'& .MuiDataGrid-columnHeader:focus-within': {
					outline: 'none',
				},
			}}
			className={'text-tc-primary border-[2px] rounded-[2px] border-gray-50 bg-transparent w-full h-auto'}
			disableRowSelectionOnClick={true}
		/>
	);
};

export const DocumentSuppliersTable = withErrorBoundary(_DocumentSuppliersTable, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentSuppliersTable: ', error);
	},
});
