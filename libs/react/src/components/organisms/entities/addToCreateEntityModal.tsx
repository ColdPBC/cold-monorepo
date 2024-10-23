import { BaseButton, Card, ErrorFallback, Modal, MuiDataGrid } from '@coldpbc/components';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { GridCellParams, GridColDef, GridRowSelectionModel, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { ButtonTypes } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { withErrorBoundary } from 'react-error-boundary';

const _AddToCreateMaterialModal = (props: {
	show: boolean;
	onClose: () => void;
	onAdd: (ids: string[]) => void;
	type: 'products' | 'attributes' | 'materials';
	entities: any[];
}) => {
	const { type, show, onClose, onAdd, entities } = props;
	const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
	const [addButtonDisabled, setAddButtonDisabled] = useState(true);

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
					checked={rowsSelected.includes(params.row.id) || false}
					onClick={() =>
						setRowsSelected(prev => {
							if (prev.includes(params.row.id)) {
								return prev.filter(id => id !== params.row.id);
							} else {
								return [...prev, params.row.id];
							}
						})
					}
				/>
			),
			renderHeader: params => (
				<Checkbox
					checked={rowsSelected.length === rows.length && rowsSelected.length > 0}
					indeterminate={rowsSelected.length > 0 && rowsSelected.length < rows.length}
					onClick={e => {
						if (rowsSelected.length === rows.length) {
							setRowsSelected([]);
						} else if (rowsSelected.length > 0) {
							setRowsSelected([]);
						} else {
							setRowsSelected(rows.map(r => r.id));
						}
					}}
				/>
			),
		},
	];
	let rows: any[] = [];

	columns.push({
		field: 'name',
		headerName: 'Name',
		minWidth: 130,
		flex: 1,
		headerClassName: 'bg-gray-30',
		cellClassName: 'bg-gray-10',
	});
	rows = entities;

	useEffect(() => {
		setAddButtonDisabled(rowsSelected.length === 0);
	}, [rowsSelected]);

	const getToolbar = () => {
		return (
			<GridToolbarContainer>
				<GridToolbarQuickFilter />
			</GridToolbarContainer>
		);
	};

	let title = '';
	let buttonText = '';

	switch (type) {
		case 'products':
			title = 'Add Products';
			buttonText = 'Add Products';
			break;
		case 'attributes':
			title = 'Add Sustainability Attribute to Track';
			buttonText = 'Add Attributes';
			break;
		default:
		case 'materials':
			title = 'Add Materials';
			buttonText = 'Add Materials';
			break;
	}

	return (
		<FBModal dismissible show={show} onClose={onClose} theme={flowbiteThemeOverride.modal}>
			<Card className="relative p-4 w-[962px] bg-gray-20">
				<div className={'flex flex-col gap-[24px] w-full'}>
					<div className={'flex flex-row text-h3'}>{title}</div>
					<div className={'w-full h-[400px]'}>
						<MuiDataGrid
							rows={rows}
							columns={columns}
							sx={{
								'--DataGrid-overlayHeight': '300px',
							}}
							className={'h-full'}
							autoHeight={false}
							slots={{
								toolbar: getToolbar,
							}}
							disableColumnMenu={true}
							rowSelection={false}
							initialState={{
								sorting: {
									sortModel: [{ field: 'name', sort: 'asc' }],
								},
							}}
						/>
					</div>
				</div>
				<div className={'w-full flex flex-row justify-between'}>
					<BaseButton label={'Cancel'} onClick={onClose} variant={ButtonTypes.secondary} />
					<div className={'flex flex-row gap-[16px] items-center'}>
						<div className={'text-body font-bold text-tc-secondary'}>
							{rowsSelected.length}/{rows.length} Selected
						</div>
						<BaseButton
							label={buttonText}
							onClick={() => {
								onAdd(rowsSelected as string[]);
							}}
							disabled={addButtonDisabled}
						/>
					</div>
				</div>
			</Card>
		</FBModal>
	);
};

export const AddToCreateEntityModal = withErrorBoundary(_AddToCreateMaterialModal, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
