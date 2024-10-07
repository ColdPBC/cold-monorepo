import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR} from "@coldpbc/hooks";
import {useNavigate} from "react-router-dom";
import {
  Claims,
  InputOption,
  Materials,
  ToastMessage
} from "@coldpbc/interfaces";
import React, {useEffect, useState} from "react";
import {get, has, some} from "lodash";
import {
  AddProductOrMaterialsCreateSupplierCard,
  AddToCreateMaterialModal,
  BaseButton,
  Card,
  ComboBox,
  CreateMaterialTable,
  Input,
  MainContent, Modal,
  Spinner
} from "@coldpbc/components";
import {ButtonTypes, IconNames} from "@coldpbc/enums";

export const CreateSupplierPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Tier',
    value: '0',
  };

  const isFormValid = (name: string, tier: InputOption) => {
    return name !== '' && tier.value !== '0';
  }

  const [supplierState, setSupplierState] = useState<{
    name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }>({
    name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const [tier, setTier] = useState<InputOption>(placeHolderOption);
  const [attributes, setAttributes] = useState<Claims[]>([]);
  const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [products, setProducts] = useState<{id: string, name: string}[]>([]);
  const [productsToAdd, setProductsToAdd] = useState<{id: string, name: string}[]>([]);
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [materialsToAdd, setMaterialsToAdd] = useState<Materials[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'products' | 'attributes' | 'materials' | undefined>(undefined);
  const {mutateGraphQL: createSupplier} = useGraphQLMutation('CREATE_SUPPLIER');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
  const {mutateGraphQL: createMaterialSupplier} = useGraphQLMutation('CREATE_MATERIAL_SUPPLIER');
  const {mutateGraphQL: updateProduct} = useGraphQLMutation('UPDATE_PRODUCT');

  const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES');

  const productsQuery = useGraphQLSWR<{
    products: {id: string, name: string}[];
  }>(orgId ? 'GET_ALL_PRODUCTS' : null, {
    filter: {
      organization: {
        id: orgId,
      },
    },
  });

  const materialsQuery = useGraphQLSWR<{
    materials: Materials[];
  }>(orgId ? 'GET_ALL_MATERIALS_FOR_ORG' : null, {
    filter: {
      organization: {
        id: orgId,
      },
    },
  });

  useEffect(() => {
    setSaveButtonDisabled(!isFormValid(supplierState.name, tier));
  }, [supplierState, tier]);

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
    if (productsQuery.data) {
      if (has(productsQuery.data, 'errors')) {
        setProducts([]);
      } else {
        const products = get(productsQuery.data, 'data.products', []);
        setProducts(products);
      }
    }
  }, [productsQuery.data]);

  useEffect(() => {
    if (materialsQuery.data) {
      if (has(materialsQuery.data, 'errors')) {
        setMaterials([]);
      } else {
        const materials = get(materialsQuery.data, 'data.materials', []);
        setMaterials(materials);
      }
    }
  }, [materialsQuery.data]);

  useEffect(() => {
    if (tier.value === '1') {
      setMaterialsToAdd([]);
    } else if(tier.value === '2') {
      setProductsToAdd([]);
    }
  }, [tier]);

  const tierOptions: InputOption[] = [
    {
      id: 1,
      name: 'Tier 1',
      value: '1',
    },
    {
      id: 2,
      name: 'Tier 2',
      value: '2',
    },
  ]

  const onSaveButtonClick = async () => {
    setSaveButtonLoading(true);
    try {
      const supplier = {
        name: supplierState.name,
        addressLine1: supplierState.address_line_1,
        addressLine2: supplierState.address_line_2,
        city: supplierState.city,
        stateProvince: supplierState.state,
        postalCode: supplierState.postal_code,
        country: supplierState.country,
        supplierTier: parseInt(tier.value),
      }
      const createSupplierResponse = await createSupplier({
        input: {
          organization: {
            id: orgId,
          },
          supplier: true,
          ...supplier,
        },
      })
      const supplierId = get(createSupplierResponse, 'data.createOrganizationFacility.id');
      if (supplierId) {
        if(attributesToAdd.length !== 0) {
          for (const attribute of attributesToAdd) {
            await createAttributeAssurance({
              input: {
                organization: {
                  id: orgId,
                },
                organizationFacility: {
                  id: supplierId,
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

        if(productsToAdd.length !== 0 && tier.value === '1') {
          for (const product of productsToAdd) {
            await updateProduct({
              input: {
                id: product.id,
                organizationFacility: {
                  id: supplierId,
                }
              },
            });
          }
        }

        if(materialsToAdd.length !== 0 && tier.value === '2') {
          for (const material of materialsToAdd) {
            await createMaterialSupplier({
              input: {
                material: {
                  id: material.id,
                },
                organizationFacility: {
                  id: supplierId,
                },
              },
            });
          }
        }

        logBrowser('Supplier created with assurances successfully', 'error', {
          orgId,
          supplierId
        });
        addToastMessage({
          message: 'Supplier created successfully',
          type: ToastMessage.SUCCESS,
        })
        navigate('/suppliers');
      } else {
        logBrowser(
          'Error creating supplier', 'error', {
            orgId,
            response: createSupplierResponse,
          },
          createSupplierResponse);
        addToastMessage({
          message: 'Error creating supplier',
          type: ToastMessage.FAILURE,
        })
      }
    } catch (e) {
      logBrowser(
        'Error creating supplier',
        'error', {
          orgId,
          error: e,
        },
        e
      );
      addToastMessage({
        message: 'Error creating supplier',
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

  const getEntities = (createModalType: string) => {
    if (createModalType === 'products') {
      return products.filter(product => {
        return !some(productsToAdd, { id: product.id, name: product.name });
      });
    } else if (createModalType === 'materials') {
      return materials.filter(material => {
        return !some(materialsToAdd, { id: material.id, name: material.name });
      })
    } else {
      return attributes.filter(attribute => {
        return !some(attributesToAdd, { id: attribute.id, name: attribute.name });
      });
    }
  }

  return (
		<MainContent
			title={'Create New Supplier'}
			breadcrumbs={[
				{
					label: 'Suppliers',
					href: '/suppliers',
				},
				{
					label: 'Create New',
				},
			]}
			className={'w-full'}
			headerElement={pageButtons()}
      isLoading={allSustainabilityAttributes.isLoading || productsQuery.isLoading || materialsQuery.isLoading}
    >
			<div className={'flex flex-row gap-[40px] w-full'}>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
					<div className={'flex flex-col gap-[8px] w-full'}>
						<div className={'text-eyebrow'}>Name</div>
						<Input
							input_props={{
								name: 'name',
								value: supplierState.name,
								onChange: e => {
                  setSupplierState({
                    ...supplierState,
                    name: e.target.value,
                  });
                },
								onValueChange: e => {
                  setSupplierState({
                    ...supplierState,
                    name: e,
                  });
                },
								className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
								placeholder: 'Name',
							}}
							container_classname={'w-full'}
						/>
					</div>
					<div className={'flex flex-col gap-[8px] w-full'}>
						<div className={'text-eyebrow'}>Tier 2 Supplier</div>
						<ComboBox options={[placeHolderOption, ...tierOptions]} value={tier} name={'tier 2 supplier'} onChange={option => setTier(option)} />
					</div>
          <div className={'w-full mt-[345px]'}>
            <AddProductOrMaterialsCreateSupplierCard
              tier={tier}
              productsToAdd={productsToAdd}
              setProductsToAdd={setProductsToAdd}
              materialsToAdd={materialsToAdd}
              setMaterialsToAdd={setMaterialsToAdd}
              setCreateModalType={setCreateModalType}
              />
          </div>
				</div>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
          <Input
            input_props={{
              name: 'address_line_1',
              value: supplierState.address_line_1,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  address_line_1: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  address_line_1: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: 'Address 1',
            }}
            container_classname={'w-full mt-[20px]'}
          />
          <Input
            input_props={{
              name: 'address_line_2',
              value: supplierState.address_line_2,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  address_line_2: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  address_line_2: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: 'Address 2',
            }}
            container_classname={'w-full mt-[20px]'}
          />
          <Input
            input_props={{
              name: 'city',
              value: supplierState.city,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  city: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  city: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: 'City',
            }}
            container_classname={'w-full mt-[20px]'}
          />
          <div className={'w-full flex flex-row gap-[16px]'}>
            <Input
              input_props={{
                name: 'state',
                value: supplierState.state,
                onChange: e => {
                  setSupplierState({
                    ...supplierState,
                    state: e.target.value,
                  });
                },
                onValueChange: e => {
                  setSupplierState({
                    ...supplierState,
                    state: e,
                  });
                },
                className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
                placeholder: 'State',
              }}
              container_classname={'w-full mt-[20px]'}
            />
            <Input
              input_props={{
                name: 'postal_code',
                value: supplierState.postal_code,
                onChange: e => {
                  setSupplierState({
                    ...supplierState,
                    postal_code: e.target.value,
                  });
                },
                onValueChange: e => {
                  setSupplierState({
                    ...supplierState,
                    postal_code: e,
                  });
                },
                className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
                placeholder: 'Zip',
              }}
              container_classname={'w-full mt-[20px]'}
            />
          </div>
          <Input
            input_props={{
              name: 'country',
              value: supplierState.country,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  country: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  country: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: 'Country',
            }}
            container_classname={'w-full mt-[20px]'}
          />
          <Card title={'Sustainability Attributes'} glow={true}>
						<BaseButton label={'Add'} iconLeft={IconNames.PlusIcon} variant={ButtonTypes.secondary} onClick={() => setCreateModalType('attributes')} />
						<CreateMaterialTable
							type={'attributes'}
							remove={id => {
								const newAttributes = attributesToAdd.filter(attr => attr.id !== id);
								setAttributesToAdd(newAttributes);
							}}
							entities={attributesToAdd}
						/>
					</Card>
				</div>
			</div>
			{createModalType !== undefined && (
				<AddToCreateMaterialModal
					show={true}
					onClose={() => {
						setCreateModalType(undefined);
					}}
					onAdd={(ids: string[]) => {
						if (createModalType === 'products') {
							const newProducts: { id: string; name: string }[] = [];
							ids.forEach(id => {
								const foundProduct = products.find(product => product.id === id);
								if (foundProduct) {
									newProducts.push(foundProduct);
								}
							});
							setProductsToAdd([...productsToAdd, ...newProducts]);
						} else if(createModalType === 'attributes') {
							const newAttributes: Claims[] = [];
							ids.forEach(id => {
								const foundAttribute = attributes.find(attr => attr.id === id);
								if (foundAttribute) {
									newAttributes.push(foundAttribute);
								}
							});
							setAttributesToAdd([...attributesToAdd, ...newAttributes]);
						} else {
              const newMaterials: Materials[] = [];
              ids.forEach(id => {
                const foundMaterial = materials.find(material => material.id === id);
                if (foundMaterial) {
                  newMaterials.push(foundMaterial);
                }
              });
              setMaterialsToAdd([...materialsToAdd, ...newMaterials]);
            }
						setCreateModalType(undefined);
					}}
					type={createModalType}
          entities={getEntities(createModalType)}
				/>
			)}
			<Modal
				show={showCancelModal}
				setShowModal={setShowCancelModal}
				header={{
					title: 'Cancel without saving?',
					cardProps: {
						className: 'relative p-6',
					},
				}}
				body={<div>All progress made on creating this supplier will be lost.</div>}
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
							navigate('/suppliers');
						},
						variant: ButtonTypes.warning,
					},
				}}
				modalProps={{
					style: {},
				}}
			/>
		</MainContent>
	);
}
