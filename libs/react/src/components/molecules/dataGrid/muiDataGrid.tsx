import { HexColors } from '@coldpbc/themes';
import { MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import {
  DataGridPro,
  DataGridProProps, GridCallbackDetails,
  GridColDef, GridColumnVisibilityModel, GridFilterModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport, GridToolbarProps,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { twMerge } from 'tailwind-merge';
import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {useAuth0Wrapper} from "@coldpbc/hooks";
import {addToOrgStorage, getFromOrgStorage} from "@coldpbc/lib";

export interface MUIDataGridProps extends DataGridProProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  showSearch?: boolean;
  showExport?: boolean;
  showManageColumns?: boolean;
  searchKey?: string; // enabled controlled search
  ref?: React.RefObject<HTMLDivElement>
  saveColumnKey?: string; // defines the key to save the columns in local storage
}

interface CustomDataGridToolbarProps extends GridToolbarProps {
  showSearch?: boolean;
  showExport?: boolean;
  showManageColumns?: boolean;
  // any additional custom props
}

const CustomDataGridToolbar = (props: CustomDataGridToolbarProps) => {
  const { showSearch, showExport, showManageColumns, quickFilterProps, printOptions, csvOptions } = props;
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
      {showExport && <GridToolbarExport printOptions={printOptions} csvOptions={csvOptions} />}
    </GridToolbarContainer>
  );
};

export const MuiDataGrid = (props: MUIDataGridProps) => {
  const { showSearch, showExport, showManageColumns, slotProps, searchKey, saveColumnKey } = props;
  const { orgId } = useAuth0Wrapper()

  const initialFilterModel: GridFilterModel = {
    items: [],
    quickFilterValues: [],
  };

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>(initialFilterModel);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  const handleColumnsChange = (model: GridColumnVisibilityModel) => {
    if(orgId && saveColumnKey) {
      const searchValue = model || undefined;
      addToOrgStorage(orgId, saveColumnKey, searchValue);
    }
    setColumnVisibilityModel(model);
  };

  useEffect(() => {
    if (orgId && searchKey) {
      const searchValue = getFromOrgStorage(orgId, searchKey);
      setFilterModel(prev => ({
        ...prev,
        quickFilterValues: [searchValue],
      }));
    }
  }, [orgId, searchKey]);

  useEffect(() => {
    if (orgId && saveColumnKey) {
      // get org storage key object for column visibility and set the column visibility model
      const searchValue = getFromOrgStorage(orgId, saveColumnKey);
      setColumnVisibilityModel(searchValue);
    }
  }, [orgId, saveColumnKey]);

  const controlledFilterModelChange = (filterModel: GridFilterModel, details: GridCallbackDetails) => {
    if(orgId && searchKey) {
      const searchValue = filterModel.quickFilterValues?.join(' ') || '';
      addToOrgStorage(orgId, searchKey, searchValue);
    }
    setFilterModel(filterModel);
  }

  return (
    <DataGridPro
      pagination
      rowHeight={37}
      columnHeaderHeight={40}
      autoHeight={true}
      {...props}
      sx={{
        '--DataGrid-overlayHeight': '300px',
        '--DataGrid-containerBackground': 'transparent',
        '--DataGrid-pinnedBackground': 'transparent',
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
        '& .MuiDataGrid-row': {
          cursor: 'pointer',
        },
        '& .MuiDataGrid-cell--pinnedRight' : {
          backgroundColor: HexColors.bgc.elevated,
        },
        '& .MuiTablePagination-toolbar': {
          justifyContent: 'flex-start', // Ensures pagination is aligned to the left
        },
        '& .MuiTablePagination-spacer': {
          display: 'none', // Removes default right spacing
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
          printOptions: {
            ...slotProps?.toolbar?.printOptions,
            disableToolbarButton: true,
          }
        } as CustomDataGridToolbarProps,
      }}
      className={twMerge('text-tc-primary border-[2px] rounded-[2px] border-gray-30 bg-transparent w-full h-auto', props.className)}
      filterDebounceMs={searchKey ? 500 : props.filterDebounceMs}
      onFilterModelChange={searchKey ? controlledFilterModelChange : props.onFilterModelChange}
      filterModel={searchKey ? filterModel : props.filterModel}
      columnVisibilityModel={saveColumnKey ? columnVisibilityModel : props.columnVisibilityModel}
      onColumnVisibilityModelChange={saveColumnKey ? handleColumnsChange : props.onColumnVisibilityModelChange}
    />
  );
};
