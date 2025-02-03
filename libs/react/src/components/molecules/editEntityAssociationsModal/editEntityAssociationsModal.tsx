import { BaseButton, Card, MuiDataGrid } from '@coldpbc/components';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useEntityData, useUpdateEntityAssociations} from '@coldpbc/hooks';
import {
  GridCellParams,
  GridColDef,
  GridFilterModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { isEqual, lowerCase, sortBy, uniq, uniqBy } from 'lodash';
import { FetchResult } from '@apollo/client';
import { ToastMessage } from '@coldpbc/interfaces';

interface EditEntityAssociationsModalProps {
	buttonText: string;
	refresh: () => void;
	title: string;
	entityLevelToAdd: EntityLevel;
  entityLevelToBeAddedTo: EntityLevel;
	idsSelected: string[];
	saveButtonText: string;
	entityToBeAddedId: string;
  'data-testid'?: string;
}

export const EditEntityAssociationsModal = (
  {buttonText, refresh, title, entityLevelToAdd, entityLevelToBeAddedTo, idsSelected, entityToBeAddedId}: EditEntityAssociationsModalProps
) => {
  const {orgId} = useAuth0Wrapper();
  const [showEntityAssociationModal, setShowEntityAssociationModal] = useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<string[]>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: [], quickFilterValues: []});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const entities = useEntityData(entityLevelToAdd === EntityLevel.ORGANIZATION ? undefined : entityLevelToAdd, orgId);
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
  const {callMutateFunction} = useUpdateEntityAssociations();
  // need to use materialSupplierId for materials
  const rows = entities.map(entity => ({
    id: entity.id,
    name: entity.name,
  }));

  const [filteredRows, setFilteredRows] = useState<any[]>(rows);

  useEffect(() => {
    if (showEntityAssociationModal) {
      setRowsSelected(idsSelected);
      setFilterModel({items: [], quickFilterValues: []});
    }
  }, [showEntityAssociationModal, idsSelected]);

  useEffect(() => {
    if (filterModel.quickFilterValues?.length) {
      const filteredRows = rows.filter(row => row.name.toLowerCase().includes(filterModel.quickFilterValues?.join(' ').toLowerCase() || ''));
      setFilteredRows(filteredRows);
      // update the rowsSelected to only include the filtered rows
      const filteredRowsIds = filteredRows.map(row => row.id);
      setRowsSelected(prev => prev.filter(id => filteredRowsIds.includes(id)));
    } else {
      setFilteredRows(rows);
      // when you remove a filter, set the rowsSelected to the original idsSelected + the prev ones
      setRowsSelected(prev =>
        uniq([...prev, ...idsSelected])
      );
    }
  }, [filterModel.quickFilterValues]);

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
          checked={rowsSelected.length === filteredRows.length && rowsSelected.length > 0}
          indeterminate={rowsSelected.length > 0 && rowsSelected.length < filteredRows.length}
          onClick={() => {
            if (rowsSelected.length === filteredRows.length || rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(filteredRows.map(r => r.id));
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

  const onEntitiesUpdate = async () => {
    setIsLoading(true);
    const removedRows = idsSelected.filter(id => !rowsSelected.includes(id));
    const addedRows = rowsSelected.filter(id => !idsSelected.includes(id));
    try {
      const promises: (Promise<void> | Promise<FetchResult<any>>)[] = []
      addedRows.forEach(row => {
        promises.push(callMutateFunction(entityLevelToAdd, entityLevelToBeAddedTo, row, entityToBeAddedId, orgId, 'add'))
      })
      removedRows.forEach(row => {
        promises.push(callMutateFunction(entityLevelToAdd, entityLevelToBeAddedTo, row, entityToBeAddedId, orgId, 'delete'))
      });

      const responses = await Promise.all(promises)
      logBrowser(`Updated ${lowerCase(entityLevelToAdd)}s successfully`, 'info', {
        orgId,
        entityLevelToAdd,
        entityLevelToBeAddedTo,
        entityToBeAddedId,
        idsSelected,
        rowsSelected,
        responses
      });
      addToastMessage({
        message: `Updated ${lowerCase(entityLevelToBeAddedTo)} successfully`,
        type: ToastMessage.SUCCESS
      })
      refresh();
      setShowEntityAssociationModal(false);
    } catch (error) {
      logBrowser(`Error updating ${lowerCase(entityLevelToBeAddedTo)}`, 'error', {
        orgId,
        entityLevelToAdd,
        entityLevelToBeAddedTo,
        entityToBeAddedId,
        idsSelected,
        rowsSelected,
        error
      }, error)
      addToastMessage({
        message: `Error updating ${lowerCase(entityLevelToBeAddedTo)}`,
        type: ToastMessage.FAILURE
      })
    } finally {
      setIsLoading(false);
    }
  }

  console.log({
    filteredRows,
    rowsSelected,
    idsSelected
  })

	return (
		<div data-testid={`${buttonText}`}>
			<BaseButton label={buttonText} variant={ButtonTypes.secondary} onClick={() => setShowEntityAssociationModal(true)}
                  data-testid={`${buttonText}-button`}
      />
			<FBModal
				dismissible
				show={showEntityAssociationModal}
				onClose={() => setShowEntityAssociationModal(false)}
				theme={flowbiteThemeOverride.modal}
				style={{
					boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
				}}
        data-testid={`${buttonText}-modal`}
      >
				<Card className="relative p-4 w-[962px] bg-gray-20" glow={false}>
					<div className="flex flex-col gap-[24px] w-full">
						<div className="flex flex-row text-h3">{title}</div>
						<div className="w-full h-[400px]">
							<MuiDataGrid
								rows={filteredRows}
								columns={columns}
								sx={{
									'--DataGrid-overlayHeight': '300px',
								}}
								className="h-full"
								autoHeight={false}
								disableColumnMenu={true}
								rowSelection={false}
                showSearch
                filterDebounceMs={500}
                filterModel={filterModel}
                onFilterModelChange={(model) => {
                  setFilterModel(model);
                }}
                slots={{
                  toolbar: () => {
                    return (
                      <GridToolbarContainer>
                        <GridToolbarQuickFilter
                        />
                      </GridToolbarContainer>
                    );
                  }
                }}
              />
						</div>
					</div>
					<div className="w-full flex flex-row justify-between">
						<BaseButton
              label="Cancel"
              onClick={() => setShowEntityAssociationModal(false)}
              variant={ButtonTypes.secondary}
            />
						<div className="flex flex-row gap-[16px] items-center">
							<div className="text-body font-bold text-tc-secondary">
								{rowsSelected.length}/{filteredRows.length} Selected
							</div>
							<BaseButton label={buttonText} loading={isLoading} onClick={onEntitiesUpdate} disabled={isEqual(sortBy(idsSelected), sortBy(rowsSelected)) || isLoading} />
						</div>
					</div>
				</Card>
			</FBModal>
		</div>
	);
};
