import {
  SustainabilityAttribute, SustainabilityAttributeWithoutAssurancesGraphQL,
  SustainabilityAttributeWithoutAssurances, ToastMessage
} from "@coldpbc/interfaces";
import {Modal as FBModal} from "flowbite-react";
import {flowbiteThemeOverride} from "@coldpbc/themes";
import {BaseButton, Card, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumn} from "@coldpbc/components";
import {find, forEach, get, has, isEqual, some, sortBy, uniq} from "lodash";
import {ButtonTypes, EntityLevel} from "@coldpbc/enums";
import React, {useEffect, useState} from "react";
import {GridCellParams, GridColDef, GridFilterModel} from "@mui/x-data-grid-pro";
import {Checkbox} from "@mui/material";
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR} from "@coldpbc/hooks";
import {withErrorBoundary} from "react-error-boundary";
import capitalize from "lodash/capitalize";
import {GRID_CHECKBOX_COL_DEF} from "@coldpbc/lib";

export interface EntitiesSelected {
  id: string;
  sustainabilityAttributes: SustainabilityAttribute[];
}

const _BulkEditEntityAttributesModal = (props: {
  entitiesSelected: EntitiesSelected[]
  entityLevel: EntityLevel
  show: boolean
  onClose: () => void
}) => {
  const { entitiesSelected, entityLevel, show, onClose } = props;
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<{
    attributeId: string;
    indeterminate: boolean;
  }[]>([]);
  const [sustainabilityAttributes, setSustainabilityAttributes] = useState<SustainabilityAttributeWithoutAssurancesGraphQL[]>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: [], quickFilterValues: []});

  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logBrowser } = useColdContext();

  const sustainabilityAttributesQuery = useGraphQLSWR<{
    sustainabilityAttributes: SustainabilityAttributeWithoutAssurancesGraphQL[]
  }>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_WITHOUT_ASSURANCES' : null, {
    filter: {
      level: entityLevel
    },
  });

  const { mutateGraphQL: createAttributeAssurances } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCES')

  const { mutateGraphQL: deleteAttributeAssurances } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCES')

  const getBulkEntityVariables = (id: string) => {
    switch(entityLevel){
      case EntityLevel.PRODUCT:
        return {
          product: {
            id: id,
          },
        }
      default:
      case EntityLevel.MATERIAL:
        return {
          material: {
            id: id,
          },
        }
    }
  }

  const getNewState = (
    entitiesSelected : EntitiesSelected[],
    sustainabilityAttributes: SustainabilityAttributeWithoutAssurancesGraphQL[]
  ) => {
    const newSelectedRows: {
      attributeId: string;
      indeterminate: boolean;
    }[] = [];
    if (sustainabilityAttributes.length > 0) {
      forEach(sortBy(sustainabilityAttributes, ['id'], ['asc']), (attribute) => {
        const entitiesWithAttribute = entitiesSelected.filter(entity => {
          return entity.sustainabilityAttributes.map(sus => sus.id).includes(attribute.id);
        });
        if(entitiesWithAttribute.length > 0){
          const indeterminate = entitiesWithAttribute.length < entitiesSelected.length;
          newSelectedRows.push({
            attributeId: attribute.id,
            indeterminate,
          });
        }
      })
    }
    return newSelectedRows;
  }

  useEffect(() => {
    if (sustainabilityAttributesQuery.data) {
      if (has(sustainabilityAttributesQuery.data, 'errors')) {
        setSustainabilityAttributes([]);
      } else {
        const attributes = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', []);
        setSustainabilityAttributes(attributes);
      }
    }
  }, [sustainabilityAttributesQuery.data]);

  useEffect(() => {
    setRowsSelected(getNewState(entitiesSelected, sustainabilityAttributes));
  }, [entitiesSelected, sustainabilityAttributes])

  const rows: {
    id: string;
    sustainabilityAttribute: SustainabilityAttributeWithoutAssurances;
  }[] = sustainabilityAttributes.map((sustainabilityAttribute) => {
    return {
      id: sustainabilityAttribute.id,
      sustainabilityAttribute: sustainabilityAttribute,
    }
  })

  const filteredRows = React.useMemo(() => {
    if (filterModel.quickFilterValues?.length) {
      return rows.filter(row =>
        row.sustainabilityAttribute.name.toLowerCase().includes(
          filterModel.quickFilterValues?.join(' ').toLowerCase() || ''
        )
      );
    }
    return rows;
  }, [rows, filterModel.quickFilterValues]);

  const filteredRowIds = React.useMemo(() => filteredRows.map(row => row.id), [filteredRows]);

  const clickSelectAll = () => {
    setRowsSelected(prev => {
      const selectedIds = prev.filter(row => filteredRowIds.includes(row.attributeId));
      const allOrSomeSelected = (selectedIds.length === filteredRowIds.length && filteredRows.length > 0) ||
        (selectedIds.length < filteredRows.length && selectedIds.length > 0 && filteredRows.length > 0);

      // remove all if all or some are selected
      if (allOrSomeSelected) {
        // Deselect only the currently filtered items and keep sorted
        return sortBy(prev.filter(row => !filteredRowIds.includes(row.attributeId)), ['attributeId']);
      } else {
        // Add the filtered items without modifying others, then sort
        return sortBy(uniq([...prev, ...filteredRowIds.map(id => ({ attributeId: id, indeterminate: false }))]), ['attributeId']);
      }
    });
  };

  const filteredSelectedIds = rowsSelected.filter(row => filteredRows.map(row => row.id).includes(row.attributeId));

  const handleFilterModelChange = React.useCallback((newModel: GridFilterModel) => {
    setFilterModel(prev => {
      if (!isEqual(prev, newModel)) return newModel;
      return prev;
    });
  }, []);

  const columns: GridColDef[] = [
    {
      ...GRID_CHECKBOX_COL_DEF,
      renderCell: (params: GridCellParams) => (
        <Checkbox
          checked={some(rowsSelected, (attribute) => {
            return attribute.attributeId === params.row.id && !attribute.indeterminate
          }) || false}
          indeterminate={some(rowsSelected, (attribute) => {
            return attribute.attributeId === params.row.id && attribute.indeterminate
          }) || false}
          onClick={() => {
            setRowsSelected((prev) => {
              // Check if the attribute is already selected
              const attributeSelected = find(prev, (attribute) => attribute.attributeId === params.row.id);

              if (attributeSelected) {
                // Remove the attribute from the selected rows
                return sortBy(
                  prev.filter((attribute) => attribute.attributeId !== params.row.id),
                  ['attributeId']
                );
              } else {
                // Add new attribute and ensure sorting
                return sortBy([...prev, { attributeId: params.row.id, indeterminate: false }], ['attributeId']);
              }
            })
          }}
        />
      ),
      renderHeader: () => (
        <Checkbox
          checked={filteredSelectedIds.length === filteredRows.length && filteredRows.length > 0}
          indeterminate={filteredSelectedIds.length < filteredRows.length && filteredSelectedIds.length > 0 && filteredRows.length > 0}
          onClick={clickSelectAll}
        />
      ),
    },
    {
      field: 'sustainabilityAttribute',
      headerName: 'Name',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 200,
      valueFormatter: (value: any) => {
        return value ? get(value, 'name') : "";
      },
      renderCell: (params: GridCellParams) => {
        return <SustainabilityAttributeColumn sustainabilityAttribute={params.value as SustainabilityAttributeWithoutAssurances | null} />;
      },
      sortComparator: (v1, v2) => {
        return get(v1, 'name', '').localeCompare(get(v2, 'name', ''));
      }
    },
  ]

  const onBulkEdit = async () => {
    setButtonLoading(true);

    // for each entity, check if the sustainability attribute is selected
    // if the sustainability attribute is indeterminate then it is partially selected, do not create a new assurance
    //

    try{
      const createInputs: any[] = [];
      const deleteFilters: any[] = [];
      entitiesSelected.forEach(entity => {
        const entitySustainabilityAttributeIds = entity.sustainabilityAttributes.map(sus => sus.id);
        // select the sustainability attributes that are checked that are not already in the entity's sustainability attributes
        const newSelectedSustainabilityAttributes = rowsSelected.filter((attribute) => {
          return !entitySustainabilityAttributeIds.includes(attribute.attributeId) && !attribute.indeterminate;
        })

        createInputs.push(...newSelectedSustainabilityAttributes.map(attribute => ({
          organization: { id: orgId },
          ...getBulkEntityVariables(entity.id),
          sustainabilityAttribute: { id: attribute.attributeId },
        })));

        // also check if some of the entity's sustainability attributes are unchecked
        // by comparing the selected rows with the entity's sustainability attributes
        const uncheckedSustainabilityAttributes = entitySustainabilityAttributeIds.filter((id) => {
          return !some(rowsSelected, (attribute) => {
            return attribute.attributeId === id
          });
        });

        if (uncheckedSustainabilityAttributes.length > 0) {

          // delete all the assurances with the attribute ids and the entity id
          deleteFilters.push(...uncheckedSustainabilityAttributes.map(id => ({
            organization: { id: orgId },
            ...getBulkEntityVariables(entity.id),
            sustainabilityAttribute: { id },
          })));
        }
      })

      if(createInputs.length > 0){
        await createAttributeAssurances({
          input: createInputs,
        })
      }

      if (deleteFilters.length > 0) {
        await Promise.all(deleteFilters.map(async (filter) => {
          await deleteAttributeAssurances({
            filter,
          })
        }))
      }

      addToastMessage({ message: `Success! ${capitalize(entityLevel)} Sustainability Attributes Updated`, type: ToastMessage.SUCCESS });
      logBrowser(`Successfully edited sustainability attributes`, 'info', {
        level: entityLevel,
        selectedValue: 'true',
      });
      onClose();
    } catch (e) {
      addToastMessage({ message: `Error! ${capitalize(entityLevel)} Sustainability Attributes Not Updated`, type: ToastMessage.FAILURE });
      logBrowser(`Failed to edit sustainability attributes`, 'error', {
        level: entityLevel,
        selectedValue: 'true',
        error: e,
      }, e);
    }
    setButtonLoading(false);
  }

  const areThereChanges = (
    rowsSelected: {
      attributeId: string;
      indeterminate: boolean;
    }[],
    entitiesSelected: EntitiesSelected[],
  ) => {
    // check there are any changes to the rows selected
    return isEqual(
      getNewState(entitiesSelected, sustainabilityAttributes),
      rowsSelected.sort((a, b) => a.attributeId.localeCompare(b.attributeId))
    )
  }

  logBrowser(`Opened bulk edit entity sustainability attribute modal`, 'info', {
    entitiesSelected: entitiesSelected,
    entityLevel,
    sustainabilityAttributes,
    rows,
    rowsSelected,
  });

  return (
    <FBModal dismissible show={show} onClose={onClose} theme={flowbiteThemeOverride.modal}>
      <Card
        className="relative p-4 w-[1000px] bg-gray-20"
        glow={false}
      >
        <div className={'flex flex-col gap-[24px] w-full'}>
          <div className={'flex flex-row text-h3'}>Bulk Edit Sustainability Attributes</div>
        </div>
        <div className={'w-full h-[400px]'}>
          <MuiDataGrid
            rows={filteredRows}
            columns={columns}
            loading={sustainabilityAttributesQuery.isLoading}
            showSearch
            sx={{
              '--DataGrid-overlayHeight': '300px',
            }}
            className={'h-full'}
            rowHeight={58}
            columnHeaderHeight={55}
            autoHeight={false}
            initialState={{
              sorting: {
                sortModel: [{ field: 'sustainabilityAttribute', sort: 'asc' }],
              }
            }}
            disableRowSelectionOnClick={true}
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
          />
        </div>
        <div className={'w-full flex flex-row justify-between'}>
          <BaseButton label={'Cancel'} onClick={onClose} variant={ButtonTypes.secondary}/>
          <div className="flex flex-row gap-[16px] items-center">
            <div className="text-body font-bold text-tc-secondary">
              {rowsSelected.length}/{rows.length} Selected
            </div>
            <BaseButton
              label={'Update Attributes'}
              onClick={onBulkEdit}
              loading={buttonLoading}
              disabled={buttonLoading || areThereChanges(rowsSelected, entitiesSelected)}
            />
          </div>
        </div>
      </Card>
    </FBModal>
  );
}

export const BulkEditAttributesForEntitiesSuppliedModal = withErrorBoundary(_BulkEditEntityAttributesModal, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in BulkEditAttributesForEntitiesSuppliedModal: ', error);
  },
});
