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

interface ProductCreate {
  name: string;
  description: string;
  seasonCode: string;
  upcCode: string;
  productCategory: string;
  productSubcategory: string;
  brandProductId: string;
  supplierProductId: string;
}

const _CreateProductPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();

  const isFormValid = (productState: ProductCreate) => {
    return productState.name.trim() !== '';
  }

  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Select one',
    value: '-1',
  };

  const [productState, setProductState] = useState<ProductCreate>({
    name: '',
    description: '',
    seasonCode: '',
    upcCode: '',
    productCategory: '',
    productSubcategory: '',
    brandProductId: '',
    supplierProductId: '',
  });

  const [supplier, setSupplier] = useState<InputOption>(placeHolderOption);
  const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
  const [attributes, setAttributes] = useState<Claims[]>([]);
  const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [createModalType, setCreateModalType] = useState<'attributes' | undefined>(undefined);
  const {mutateGraphQL: createProduct} = useGraphQLMutation('CREATE_PRODUCT');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');

  const suppliersQuery = useGraphQLSWR<{
    organizationFacilities: SuppliersWithAssurances[];
  }>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
    filter: {
      organization: {
        id: orgId,
      },
      supplier: true,
      supplierTier: 1,
    },
  });

  const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES', {
    filter: {
      level: 'PRODUCT'
    }
  });

  useEffect(() => {
    setSaveButtonDisabled(!isFormValid(productState));
  }, [productState]);

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
      const hasSupplier = supplier.id !== -1;
      const createProductResponse = await createProduct({
        input: {
          ...productState,
          organization: {
            id: orgId,
          },
          organizationFacility: hasSupplier && {
            id: supplier.value,
          }
        },
      })
      const productId = get(createProductResponse, 'data.createProduct.id');
      if (productId) {
        if(attributesToAdd.length !== 0) {
          for (const attribute of attributesToAdd) {
            await createAttributeAssurance({
              input: {
                organization: {
                  id: orgId,
                },
                product: {
                  id: productId,
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

        logBrowser('Product created with assurances successfully', 'info', {
          orgId,
          productId,
        });
        await addToastMessage({
          message: 'Product created successfully',
          type: ToastMessage.SUCCESS,
        })

        navigate(`/products/${productId}`);
      } else {
        logBrowser('Error creating product', 'error', {
          orgId,
          response: createProductResponse,
        });
        await addToastMessage({
          message: 'Error creating product',
          type: ToastMessage.FAILURE,
        })
      }
    } catch (e) {
      logBrowser('Error creating product', 'error', {
        orgId,
        error: e,
      });
      addToastMessage({
        message: 'Error creating product',
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
      title={'Create New Product'}
      breadcrumbs={[
        {
          label: 'Products',
          href: '/products',
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
              value: productState.name,
              onChange: e => {
                setProductState({
                  ...productState,
                  name: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
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
              value: productState.description,
              onChange: e => {
                setProductState({
                  ...productState,
                  description: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
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
            <div className={'text-eyebrow'}>Tier 1 Supplier</div>
            <ComboBox
              options={[placeHolderOption, ...supplierOptions]}
              value={supplier}
              name={'supplier'}
              onChange={option => setSupplier(option)}
            />
          </div>
          <Input
            input_props={{
              name: 'seasonCode',
              value: productState.seasonCode,
              onChange: e => {
                setProductState({
                  ...productState,
                  seasonCode: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  seasonCode: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Season'}
          />
          <Input
            input_props={{
              name: 'upcCode',
              value: productState.upcCode,
              onChange: e => {
                setProductState({
                  ...productState,
                  upcCode: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  upcCode: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'UPC'}
          />
          <Input
            input_props={{
              name: 'productCategory',
              value: productState.productCategory,
              onChange: e => {
                setProductState({
                  ...productState,
                  productCategory: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  productCategory: e,
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
              name: 'productSubcategory',
              value: productState.productSubcategory,
              onChange: e => {
                setProductState({
                  ...productState,
                  productSubcategory: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  productSubcategory: e,
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
              name: 'brandProductId',
              value: productState.brandProductId,
              onChange: e => {
                setProductState({
                  ...productState,
                  brandProductId: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  brandProductId: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Brand Product Id'}
          />
          <Input
            input_props={{
              name: 'supplierProductId',
              value: productState.supplierProductId,
              onChange: e => {
                setProductState({
                  ...productState,
                  supplierProductId: e.target.value,
                });
              },
              onValueChange: e => {
                setProductState({
                  ...productState,
                  supplierProductId: e,
                });
              },
              className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
              placeholder: '',
            }}
            container_classname={'w-full'}
            input_label_props={{
              className: 'text-eyebrow',
            }}
            input_label={'Supplier Product Id'}
          />
        </Card>
        <Card
          className={'flex-col w-1/2 gap-[32px] self-start'}
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
        body={<div>All progress made on creating this product will be lost.</div>}
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
              navigate('/products');
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

export const CreateProductPage = withErrorBoundary(_CreateProductPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
