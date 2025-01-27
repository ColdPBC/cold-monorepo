import { BaseButton, ColdIcon, ComboBox, ErrorFallback, Input, Spinner } from '@coldpbc/components';
import { IconNames, InputTypes, UnitOfMeasurement } from '@coldpbc/enums';
import { get, isEqual, toArray } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useAddToastMessage, useColdContext, useGraphQLMutation } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';
import { InputOption, ToastMessage } from '@coldpbc/interfaces';
import { useNavigate } from 'react-router-dom';

interface ProductMaterialBOMState {
  id: string;
  yield: number | null;
  unitOfMeasure: string | null;
  weight: number | null;
}

interface ProductBOMTabSidebarProps {
  productId: string;
  closeSidebar: () => void;
  refresh: () => void;
  material: {
    id: string;
    name: string;
    productMaterial: {
      id: string;
      yield: number | null;
      unitOfMeasure: string | null;
      weight: number | null;
    };
  };
}

const _ProductBOMTabSidebar = (
  {
    productId,
    closeSidebar,
    refresh,
    material
  }: ProductBOMTabSidebarProps) => {
  const {logBrowser} = useColdContext();
  const {addToastMessage} = useAddToastMessage()
  const navigate = useNavigate();
  const [saveDisabled, setSaveDisabled] = React.useState<boolean>(false);
  const [saveButtonLoading, setSaveButtonLoading] = React.useState<boolean>(false);
  const [productMaterialState, setProductMaterialState] = React.useState<ProductMaterialBOMState>({
    id: '',
    yield: null,
    unitOfMeasure: null,
    weight: null,
  })

  const placeholderOption = {
    id: -1,
    name: 'None',
    value: '',
  };

  const uomOptions: InputOption[] = toArray(UnitOfMeasurement).map((uom, index) => ({
    id: index,
    name: uom,
    value: uom,
  }));

  const getInitialMaterialState = useCallback(() => {
    let initialState: ProductMaterialBOMState = {
      id: '',
      yield: null,
      unitOfMeasure: null,
      weight: null,
    }
    if(material) {
      initialState = {
        ...material.productMaterial,
        weight: material.productMaterial.weight ? material.productMaterial.weight * 1000 : null,
      }
    }
    return initialState
  }, [material])

  const isFormEdited = (productMaterialState: ProductMaterialBOMState) => {
    const initialState = getInitialMaterialState();
    return !isEqual(initialState, productMaterialState);
  }

  const getYieldError = (productMaterialState: ProductMaterialBOMState) => {
    // if they select a UOM, yield must be not be null
    // if they select pcs as UOM, yield must be a whole number
    if(productMaterialState.unitOfMeasure && productMaterialState.yield === null) {
      return 'Yield is required';
    } else if(productMaterialState.unitOfMeasure === UnitOfMeasurement.pcs && productMaterialState.yield !== null && !Number.isInteger(productMaterialState.yield)) {
      return 'Yield must be a whole number';
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    const initialState = getInitialMaterialState();
    setProductMaterialState(initialState);
  }, [material]);

  useEffect(() => {
    const yieldError = getYieldError(productMaterialState);
    const newErrors = {
      ...errors,
      yield: yieldError
    };
    setErrors(newErrors);

    setSaveDisabled(
      !isFormEdited(productMaterialState) ||
      Object.values(newErrors).some(error => error !== undefined)
    );
  }, [productMaterialState]);

  const [errors, setErrors] = React.useState<Partial<Record<keyof ProductMaterialBOMState, string>>>({});

  const {mutateGraphQL: updateProductMaterial} = useGraphQLMutation('UPDATE_PRODUCT_MATERIAL');

  const onSave = async () => {
    try {
      setSaveButtonLoading(true);
      await updateProductMaterial({
        input: {
          id: productMaterialState.id,
          yield: productMaterialState.yield,
          unitOfMeasure: productMaterialState.unitOfMeasure,
          weight: productMaterialState.weight ? productMaterialState.weight / 1000 : null,
        },
      })
      addToastMessage({
        message: 'Material updated successfully',
        type: ToastMessage.SUCCESS
      });
      logBrowser('Material updated successfully', 'info' , {
        productId,
        material,
        state: productMaterialState,
        uomOptions,
      });
      refresh()
    } catch (error) {
      addToastMessage({
        message: 'Error updating product material',
        type: ToastMessage.FAILURE
      })
      logBrowser('Error updating product material', 'error', {
        error,
        productMaterialState,
        productId,
        material,
      }, error);
    } finally {
      setSaveButtonLoading(false);
    }
  }

  logBrowser('Product BOM Sidebar', 'info', {
    productMaterialState,
    productId,
    material,
    uomOptions: [placeholderOption, ...uomOptions],
  });

  return (
    <div
      className={'flex flex-col h-screen fixed top-0 right-0 bottom-0 overflow-y-scroll text-tc-primary bg-bgc-elevated z-20'}
      style={{
        width: material ? '588px' : '0px',
        minWidth: material ? '588px' : '0px',
        transition: 'width 0.3s',
        boxShadow: material ? '0px 8px 32px 8px rgba(0, 0, 0, 0.70)' : 'none',
        padding: material ? '40px' : '0px',
      }}>
      {material ? (
        <div className={'w-full h-full flex flex-col gap-[40px]'}>
          <div className={'w-full flex flex-row mb-[16px] gap-[16px] justify-between items-start'}>
            <div className={'cursor-pointer w-[16px] mt-[4px]'} onClick={() => closeSidebar()}>
              <ColdIcon name={IconNames.CloseModalIcon} width={16} height={16} />
            </div>
            <span className={'w-full text-h5 text-wrap break-all'}>Edit Material</span>
            <BaseButton
              onClick={onSave}
              label={'Save'}
              disabled={saveDisabled || saveButtonLoading}
              loading={saveButtonLoading}
              data-testid={'save_button'}
            />
          </div>
          <div className={'flex-1 overflow-y-auto pb-20'}>
            <div className={'w-full flex flex-col gap-[40px]'}>
              <div className={'flex flex-row gap-[4px] cursor-pointer'} onClick={() => {
                navigate(`/materials/${material.id}`)
              }}>
                <div className={'text-body font-bold hover:underline'}>
                  {material.name}
                </div>
                <ColdIcon
                  name={IconNames.ColdRightArrowIcon}
                  width={16}
                  height={16}
                  // rotate counter-clockwise to point to the right top corner
                  className={'-rotate-45'}
                />
              </div>
              {
                /* BOM Yield Details */
              }
              <div className={'w-full flex flex-col gap-[8px]'}>
                <div className={'w-full pb-[8px] pt-[16px] text-h4'}>
                  BOM Yield Details
                </div>

                <div className={'w-full flex flex-row gap-[16px] justify-between'}>
                  <Input
                    type={InputTypes.Number}
                    input_label={'Yield'}
                    input_label_props={{
                      className: 'text-eyebrow',
                    }}
                    numeric_input_props={{
                      name: 'yield',
                      value: productMaterialState.yield || '',
                      thousandSeparator: ',',
                      onValueChange: values => {
                        setProductMaterialState(prev => {
                          return {
                            ...prev,
                            yield: values.floatValue ? values.floatValue : null,
                          };
                        });
                      },
                      className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
                      showError: true,
                      error: errors.yield,
                    }}
                    container_classname={'w-1/2'}
                  />
                  <div className={'flex flex-col w-1/2 mb-[20px]'}>
                    <div className={'text-eyebrow leading-6'}>Yield UOM</div>
                    <ComboBox
                      options={[placeholderOption, ...uomOptions]}
                      value={uomOptions.find(option => option.value === productMaterialState.unitOfMeasure) || placeholderOption}
                      name={'uom'}
                      onChange={(selectedOption) => {
                        setProductMaterialState(prev => {
                          return {
                            ...prev,
                            unitOfMeasure: selectedOption.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>

                <div className={'w-full flex flex-row'}>
                  <Input
                    type={InputTypes.Number}
                    input_label={'Weight'}
                    input_label_props={{
                      className: 'text-eyebrow',
                    }}
                    numeric_input_props={{
                      name: 'weight',
                      value: productMaterialState.weight || '',
                      thousandSeparator: '',
                      onValueChange: values => {
                        setProductMaterialState(prev => {
                          return {
                            ...prev,
                            weight: values.floatValue ? values.floatValue : null,
                          };
                        });
                      },
                      className: 'text-body self-stretch p-4 rounded-l-[8px] rounded-r-none border-y-[1.5px] border-l-[1.5px] border-r-0 border-gray-90 w-full focus:border-y-[1.5px] focus:border-l-[1.5px] focus:border-r-0 focus:border-gray-90 focus:ring-0',
                      showError: true,
                    }}
                    container_classname={'w-full'}
                  />
                  <div className={'text-body font-bold text-tc-disabled p-4 rounded-r-[8px] border-y-[1.5px] border-r-[1.5px] border-l-0 border-gray-90 w-auto mt-[24px] self-start'}>
                    grams
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) :
        null
      }
    </div>
  );
}

export const ProductBOMTabSidebar = withErrorBoundary(_ProductBOMTabSidebar, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductBOMTabSidebar: ', error);
  },
});
