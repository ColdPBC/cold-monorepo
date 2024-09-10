import { FilesWithAssurances } from '@coldpbc/interfaces';
import { MuiDataGrid } from '@coldpbc/components';
import { GridColDef } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';

export const DocumentMaterialsTable = (props: { assurances: FilesWithAssurances['attributeAssurances'] }) => {
	const { assurances } = props;

	// table with columns for each material. Name, associated supplier

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'supplier',
			headerName: 'Supplier',
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
	];

	const rows = assurances.map(assurance => {
		const materialName = assurance?.material?.name || '';
		// get all the suppliers. use the first one that has supplier tier 2, if not, use an empty string
		const materialSuppliers = assurance?.material?.materialSuppliers || [];
		const supplier = materialSuppliers.find(supplier => supplier.supplier.supplierTier === 2);
		const supplierName = supplier ? supplier.supplier.name : '';
		return {
			id: assurance?.material?.name,
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
