import {MuiDataGrid} from "@coldpbc/components";
import {GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {Claims} from "@coldpbc/interfaces";
import {TrashIcon} from "@heroicons/react/24/solid";
import React from "react";


export const CreateMaterialAttributesTable = (props: {
  attributes: Claims[],
  removeAttribute: (id: string) => void
}) => {
  const {attributes, removeAttribute} = props;
  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', minWidth: 130, flex: 1, headerClassName: 'bg-gray-30'},
    {field: 'type', headerName: 'Type', minWidth: 130, flex: 1, headerClassName: 'bg-gray-30'},
    {
      field: 'actions',
      type: 'actions',
      width: 60,
      headerClassName: 'bg-gray-30 text-body',
      getActions: params => [
        <GridActionsCellItem
          label={'Remove'}
          onClick={() => {
            removeAttribute(params.row.id);
          }}
          showInMenu={true}
        />,
        <GridActionsCellItem
          label={'View'}
          onClick={() => {
            removeAttribute(params.row.id);
          }}
          showInMenu={true}
        />,
      ],
    }
  ]

  const rows = attributes.map((attribute) => {
    return attribute
  })

  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      sx={{
        '--DataGrid-overlayHeight': '100px',
      }}
      autoHeight={false}
      className={'h-full'}
    />
  )
}
