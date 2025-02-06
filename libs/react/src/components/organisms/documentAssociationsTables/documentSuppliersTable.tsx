import { FilesWithAssurances } from '@coldpbc/interfaces';
import { ErrorFallback, MuiDataGrid } from '@coldpbc/components';
import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid-pro';
import capitalize from 'lodash/capitalize';
import React, { ReactNode } from 'react';
import { HexColors } from '@coldpbc/themes';
import { withErrorBoundary } from 'react-error-boundary';
import { TrashIcon } from '@heroicons/react/24/solid';

const _DocumentSuppliersTable = (props: { assurances: FilesWithAssurances['attributeAssurances']; deleteAttributeAssurance: (id: string) => void }) => {
	const { assurances, deleteAttributeAssurance } = props;

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
	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 150,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'country',
			headerName: 'Country',
			minWidth: 150,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'tier',
			headerName: 'Tier',
			minWidth: 150,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
		},
		{
			field: 'associations',
			headerName: 'Associated Materials/Products',
			minWidth: 300,
			flex: 1,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			renderCell: renderAssociatedMaterials,
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
					showInMenu={false}
					icon={<TrashIcon width={24} height={24} color={'white'} />}
				/>,
			],
		},
	];

	const rows = assurances
		.filter(assurance => {
			return assurance?.organizationFacility !== null;
		})
		.map((assurance, index) => {
			const supplier = assurance?.organizationFacility;
			const supplierName = supplier?.name || '';
			const supplierCountry = supplier?.country || '';
			const supplierTier = supplier?.supplierTier || 0;
			const associatedMaterials = supplier?.materialSuppliers.map(materialSupplier => materialSupplier.material.name) || [];
			return {
				id: assurance.id,
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
      initialState={{
        sorting: {
          sortModel: [{ field: 'name', sort: 'asc' }],
        },
      }}
    />
	);
};

export const DocumentSuppliersTable = withErrorBoundary(_DocumentSuppliersTable, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentSuppliersTable: ', error);
	},
});
