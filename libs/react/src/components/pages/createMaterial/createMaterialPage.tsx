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

const _CreateMaterialPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
	const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Tier 2 Supplier',
    value: '-1',
  };

  const isFormValid = (name: string) => {
    return name !== '';
  }

  const [name, setName] = useState('');
	const [supplier, setSupplier] = useState<InputOption>(placeHolderOption);
	const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
	const [attributes, setAttributes] = useState<Claims[]>([]);
	const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [products, setProducts] = useState<{id: string, name: string}[]>([]);
  const [productsToAdd, setProductsToAdd] = useState<{id: string, name: string}[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'products' | 'attributes' | undefined>(undefined);
  const {mutateGraphQL: createMaterial} = useGraphQLMutation('CREATE_MATERIAL');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
  const {mutateGraphQL: createMaterialSupplier} = useGraphQLMutation('CREATE_MATERIAL_SUPPLIER');
  const {mutateGraphQL: createProductMaterial} = useGraphQLMutation('CREATE_PRODUCT_MATERIAL');

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

  const productsQuery = useGraphQLSWR<{
    products: {id: string, name: string}[];
  }>(orgId ? 'GET_ALL_PRODUCTS' : null, {
    filter: {
      organization: {
        id: orgId,
      },
    },
  });

  useEffect(() => {
    setSaveButtonDisabled(!isFormValid(name));
  }, [name]);

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
    if (productsQuery.data) {
      if (has(productsQuery.data, 'errors')) {
        setProducts([]);
      } else {
        const products = get(productsQuery.data, 'data.products', []);
        setProducts(products);
      }
    }
  }, [productsQuery.data]);

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
      const createMaterialResponse = await createMaterial({
        input: {
          name: name,
          organization: {
            id: orgId,
          },
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

        if(productsToAdd.length !== 0) {
          for (const product of productsToAdd) {
            await createProductMaterial({
              input: {
                product: {
                  id: product.id,
                },
                material: {
                  id: materialId,
                },
								organization: {
									id: orgId,
								},
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

  const getEntities = (createModalType: string) => {
    if (createModalType === 'products') {
      return products.filter(product => {
        return !some(productsToAdd, { id: product.id, name: product.name });
      });
    } else {
      return attributes.filter(attribute => {
        return !some(attributesToAdd, { id: attribute.id, name: attribute.name });
      });
    }
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
			<div className={'flex flex-row gap-[40px] w-full'}>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>
              Name
            </div>
					<Input
						input_props={{
							name: 'name',
							value: name,
							onChange: e => setName(e.target.value),
							onValueChange: e => setName(e),
							className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
							placeholder: 'Name',
						}}
            container_classname={'w-full'}
					/>
          </div>
          <Card title={'Products'} glow={true}>
            <BaseButton
              label={'Add'}
              iconLeft={IconNames.PlusIcon}
              variant={ButtonTypes.secondary}
              onClick={() => setCreateModalType('products')}
            />
            <CreateEntityTable
              type={'products'}
              remove={(id) => {
                const newProducts = productsToAdd.filter((product) => product.id !== id);
                setProductsToAdd(newProducts);
              }}
              entities={productsToAdd}
            />
          </Card>
				</div>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>
              Tier 2 Supplier
            </div>
            <ComboBox options={[placeHolderOption, ...supplierOptions]} value={supplier} name={'tier 2 supplier'} onChange={option => setSupplier(option)} />
          </div>
					<Card title={'Sustainability Attributes'} glow={true}>
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
			</div>
      {
        createModalType !== undefined && (
          <AddToCreateEntityModal
            show={true}
            onClose={() => {
              setCreateModalType(undefined);
            }}
            onAdd={(ids: string[]) => {
              if(createModalType === 'products') {
                const newProducts: {id: string, name: string}[] = [];
                ids.forEach((id) => {
                  const foundProduct = products.find((product) => product.id === id);
                  if(foundProduct) {
                    newProducts.push(foundProduct);
                  }
                });
                setProductsToAdd([
                  ...productsToAdd,
                  ...newProducts,
                ]);
              } else {
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
              }
              setCreateModalType(undefined);
            }}
            type={createModalType}
            entities={getEntities(createModalType)}
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
