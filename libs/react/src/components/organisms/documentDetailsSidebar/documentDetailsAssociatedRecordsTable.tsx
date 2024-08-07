import { Files } from '@coldpbc/interfaces';
import { HexColors } from '@coldpbc/themes';
import { MUIDataGridNoRowsOverlay } from '@coldpbc/components';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import React from 'react';
import { get, isEqual, uniqWith } from 'lodash';

export const DocumentDetailsAssociatedRecordsTable = (props: { records: Files['certification_claim'] | undefined }) => {
  const { records } = props;

  if (records === undefined || (records && records.length === 0)) {
    return null;
  }

  let newRows: GridValidRowModel[] = [];

  const productMaterialSupplierCombinations = uniqWith(
    records.map(record => {
      return {
        product: get(record, 'product.name', '--'),
        material: get(record, 'material.name', '--'),
        supplier: get(record, 'facility.name', '--'),
      };
    }),
    isEqual,
  );
  // get unique product, material, supplier combinations

  productMaterialSupplierCombinations.forEach((combination, index) => {
    const row = {
      id: index.toString(),
      material: combination.material,
      product: combination.product,
      supplier: combination.supplier,
    };
    newRows.push(row);
  });

  const hasAnyProducts = productMaterialSupplierCombinations.some(combo => combo.product !== '--');
  const hasAnyMaterials = productMaterialSupplierCombinations.some(combo => combo.material !== '--');
  const hasAnyFacilities = productMaterialSupplierCombinations.some(combo => combo.supplier !== '--');

  const columns: GridColDef[] = [];

  if (hasAnyProducts) {
    // put the product column in the first index
    columns.push({
      field: 'product',
      headerName: 'Product',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
    });
  }

  if (hasAnyMaterials) {
    // put the material column before the supplier column
    columns.push({
      field: 'material',
      headerName: 'Material',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
    });
  }

  if (hasAnyFacilities) {
    columns.push({
      field: 'supplier',
      headerName: 'Supplier',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
    });
  }

  const rows: GridValidRowModel[] = newRows;

  return (
    <div className={'w-full flex flex-col gap-[16px]'}>
      <div className={'w-full text-tc-primary text-h5'}>Associated Records</div>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={37}
        getRowClassName={() => {
          return 'text-tc-primary cursor-pointer';
        }}
        className={'text-tc-primary border-[2px] rounded-[2px] border-gray-90 bg-transparent w-full h-auto'}
        sx={{
          '--DataGrid-overlayHeight': '300px',
          '--DataGrid-rowBorderColor': HexColors.gray[90],
          '& .MuiTablePagination-root': {
            color: HexColors.tc.primary,
          },
          '& .MuiDataGrid-withBorderColor': {
            borderColor: HexColors.gray[90],
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
        }}
        columnHeaderHeight={40}
        autoHeight={true}
        slots={{
          noRowsOverlay: MUIDataGridNoRowsOverlay,
        }}
        disableColumnMenu={true}
        hideFooter={true}
      />
    </div>
  );
};
