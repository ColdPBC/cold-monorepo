import {
  AddToCreateEntityModal,
  BaseButton,
  Card,
  ComboBox,
  CreateEntityTable, ErrorFallback,
  Input,
  MainContent,
  Modal,
  Spinner
} from '@coldpbc/components';
import React, { useEffect, useState } from 'react';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { Claims, InputOption, SuppliersWithAssurances, ToastMessage } from '@coldpbc/interfaces';
import {get, has, some} from 'lodash';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import {withErrorBoundary} from "react-error-boundary";

interface MaterialCreate {
  name: string;
  description: string;
  materialCategory: string;
  materialSubCategory: string;
  brandMaterialId: string;
  supplierMaterialId: string;
}

const _CreateMaterialPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
	const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();

  const isFormValid = (materialState: MaterialCreate) => {
    return materialState.name !== '';
  }

  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Select one',
    value: '-1',
  };

  const [materialState, setMaterialState] = useState<MaterialCreate>({
    name: '',
    description: '',
    materialCategory: '',
    materialSubCategory: '',
    brandMaterialId: '',
    supplierMaterialId: '',
  });

	const [supplier, setSupplier] = useState<InputOption>(placeHolderOption);
	const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
	const [attributes, setAttributes] = useState<Claims[]>([]);
	const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [materialClassifications, setMaterialClassifications] = useState<{id: string, name: string}[]>([]);
  const [materialClassification, setMaterialClassification] = useState<InputOption>(placeHolderOption);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'attributes' | undefined>(undefined);
  const {mutateGraphQL: createMaterial} = useGraphQLMutation('CREATE_MATERIAL');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
  const {mutateGraphQL: createMaterialSupplier} = useGraphQLMutation('CREATE_MATERIAL_SUPPLIER');

	const suppliersQuery = useGraphQLSWR<{
		organizationFacilities: SuppliersWithAssurances[];
	}>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
		filter: {
			organization: {
				id: orgId,
			},
			supplier: true,
			supplierTier: 2,
		},
	});

	const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES');

  const materialClassificationsQuery = useGraphQLSWR<{
    materialClassifications: {id: string; name: string;}[];
  }>('GET_ALL_MATERIAL_CLASSIFICATIONS');

  useEffect(() => {
    setSaveButtonDisabled(!isFormValid(materialState));
  }, [materialState]);

	useEffect(() => {
		if (suppliersQuery.data) {
			if (has(suppliersQuery.data, 'errors')) {
				setSuppliers([]);
			} else {
				const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []);
				setSuppliers(suppliers);
			}
		}
	}, [suppliersQuery.data]);

	useEffect(() => {
		if (allSustainabilityAttributes.data) {
			if (has(allSustainabilityAttributes.data, 'errors')) {
				setAttributes([]);
			} else {
				const attributes = get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', []);
				setAttributes(attributes);
			}
		}
	}, [allSustainabilityAttributes.data]);

  useEffect(() => {
    if (materialClassificationsQuery.data) {
      if (has(materialClassificationsQuery.data, 'errors')) {
        setMaterialClassifications([]);
      } else {
        const classifications = get(materialClassificationsQuery.data, 'data.materialClassifications', []);
        setMaterialClassifications(classifications);
      }
    }
  }, [materialClassificationsQuery.data]);

  if (suppliersQuery.isLoading || allSustainabilityAttributes.isLoading) {
		return <Spinner />;
	}


	const supplierOptions: InputOption[] = suppliers.map((supplier, index) => {
		return {
			id: index,
			name: supplier.name,
			value: supplier.id,
		};
	});

  const onSaveButtonClick = async () => {
    setSaveButtonLoading(true);
    try {
      const hasMaterialClassification = materialClassification.id !== -1;
      const createMaterialResponse = await createMaterial({
        input: {
          ...materialState,
          organization: {
            id: orgId,
          },
          materialClassification: hasMaterialClassification && {
            id: materialClassification.value,
          }
        },
      })
      const materialId = get(createMaterialResponse, 'data.createMaterial.id');
      if (materialId) {
        if(supplier.id !== -1) {
          await createMaterialSupplier({
            input: {
              material: {
                id: materialId,
              },
              organizationFacility: {
                id: supplier.value,
              },
							organization: {
								id: orgId,
							},
            },
          })
        }

        if(attributesToAdd.length !== 0) {
          for (const attribute of attributesToAdd) {
            await createAttributeAssurance({
              input: {
                organization: {
                  id: orgId,
                },
                material: {
                  id: materialId,
                },
                sustainabilityAttribute: {
                  id: attribute.id,
                },
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
            });
          }
        }

        logBrowser('Material created with assurances successfully', 'error', {
          orgId,
          materialId,
        });
        await addToastMessage({
          message: 'Material created successfully',
          type: ToastMessage.SUCCESS,
        })

        navigate(`/materials/${materialId}`);
      } else {
        logBrowser('Error creating material', 'error', {
          orgId,
          response: createMaterialResponse,
        });
        await addToastMessage({
          message: 'Error creating material',
          type: ToastMessage.FAILURE,
        })
      }
    } catch (e) {
      logBrowser('Error creating material', 'error', {
        orgId,
        error: e,
      });
      addToastMessage({
        message: 'Error creating material',
        type: ToastMessage.FAILURE,
      })
    }
    setSaveButtonLoading(false);
  }

  const pageButtons = () => {
    return (
      <div className={'flex flex-row gap-[16px] h-full items-center'}>
        <BaseButton
          label={'Cancel'}
          variant={ButtonTypes.warning}
          onClick={() => {
            setShowCancelModal(true);
          }}
          className={'h-[40px]'}
          disabled={saveButtonLoading}
          />
        <BaseButton
          label={'Save'}
          variant={ButtonTypes.primary}
          onClick={onSaveButtonClick}
          disabled={saveButtonDisabled || saveButtonLoading}
          loading={saveButtonLoading}
          className={'h-[40px]'}
        />
      </div>
    )
  }

  const getEntities = () => {
    return attributes.filter(attribute => {
      return !some(attributesToAdd, { id: attribute.id, name: attribute.name });
    });
  }

	return (
		<MainContent
			title={'Create New Material'}
			breadcrumbs={[
				{
					label: 'Materials',
					href: '/materials',
				},
				{
					label: 'Create New',
				},
			]}
      className={'w-full'}
      headerElement={pageButtons()}
    >
			<div className={'flex flex-row gap-[24px] w-full mb-[80px]'}>
        <Card className={'flex flex-col w-1/2 gap-[32px]'} title={'Details'} glow={false}>
          <Input
            input_props={{
              name: 'name',
              value: materialState.name,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  name: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  name: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Name *'}
          />
          <Input
            input_props={{
              name: 'description',
              value: materialState.description,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  description: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  description: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Description'}
          />
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>Supplier</div>
            <ComboBox
              options={[placeHolderOption, ...supplierOptions]}
              value={supplier}
              name={'supplier'}
              onChange={option => setSupplier(option)}
            />
          </div>
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>Material Classification</div>
            <ComboBox
              options={[placeHolderOption, ...materialClassifications.map((classification, index) => {
                return {
                  id: index,
                  name: classification.name,
                  value: classification.id,
                }
              })]}
              value={materialClassification}
              name={'materialClassification'}
              onChange={setMaterialClassification}
            />
          </div>
          <Input
            input_props={{
              name: 'materialCategory',
              value: materialState.materialCategory,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  materialCategory: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  materialCategory: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Category'}
          />
          <Input
            input_props={{
              name: 'materialSubCategory',
              value: materialState.materialSubCategory,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  materialSubCategory: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  materialSubCategory: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Sub-Category'}
          />
          <Input
            input_props={{
              name: 'brandMaterialId',
              value: materialState.brandMaterialId,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  brandMaterialId: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  brandMaterialId: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Brand Material Id'}
          />
          <Input
            input_props={{
              name: 'brandMaterialId',
              value: materialState.brandMaterialId,
              onChange: e => {
                setMaterialState({
                  ...materialState,
                  brandMaterialId: e.target.value,
                });
              },
              onValueChange: e => {
                setMaterialState({
                  ...materialState,
                  brandMaterialId: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Brand Material Id'}
          />        </Card>
        <Card className={'flex-col w-1/2 gap-[32px] self-start'} title={'Sustainability Attributes'} glow={true}>
          <BaseButton
            label={'Add'}
            iconLeft={IconNames.PlusIcon}
            variant={ButtonTypes.secondary}
            onClick={() => setCreateModalType('attributes')}
          />
          <CreateEntityTable
            type={'attributes'}
            remove={(id) => {
              const newAttributes = attributesToAdd.filter((attr) => attr.id !== id);
              setAttributesToAdd(newAttributes);
            }}
            entities={attributesToAdd}
          />
        </Card>
			</div>
      {
        createModalType !== undefined && (
          <AddToCreateEntityModal
            show={true}
            onClose={() => {
              setCreateModalType(undefined);
            }}
            onAdd={(ids: string[]) => {
              const newAttributes: Claims[] = [];
              ids.forEach((id) => {
                const foundAttribute = attributes.find((attr) => attr.id === id);
                if(foundAttribute) {
                  newAttributes.push(foundAttribute);
                }
              });
              setAttributesToAdd([
                ...attributesToAdd,
                ...newAttributes,
              ]);
              setCreateModalType(undefined);
            }}
            type={createModalType}
            entities={getEntities()}
          />
        )
      }
      <Modal
        show={showCancelModal}
        setShowModal={setShowCancelModal}
        header={{
          title: 'Cancel without saving?',
          cardProps: {
            className: 'relative p-6'
          }
        }}
        body={<div>All progress made on creating this material will be lost.</div>}
        footer={{
          rejectButton: {
            label: 'Cancel',
            onClick: () => setShowCancelModal(false),
            variant: ButtonTypes.secondary,
          },
          resolveButton: {
            label: 'Cancel Without Saving',
            onClick: () => {
              setShowCancelModal(false);
              navigate('/materials');
            },
            variant: ButtonTypes.warning,
          }
      }}
        modalProps={{
          style: {}
        }}
      />
		</MainContent>
	);
};

export const CreateMaterialPage = withErrorBoundary(_CreateMaterialPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
