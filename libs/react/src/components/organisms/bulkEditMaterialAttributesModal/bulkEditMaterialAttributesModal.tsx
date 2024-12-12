import {
  SustainabilityAttribute, SustainabilityAttributeForBulkEditGraphQL,
  SustainabilityAttributeWithoutAssurances, ToastMessage
} from "@coldpbc/interfaces";
import {Modal as FBModal} from "flowbite-react";
import {flowbiteThemeOverride} from "@coldpbc/themes";
import {BaseButton, Card, ErrorFallback, MuiDataGrid, SustainabilityAttributeColumn} from "@coldpbc/components";
import {find, forEach, get, has, isEqual, some} from "lodash";
import {ButtonTypes} from "@coldpbc/enums";
import React, {useEffect, useState} from "react";
import {GridCellParams, GridColDef} from "@mui/x-data-grid";
import {Checkbox} from "@mui/material";
import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR} from "@coldpbc/hooks";
import {withErrorBoundary} from "react-error-boundary";

const _BulkEditMaterialAttributesModal = (props: {
  materialsSelected: {
    id: string;
    material: string;
    materialCategory: string;
    materialSubcategory: string;
    sustainabilityAttributes: SustainabilityAttribute[];
  }[]
  show: boolean
  onClose: () => void
}) => {
  const { materialsSelected, show, onClose } = props;
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [rowsSelected, setRowsSelected] = useState<{
    attributeId: string;
    indeterminate: boolean;
  }[]>([]);
  const [sustainabilityAttributes, setSustainabilityAttributes] = useState<SustainabilityAttributeForBulkEditGraphQL[]>([]);

  const { orgId } = useAuth0Wrapper();
  const { addToastMessage } = useAddToastMessage();
  const { logBrowser } = useColdContext();

  const sustainabilityAttributesQuery = useGraphQLSWR<{
    sustainabilityAttributes: SustainabilityAttributeForBulkEditGraphQL[]
  }>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_BULK_EDIT' : null, {
    filter: {
      level: 'MATERIAL'
    }
  });

  const { mutateGraphQL: createAttributeAssurances } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCES')

  const { mutateGraphQL: deleteAttributeAssurances } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCES')

  const getNewState = (materialsSelected, sustainabilityAttributes) => {
    const newSelectedRows: {
      attributeId: string;
      indeterminate: boolean;
    }[] = [];
    if (sustainabilityAttributes.length > 0) {
      forEach(sustainabilityAttributes, (attribute) => {
        const materialsWithAttribute = materialsSelected.filter(material => {
          return material.sustainabilityAttributes.map(sus => sus.id).includes(attribute.id);
        });
        if(materialsWithAttribute.length > 0){
          const indeterminate = materialsWithAttribute.length < materialsSelected.length;
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
    setRowsSelected(getNewState(materialsSelected, sustainabilityAttributes));
  }, [materialsSelected, sustainabilityAttributes])

  const rows: {
    id: string;
    sustainabilityAttribute: SustainabilityAttributeWithoutAssurances | null;
    materials: {
      id: string;
      material: string;
      materialCategory: string;
      materialSubcategory: string;
      sustainabilityAttributes: SustainabilityAttribute[]
    }[]
  }[] = sustainabilityAttributes.map((sustainabilityAttribute) => {
    return {
      id: sustainabilityAttribute.id,
      sustainabilityAttribute: sustainabilityAttribute,
      materials: materialsSelected.filter(material => {
        // filter out the materials that do not have the selected sustainability attribute
        return material.sustainabilityAttributes.map(sus => sus.id).includes(sustainabilityAttribute.id);
      })
    }
  })

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      editable: false,
      sortable: false,
      hideSortIcons: true,
      width: 100,
      headerClassName: 'bg-gray-30',
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
              const attributeSelected = find(prev, (attribute) => {
                return attribute.attributeId === params.row.id
              } );
              if (attributeSelected) {
                if(attributeSelected.indeterminate){
                  return prev.map((attribute) => {
                    if(attribute.attributeId === params.row.id){
                      return {
                        ...attribute,
                        indeterminate: false,
                      }
                    }
                    return attribute;
                  });
                } else {
                  return prev.filter((attribute) => {
                    return attribute.attributeId !== params.row.id
                  });
                }
              } else {
                return [...prev, {
                  attributeId: params.row.id,
                  indeterminate: false,
                }];
              }
            })
          }}
        />
      ),
      renderHeader: (params) => (
        <Checkbox
          checked={rowsSelected.length === sustainabilityAttributes.length && rowsSelected.length > 0}
          indeterminate={rowsSelected.length > 0 && rowsSelected.length < sustainabilityAttributes.length}
          onClick={(e) => {
            if(rowsSelected.length === sustainabilityAttributes.length) {
              setRowsSelected([]);
            } else if(rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(sustainabilityAttributes.map((attribute) => ({
                attributeId: attribute.id,
                indeterminate: false,
              })));
            }
          }}
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
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        return get(v1, 'name', '').localeCompare(get(v2, 'name', ''));
      }
    },
  ]

  const onBulkEdit = async () => {
    setButtonLoading(true);

    // for each material, check if the sustainability attribute is selected
    // if the sustainability attribute is indeterminate then it is partially selected, do not create a new assurance
    //

    try{
      const createInputs: any[] = [];
      const deleteFilters: any[] = [];
      materialsSelected.forEach(material => {
        const materialSustainabilityAttributeIds = material.sustainabilityAttributes.map(sus => sus.id);
        // select the sustainability attributes that are checked that are not already in the material's sustainability attributes
        const newSelectedSustainabilityAttributes = rowsSelected.filter((attribute) => {
          return !materialSustainabilityAttributeIds.includes(attribute.attributeId) && !attribute.indeterminate;
        })

        createInputs.push(...newSelectedSustainabilityAttributes.map(attribute => ({
          organization: { id: orgId },
          material: { id: material.id },
          sustainabilityAttribute: { id: attribute.attributeId },
        })));

        // also check if some of the material's sustainability attributes are unchecked
        // by comparing the selected rows with the material's sustainability attributes
        const uncheckedSustainabilityAttributes = materialSustainabilityAttributeIds.filter((id) => {
          return !some(rowsSelected, (attribute) => {
            return attribute.attributeId === id
          });
        });

        if (uncheckedSustainabilityAttributes.length > 0) {
          // delete all the assurances with the attribute ids and the material id
          deleteFilters.push(...uncheckedSustainabilityAttributes.map(id => ({
            material: { id: material.id },
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

      addToastMessage({ message: `Success! Material Sustainability Attributes Updated`, type: ToastMessage.SUCCESS });
      logBrowser(`Successfully edited sustainability attribute`, 'info', {
        level: 'MATERIAL',
        selectedValue: 'true',
      });
      onClose();
    } catch (e) {
      addToastMessage({ message: `Error! Material Sustainability Attributes Not Updated`, type: ToastMessage.FAILURE });
      logBrowser(`Failed to edit sustainability attribute`, 'error', {
        level: 'MATERIAL',
        selectedValue: 'true',
        error: e,
      }, e);
    }
    setButtonLoading(false);
  }

  logBrowser(`Opened bulk edit material sustainability attribute modal`, 'info', {
    materialsSelected,
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
            rows={rows}
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
          />
        </div>
        <div className={'w-full flex flex-row justify-between'}>
          <BaseButton label={'Cancel'} onClick={onClose} variant={ButtonTypes.secondary}/>
          <BaseButton
            label={'Update Attributes'}
            onClick={onBulkEdit}
            loading={buttonLoading}
            disabled={isEqual(
              getNewState(materialsSelected, sustainabilityAttributes).sort((a, b) => a.attributeId.localeCompare(b.attributeId)),
              rowsSelected.sort((a, b) => a.attributeId.localeCompare(b.attributeId))
            )}
          />
        </div>
      </Card>
    </FBModal>
  );
}

export const BulkEditMaterialAttributesModal = withErrorBoundary(_BulkEditMaterialAttributesModal, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in BulkEditMaterialAttributesModal: ', error);
  },
});
