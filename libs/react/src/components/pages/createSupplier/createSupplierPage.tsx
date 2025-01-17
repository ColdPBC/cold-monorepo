import {
  useAddToastMessage,
  useAuth0Wrapper,
  useColdContext,
  useEntityData,
  useGraphQLMutation,
  useGraphQLSWR,
} from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { Claims, InputOption, ToastMessage } from '@coldpbc/interfaces';
import React, { useEffect, useMemo, useState } from 'react';
import { get, has, some } from 'lodash';
import {
  AddToCreateEntityModal,
  BaseButton,
  Card,
  ComboBox,
  CreateEntityTable,
  ErrorFallback,
  Input,
  MainContent,
  Modal,
  Spinner,
} from '@coldpbc/components';
import { ButtonTypes, EntityLevel, IconNames } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

interface SupplierCreate {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  category: string;
  subcategory: string;
  brandFacilityId: string;
  supplierTier: number;
}

const _CreateSupplierPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Select yes or no',
    value: 'none',
  };

  const [supplierState, setSupplierState] = useState<SupplierCreate>({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    category: '',
    subcategory: '',
    brandFacilityId: '',
    supplierTier: 0,
  });

  const [hasProducts, setHasProducts] = useState<InputOption>(placeHolderOption);
  const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'attributes' | undefined>(undefined);
  const [errors, setErrors] = useState<Partial<Record<keyof SupplierCreate, string>>>({});

  const {mutateGraphQL: createSupplier} = useGraphQLMutation('CREATE_SUPPLIER');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');

  const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES', {
    filter: {
      level: 'SUPPLIER'
    }
  });

  const otherSuppliers = useEntityData(EntityLevel.SUPPLIER, orgId);

  const validateName = (
    name: string,
    otherSuppliers: {
      id: string;
      name: string;
    }[]
  ) => {
    if(name.trim() === '') {
      return 'Supplier name is required';
    } else if(otherSuppliers.some((supplier) => supplier.name === name)) {
      return 'Supplier name already exists';
    } else {
      return undefined;
    }
  }

  const validateTier = (tier: number) => {
    if(tier === 0) {
      return 'Supplier tier is required';
    } else {
      return undefined;
    }
  }

  const getTier = (hasProducts: InputOption) => {
    switch(hasProducts.value) {
      case 'yes':
        return 1;
      case 'no':
        return 2;
      default:
        return 0;
    }
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error !== null && error !== undefined);
    const isFormValid = () => {
      const isNameValid = validateName(supplierState.name, otherSuppliers);
      const isTierValid = validateTier(supplierState.supplierTier);
      return isNameValid === undefined && isTierValid === undefined
    }
    setSaveButtonDisabled(hasErrors || !isFormValid());
  }, [errors, supplierState, hasProducts, otherSuppliers]);

  const attributes = useMemo(() => {
    if (allSustainabilityAttributes.data) {
      if (has(allSustainabilityAttributes.data, 'errors')) {
        return [];
      } else {
        return get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', []);
      }
    }
    return [];
  }, [allSustainabilityAttributes.data]);

  if (allSustainabilityAttributes.isLoading) {
    return <Spinner />;
  }

  const onSaveButtonClick = async () => {
    setSaveButtonLoading(true);
    try {
      const createSupplierResponse = await createSupplier({
        input: {
          organization: {
            id: orgId,
          },
          supplier: true,
          ...supplierState,
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
        logBrowser('Supplier created with assurances successfully', 'info', {
          orgId,
          supplierId
        });
        addToastMessage({
          message: 'Supplier created successfully',
          type: ToastMessage.SUCCESS,
        })
        navigate(`/suppliers/${supplierId}`);
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
          data-testid={'save_button'}
        />
      </div>
    )
  }

  const getEntities = () => {
    return attributes.filter(attribute => {
      return !some(attributesToAdd, { id: attribute.id, name: attribute.name });
    });
  }

  const yesNoOptions = [
    placeHolderOption,
    {
      id: 1,
      name: 'Yes',
      value: 'yes',
    },
    {
      id: 2,
      name: 'No',
      value: 'no',
    },
  ]

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
			isLoading={allSustainabilityAttributes.isLoading}>
			<div className={'flex flex-row gap-[24px] w-full mb-[80px]'}>
        <Card className={'flex flex-col w-1/2 gap-[32px]'} title={'Details'} glow={false}>
          <Input
            input_props={{
              name: 'name',
              value: supplierState.name,
              onChange: e => {
                const error = validateName(e.target.value, otherSuppliers);
                setSupplierState({
                  ...supplierState,
                  name: e.target.value,
                });
                setErrors((prev) => {
                  return {
                    ...prev,
                    name: error,
                  }
                })
              },
              onValueChange: e => {
                const error = validateName(e, otherSuppliers);
                setSupplierState({
                  ...supplierState,
                  name: e,
                });
                setErrors((prev) => {
                  return {
                    ...prev,
                    name: error,
                  }
                })
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              error: errors.name,
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Name *'}
          />
          <div className={'flex flex-col w-full'}>
            <div className={'text-eyebrow leading-6'}>Does this entity create finished products? *</div>
            <ComboBox
              options={yesNoOptions}
              value={hasProducts}
              name={'hasProducts'}
              onChange={option => {
                setHasProducts(option);
                setSupplierState((prev) => {
                  return {
                    ...prev,
                    supplierTier: getTier(option),
                  }
                })
                const error = validateTier(getTier(option));
                setErrors((prev) => {
                  return {
                    ...prev,
                    supplierTier: error,
                  }
                })
              }}
              buttonClassName={errors.supplierTier ? 'border-red-100' : ''}
            />
            {
              errors.supplierTier ? (
                <div className="text-red-100 text-eyebrow mt-[8px]" data-testid={`error_supplierTier`}>
                  {errors.supplierTier}
                </div>
              ) : (
                <div className={'h-5'} data-testid={`error_space_supplierTier`}>
                </div>
              )
            }
          </div>
          <Input
            input_props={{
              name: 'addressLine1',
              value: supplierState.addressLine1,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  addressLine1: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  addressLine1: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Address Line 1'}
          />
          <Input
            input_props={{
              name: 'addressLine2',
              value: supplierState.addressLine2,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  addressLine2: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  addressLine2: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Address Line 2'}
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
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'City'}
          />
          <Input
            input_props={{
              name: 'state',
              value: supplierState.stateProvince,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  stateProvince: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  stateProvince: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'State'}
          />
          <Input
            input_props={{
              name: 'postalCode',
              value: supplierState.postalCode,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  postalCode: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  postalCode: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Postal Code'}
          />
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
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Country'}
          />
          <Input
            input_props={{
              name: 'category',
              value: supplierState.category,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  category: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  category: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Category'}
          />
          <Input
            input_props={{
              name: 'subcategory',
              value: supplierState.subcategory,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  subcategory: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  subcategory: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Sub-Category'}
          />
          <Input
            input_props={{
              name: 'brandFacilityId',
              value: supplierState.brandFacilityId,
              onChange: e => {
                setSupplierState({
                  ...supplierState,
                  brandFacilityId: e.target.value,
                });
              },
              onValueChange: e => {
                setSupplierState({
                  ...supplierState,
                  brandFacilityId: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
              showError: true,
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Brand Supplier Id'}
          />
        </Card>
        <Card
          className={'flex flex-col w-1/2 gap-[32px] self-start'}
          title={'Sustainability Attributes'}
          glow={true}
          ctas={[
            {
              child: <BaseButton
                label={'Add'}
                iconLeft={IconNames.PlusIcon}
                variant={ButtonTypes.secondary}
                onClick={() => setCreateModalType('attributes')}
              />,
            }
          ]}
        >
          <CreateEntityTable
            type={'attributes'}
            remove={id => {
              const newAttributes = attributesToAdd.filter(attr => attr.id !== id);
              setAttributesToAdd(newAttributes);
            }}
            entities={attributesToAdd}
          />
        </Card>
			</div>
			{createModalType !== undefined && (
				<AddToCreateEntityModal
					show={true}
					onClose={() => {
						setCreateModalType(undefined);
					}}
					onAdd={(ids: string[]) => {
            const newAttributes: Claims[] = [];
            ids.forEach(id => {
              const foundAttribute = attributes.find(attr => attr.id === id);
              if (foundAttribute) {
                newAttributes.push(foundAttribute);
              }
            });
            setAttributesToAdd([...attributesToAdd, ...newAttributes]);
						setCreateModalType(undefined);
					}}
					type={createModalType}
					entities={getEntities()}
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

export const CreateSupplierPage = withErrorBoundary(_CreateSupplierPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in CreateSupplierPage: ', error);
  },
});
