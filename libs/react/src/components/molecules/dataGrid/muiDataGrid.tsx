import { HexColors } from '@coldpbc/themes';
import { MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import {
  DataGrid,
  DataGridProps, GridCallbackDetails,
  GridColDef, GridFilterModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport, GridToolbarProps,
  GridToolbarQuickFilter,
  GridValidRowModel, ToolbarPropsOverrides,
} from '@mui/x-data-grid';
import { twMerge } from 'tailwind-merge';
import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useAuth0Wrapper} from "@coldpbc/hooks";
import {addToOrgStorage, getFromOrgStorage} from "@coldpbc/lib";

export interface MUIDataGridProps extends DataGridProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  showSearch?: boolean;
  showExport?: boolean;
  showManageColumns?: boolean;
  searchKey?: string; // enabled controlled search
}

const CustomDataGridToolbar = (props: GridToolbarProps & ToolbarPropsOverrides) => {
  const { showSearch, showExport, showManageColumns, quickFilterProps } = props;
  if(!showSearch && !showExport && !showManageColumns) {
    return null;
  }
  return (
    <GridToolbarContainer>
      {showSearch && (
        <>
          <GridToolbarQuickFilter
            {...quickFilterProps}
            placeholder={quickFilterProps?.placeholder || 'Search...'}
          />
          <Box sx={{ flexGrow: 1 }} />
        </>
      )}
      {showManageColumns && <GridToolbarColumnsButton />}
      {showExport && <GridToolbarExport />}
    </GridToolbarContainer>
  );
};

export const MuiDataGrid = (props: MUIDataGridProps) => {
  const { showSearch, showExport, showManageColumns, slotProps, searchKey } = props;
  const { orgId } = useAuth0Wrapper()

  const initialFilterModel: GridFilterModel = {
    items: [],
    quickFilterValues: [],
  };

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>(initialFilterModel);

  useEffect(() => {
    if (orgId && searchKey) {
      const searchValue = getFromOrgStorage(orgId, searchKey);
      setFilterModel(prev => ({
        ...prev,
        quickFilterValues: [searchValue],
      }));
    }
  }, [orgId, searchKey]);

  const controlledFilterModelChange = (filterModel: GridFilterModel, details: GridCallbackDetails) => {
    if(orgId && searchKey) {
      const searchValue = filterModel.quickFilterValues?.join(' ') || '';
      addToOrgStorage(orgId, searchKey, searchValue);
    }
    setFilterModel(filterModel);
  }

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
        '--DataGrid-containerBackground': 'transparent',
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
        toolbar: CustomDataGridToolbar,
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
        ...slotProps,
        toolbar: {
          ...slotProps?.toolbar,
          showSearch,
          showExport,
          showManageColumns,
        },
      }}
      className={twMerge('text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto', props.className)}
      filterDebounceMs={searchKey ? 500 : props.filterDebounceMs}
      onFilterModelChange={searchKey ? controlledFilterModelChange : props.onFilterModelChange}
      filterModel={searchKey ? filterModel : props.filterModel}
    />
  );
};
