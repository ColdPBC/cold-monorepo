import { BaseButton, Card, MuiDataGrid } from '@coldpbc/components';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useEntityData, useUpdateEntityAssociations} from '@coldpbc/hooks';
import {GridCellParams, GridColDef, GridToolbarContainer, GridToolbarQuickFilter} from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import {isEqual, sortBy} from 'lodash';
import { FetchResult } from '@apollo/client';
import { ToastMessage } from '@coldpbc/interfaces';

interface EditEntityAssociationsModalProps {
	buttonText: string;
	refresh: () => void;
	title: string;
	entityLevel: EntityLevel;
	idsSelected: string[];
	saveButtonText: string;
	entityToBeAddedId: string;
}

export const EditEntityAssociationsModal = (
  {buttonText, refresh, title, entityLevel, idsSelected, saveButtonText, entityToBeAddedId}: EditEntityAssociationsModalProps
) => {
  const {orgId} = useAuth0Wrapper();
  const [showEntityAssociationModal, setShowEntityAssociationModal] = useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const entities = useEntityData(entityLevel === EntityLevel.ORGANIZATION ? undefined : entityLevel, orgId);
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
  const {callMutateFunction} = useUpdateEntityAssociations();
  // need to use materialSupplierId for materials
  const rows = entities.map(entity => ({
    id: entity.id,
    name: entity.name
  }))

  useEffect(() => {
    if (showEntityAssociationModal) {
      setRowsSelected(idsSelected);
    }
  }, [showEntityAssociationModal, idsSelected]);

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
          onClick={() => {
            if (rowsSelected.length === rows.length || rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(rows.map(r => r.id));
            }
          }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 130,
      flex: 1,
      headerClassName: 'bg-gray-30',
      cellClassName: 'bg-gray-10',
    },
  ];

  const onEntitiesUpdate = () => {
    setIsLoading(true);
    const removedRows = idsSelected.filter(id => !rowsSelected.includes(id));
    const addedRows = rowsSelected.filter(id => !idsSelected.includes(id));
    try {
      const promises: (Promise<void> | Promise<FetchResult<any>>)[] = []
      addedRows.forEach(row => {
        promises.push(callMutateFunction(entityLevel, row, entityToBeAddedId, orgId, true))
      })
      removedRows.forEach(row => {
        promises.push(callMutateFunction(entityLevel, row, entityToBeAddedId, orgId, false))
      });

      Promise.all(promises).then((responses) => {
        logBrowser(`Updated entity associations successfully`, 'info', {
          orgId,
          entityLevel,
          entityToBeAddedId,
          idsSelected,
          rowsSelected,
          responses
        });
        addToastMessage({
          message: 'Associations updated successfully',
          type: ToastMessage.SUCCESS
        })
        refresh();
        setShowEntityAssociationModal(false);
      }).catch((error) => {
        logBrowser(`Error updating entity associations`, 'error', {
          orgId,
          entityLevel,
          entityToBeAddedId,
          idsSelected,
          rowsSelected,
          error
        }, error)
        addToastMessage({
          message: 'Error updating associations',
          type: ToastMessage.FAILURE
        })
      })
    } catch (error) {
      logBrowser(`Error updating entity associations`, 'error', {
        orgId,
        entityLevel,
        entityToBeAddedId,
        idsSelected,
        rowsSelected,
        error
      }, error)
      addToastMessage({
        message: 'Error updating associations',
        type: ToastMessage.FAILURE
      })
    } finally {
      setIsLoading(false);
    }
  }

	return (
		<div>
			<BaseButton
        label={buttonText}
        variant={ButtonTypes.secondary}
        onClick={() => setShowEntityAssociationModal(true)}
      />
      <FBModal
        dismissible
        show={showEntityAssociationModal}
        onClose={() => setShowEntityAssociationModal(false)}
        theme={flowbiteThemeOverride.modal}
        style={{
          boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
        }}
      >
        <Card className="relative p-4 w-[962px] bg-gray-20" glow={false}>
          <div className="flex flex-col gap-[24px] w-full">
            <div className="flex flex-row text-h3">{title}</div>
            <div className="w-full h-[400px]">
              <MuiDataGrid
                rows={rows}
                columns={columns}
                sx={{
                  '--DataGrid-overlayHeight': '300px',
                }}
                className="h-full"
                autoHeight={false}
                disableColumnMenu={true}
                rowSelection={false}
                showSearch={true}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <BaseButton label="Cancel" onClick={() => setShowEntityAssociationModal(false)} variant={ButtonTypes.secondary} disabled={isLoading} />
            <div className="flex flex-row gap-[16px] items-center">
              <div className="text-body font-bold text-tc-secondary">
                {rowsSelected.length}/{rows.length} Selected
              </div>
              <BaseButton
                label={buttonText}
                loading={isLoading}
                onClick={onEntitiesUpdate}
                disabled={isEqual(sortBy(idsSelected), sortBy(rowsSelected)) || isLoading}
              />
            </div>
          </div>
        </Card>
      </FBModal>
		</div>
  );
};
