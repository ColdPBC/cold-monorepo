import { HexColors } from '@coldpbc/themes';
import { MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import {
	DataGrid,
	DataGridProps,
	GridColDef,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarQuickFilter,
	GridValidRowModel,
} from '@mui/x-data-grid';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import {Box} from "@mui/material";

export interface MUIDataGridProps extends DataGridProps {
	rows: GridValidRowModel[];
	columns: GridColDef[];
	showSearch?: boolean;
	showExport?: boolean;
	showManageColumns?: boolean;
}

export const MuiDataGrid = (props: MUIDataGridProps) => {
	const { showSearch, showExport, showManageColumns } = props;

	const toolbar = () => {
		if (showSearch || showExport || showManageColumns)
			return (
				<GridToolbarContainer>
          {showSearch &&
            <>
              <GridToolbarQuickFilter />
              <Box sx={{ flexGrow: 1 }} />
            </>
          }
					{showManageColumns && (
						<GridToolbarColumnsButton
							slotProps={{
								tooltip: {
									sx: {
										'& .MuiInput-input': {
											backgroundColor: 'transparent',
											fontFamily: 'Inter',
											fontSize: '14px',
											padding: '4px 0px 5px',
											height: '32px',
										},
										'& .MuiDataGrid-filterFormColumnInput': {
											backgroundColor: 'transparent',
										},
									},
								},
							}}
						/>
					)}
					{showExport && <GridToolbarExport />}
				</GridToolbarContainer>
			);
		else return null;
	};

	return (
		<DataGrid
			rowHeight={37}
			getRowClassName={() => {
				return 'text-tc-primary cursor-pointer bg-gray-10';
			}}
			columnHeaderHeight={40}
			autoHeight={true}
			{...props}
			sx={{
				'--DataGrid-overlayHeight': '300px',
				'--DataGrid-rowBorderColor': HexColors.gray[30],
				'& .MuiTablePagination-root': {
					color: HexColors.tc.primary,
				},
				'& .MuiDataGrid-withBorderColor': {
					borderColor: HexColors.gray[30],
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
				...props.sx,
			}}
			slots={{
				noRowsOverlay: MUIDataGridNoRowsOverlay,
				toolbar: toolbar,
				...props.slots,
			}}
			slotProps={{
				filterPanel: {
					sx: {
						'& .MuiInput-input': {
							backgroundColor: 'transparent',
							fontFamily: 'Inter',
							fontSize: '14px',
							padding: '4px 0px 5px',
							height: '32px',
						},
						'& .MuiDataGrid-filterFormColumnInput': {
							backgroundColor: 'transparent',
						},
					},
				},
				baseTextField: {
					sx: {
						'& .MuiInputBase-input': {
							backgroundColor: 'transparent',
							fontFamily: 'Inter',
							fontSize: '14px',
							padding: '16px',
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderRadius: '8px',
							borderColor: HexColors.gray['90'],
							borderWidth: '1.5px',
						},
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							'&:hover fieldset': {
								borderColor: HexColors.gray['90'],
								borderWidth: '1.5px',
							},
							'&:focus-within fieldset': {
								borderColor: HexColors.gray['90'],
								borderWidth: '1.5px',
							},
						},
						'& .MuiOutlinedInput-input:focus': {
							outline: 'none',
							boxShadow: 'none',
						},
						'& .MuiInputBase-input:focus': {
							outline: 'none',
							boxShadow: 'none',
						},
					},
				},
				...props.slotProps,
			}}
			className={twMerge('text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto', props.className)}
		/>
	);
};
