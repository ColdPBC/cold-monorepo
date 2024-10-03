import {GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {MuiDataGrid} from "@coldpbc/components";


export const CreateMaterialTable = (props: {
  type: 'products' | 'attributes',
  remove: (id: string) => void
  entities: any[]
}) => {
  const {type, remove, entities} = props;
  let columns: GridColDef[] = [];
  const rows: any[] = entities

  if(type === "products") {
    columns = [
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 130,
        flex: 1,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
      },
    ]
  } else {
    columns = [
      {field: 'name', headerName: 'Name', minWidth: 130, flex: 1, headerClassName: 'bg-gray-30', cellClassName: 'bg-gray-10'},
      {field: 'type', headerName: 'Type', minWidth: 130, flex: 1, headerClassName: 'bg-gray-30', cellClassName: 'bg-gray-10'},
    ]
  }
  columns.push({
    field: 'actions',
    type: 'actions',
    width: 60,
    headerClassName: 'bg-gray-30 text-body',
    cellClassName: 'bg-gray-10',
    getActions: params => [
      <GridActionsCellItem
        label={'Remove'}
        onClick={() => {
          remove(params.row.id);
        }}
        showInMenu={true}
      />,
      <GridActionsCellItem
        label={'View'}
        onClick={() => {

        }}
        showInMenu={true}
      />,
    ],
  })


  return (
    <div className={'w-full h-[400px]'}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        sx={{
          '--DataGrid-overlayHeight': '100px',
        }}
        autoHeight={false}
        className={'h-full'}
      />
    </div>
  )
}
