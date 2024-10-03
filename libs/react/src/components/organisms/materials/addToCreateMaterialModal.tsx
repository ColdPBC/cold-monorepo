import {BaseButton, Card, Modal, MuiDataGrid} from '@coldpbc/components';
import { Modal as FBModal } from 'flowbite-react';
import {flowbiteThemeOverride} from "@coldpbc/themes";
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarContainer, GridToolbarQuickFilter
} from "@mui/x-data-grid";
import {ButtonTypes} from "@coldpbc/enums";
import React, {useEffect, useState} from "react";
import {Claims} from "@coldpbc/interfaces";
import capitalize from "lodash/capitalize";

export const AddToCreateMaterialModal = (props: {
  show: boolean;
  onClose: () => void;
  onAdd: (ids: string[]) => void;
  type: "products" | "attributes";
  products: {
    name: string;
  }[];
  attributes: Claims[]
}) => {
  const {
    type,
    show,
    onClose,
    onAdd,
    products,
    attributes,
  } = props;

  let columns: GridColDef[] = [];
  let rows: any[] = [];

  if(type === "products") {
    columns = [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 100,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 130,
        flex: 1,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
      },
    ]
    rows = products.map((attribute) => {
      return attribute
    })
  } else {
    columns = [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 100,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 130,
        flex: 1,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
      },
      {
        field: 'type',
        headerName: 'Type',
        minWidth: 130,
        flex: 1,
        headerClassName: 'bg-gray-30',
        cellClassName: 'bg-gray-10',
        valueGetter: (value) => {
          return capitalize((value as string).replace('_', ' '));
        }
      },
    ]
    rows = attributes.map((attribute) => {
      return attribute
    })
  }

  const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

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

  const title = type === "products" ? 'Add Products' : 'Add Sustainability Attribute to Track';

  const buttonText = type === "products" ? 'Add Products' : 'Add Attributes';

  return (
    <FBModal
      dismissible
      show={show}
      onClose={onClose}
      theme={flowbiteThemeOverride.modal}
      style={{
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
      }}>
      <Card className="relative p-4 overflow-visible w-[962px]">
        <div className={'flex flex-col gap-[24px] w-full'}>
          <div className={'flex flex-row text-h3'}>
            {title}
          </div>
          <div className={'w-full h-[400px]'}>
            <MuiDataGrid
              rows={rows}
              columns={columns}
              sx={{
                '--DataGrid-overlayHeight': '300px',
              }}
              className={'h-full'}
              checkboxSelection={true}
              autoHeight={false}
              onRowSelectionModelChange={(newSelection) => {
                setRowsSelected(newSelection);
              }}
              rowSelectionModel={rowsSelected}
              slots={{
                toolbar: getToolbar,
              }}
            />
          </div>
        </div>
        <div className={'w-full flex flex-row justify-between'}>
          <BaseButton
            label={'Cancel'}
            onClick={onClose}
            variant={ButtonTypes.secondary}
          />
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
}
