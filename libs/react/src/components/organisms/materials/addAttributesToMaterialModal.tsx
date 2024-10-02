import {BaseButton, Card, Modal, MuiDataGrid} from '@coldpbc/components';
import {useAuth0Wrapper} from "@coldpbc/hooks";
import {Claims} from "@coldpbc/interfaces";
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
import capitalize from "lodash/capitalize";


export const AddAttributesToMaterialModal = (props: {
  show: boolean;
  onClose: () => void;
  attributes: Claims[];
  addAttributes: (attributes: string[]) => void;
}) => {
  const {show, onClose, attributes, addAttributes} = props;
  const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const columns: GridColDef[] = [
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

  const rows = attributes.map((attribute) => {
    return attribute
  })

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
            Add Sustainability Attributes To Track
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
              {rowsSelected.length}/{attributes.length} Selected
            </div>
            <BaseButton
              label={'Add'}
              onClick={() => {
                addAttributes(rowsSelected as string[]);
              }}
              disabled={addButtonDisabled}
            />
          </div>
        </div>
      </Card>
    </FBModal>
  );
}
