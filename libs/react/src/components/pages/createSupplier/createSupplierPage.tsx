import {useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR} from "@coldpbc/hooks";
import {useNavigate} from "react-router-dom";
import {
  Claims,
  InputOption,
  ToastMessage
} from "@coldpbc/interfaces";
import React, {useEffect, useState} from "react";
import {get, has, some} from "lodash";
import {
  AddToCreateEntityModal,
  BaseButton,
  Card,
  ComboBox,
  CreateEntityTable, ErrorFallback,
  Input,
  MainContent, Modal,
} from "@coldpbc/components";
import {ButtonTypes, IconNames} from "@coldpbc/enums";
import {withErrorBoundary} from "react-error-boundary";

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

  const isFormValid = (state: SupplierCreate, tier: number, hasProducts: InputOption) => {
    return state.name.trim() !== '' && tier !== 0 && hasProducts.value !== 'none';
  }

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
  });

  const [tier, setTier] = useState< 0 | 1 | 2>(0);
  const [hasProducts, setHasProducts] = useState<InputOption>(placeHolderOption);
  const [attributes, setAttributes] = useState<Claims[]>([]);
  const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'attributes' | undefined>(undefined);
  const {mutateGraphQL: createSupplier} = useGraphQLMutation('CREATE_SUPPLIER');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');

  const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES', {
    filter: {
      level: 'SUPPLIER'
    }
  });

  useEffect(() => {
    setSaveButtonDisabled(!isFormValid(supplierState, tier, hasProducts));
  }, [supplierState, tier, hasProducts]);

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
    if (hasProducts.value === 'yes') {
      setTier(1);
    } else if (hasProducts.value === 'no') {
      setTier(2);
    } else {
      setTier(0);
    }
  }, [hasProducts]);

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
          supplierTier: tier
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
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Name *'}
          />
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>Does this entity create finished products? *</div>
            <ComboBox
              options={yesNoOptions}
              value={hasProducts}
              name={'hasProducts'}
              onChange={option => setHasProducts(option)}
            />
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
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Brand Supplier Id'}
          />
        </Card>
        <Card className={'flex flex-col w-1/2 self-start'} title={'Sustainability Attributes'} glow={true}>
          <BaseButton label={'Add'} iconLeft={IconNames.PlusIcon} variant={ButtonTypes.secondary}
                      onClick={() => setCreateModalType('attributes')} />
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
