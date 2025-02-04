import { FilesWithAssurances } from '@coldpbc/interfaces';
import { ErrorFallback, MaterialWithTier2Supplier, MuiDataGrid } from '@coldpbc/components';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const _DocumentMaterialsTable = (props: { materials: MaterialWithTier2Supplier[] }) => {
	const { materials } = props;

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 200,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'tier2SupplierName',
			headerName: 'Tier 2 Supplier',
			minWidth: 150,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
	];

	return (
		<MuiDataGrid
			rows={materials}
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
      initialState={{
        sorting: {
          sortModel: [{ field: 'name', sort: 'asc' }],
        },
      }}
		/>
	);
};

export const DocumentMaterialsTable = withErrorBoundary(_DocumentMaterialsTable, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentMaterialsTable: ', error);
	},
});
