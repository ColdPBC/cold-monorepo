import { FilesWithAssurances } from '@coldpbc/interfaces';
import { ErrorFallback, MuiDataGrid } from '@coldpbc/components';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const _DocumentMaterialsTable = (props: { assurances: FilesWithAssurances['attributeAssurances']; deleteAttributeAssurance: (id: string) => void }) => {
	const { assurances, deleteAttributeAssurance } = props;

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 200,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'supplier',
			headerName: 'Supplier',
			minWidth: 150,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'actions',
			type: 'actions',
			width: 60,
			headerClassName: 'bg-gray-30 text-body',
			getActions: params => [
				<GridActionsCellItem
					label={'Delete'}
					onClick={() => {
						deleteAttributeAssurance(params.row.id);
					}}
					icon={<TrashIcon width={24} height={24} color={'white'} />}
				/>,
			],
		},
	];

	const rows = assurances
		.filter(assurance => {
			return assurance?.material !== null;
		})
		.map(assurance => {
			const materialName = assurance?.material?.name || '';
			// get all the suppliers. use the first one that has supplier tier 2, if not, use an empty string
			const materialSuppliers = assurance?.material?.materialSuppliers || [];
			const supplier = materialSuppliers.find(supplier => supplier.organizationFacility.supplierTier === 2);
			const supplierName = supplier ? supplier.organizationFacility.name : '';
			return {
				id: assurance.id,
				name: materialName,
				supplier: supplierName,
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

export const DocumentMaterialsTable = withErrorBoundary(_DocumentMaterialsTable, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentMaterialsTable: ', error);
	},
});
