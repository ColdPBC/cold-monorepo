import {BaseButton, Card, CreateMaterialTable, ErrorFallback} from "@coldpbc/components";
import {ButtonTypes, IconNames} from "@coldpbc/enums";
import React from "react";
import {InputOption, Materials} from "@coldpbc/interfaces";
import {withErrorBoundary} from "react-error-boundary";

const _AddProductOrMaterialsCreateSupplierCard = (props : {
  tier: InputOption;
  productsToAdd: {
    id: string;
    name: string;
  }[];
  setProductsToAdd: (products: { id: string; name: string; }[]) => void;
  materialsToAdd: Materials[];
  setMaterialsToAdd: (materials: Materials[]) => void;
  setCreateModalType: (type: 'products' | 'materials') => void;
}) => {
  const {tier, productsToAdd, setProductsToAdd, materialsToAdd, setMaterialsToAdd, setCreateModalType} = props;


  if(tier.value === '0'){
    return (
      <Card title={'Associated Entities'} glow={true} className={'text-tc-disabled'}>
        <p className={'text-tc-disabled'}>Select Supplier Tier to Enable.</p>
      </Card>
    )
  }

  const title = tier.value === '1' ? 'Products' : 'Materials';
  const createModalType = tier.value === '1' ? 'products' : 'materials';
  const entityToAdd = tier.value === '1' ? productsToAdd : materialsToAdd;
  return (
    <Card title={title} glow={true}>
      <BaseButton label={'Add'} iconLeft={IconNames.PlusIcon} variant={ButtonTypes.secondary} onClick={() => setCreateModalType(createModalType)} />
      <CreateMaterialTable
        type={createModalType}
        remove={id => {
          if (createModalType === 'materials') {
            setMaterialsToAdd(materialsToAdd.filter(material => material.id !== id));
          } else {
            setProductsToAdd(productsToAdd.filter(product => product.id !== id));
          }
        }}
        entities={entityToAdd}
      />
    </Card>
  )
}

export const AddProductOrMaterialsCreateSupplierCard = withErrorBoundary(_AddProductOrMaterialsCreateSupplierCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in AddProductOrMaterialsCreateSupplierCard: ', error);
  },
});
