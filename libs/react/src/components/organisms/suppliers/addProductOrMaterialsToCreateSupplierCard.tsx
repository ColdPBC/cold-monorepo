import { BaseButton, Card, CreateEntityTable, ErrorFallback } from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import React from 'react';
import { InputOption, Materials } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { Products } from '../../../interfaces/products';

const _AddProductOrMaterialsToCreateSupplierCard = (props: {
	tier: InputOption;
	productsToAdd: Products[];
	setProductsToAdd: (products: Products[]) => void;
	materialsToAdd: Materials[];
	setMaterialsToAdd: (materials: Materials[]) => void;
	setCreateModalType: (type: 'products' | 'materials' | 'attributes') => void;
}) => {
	const { tier, productsToAdd, setProductsToAdd, materialsToAdd, setMaterialsToAdd, setCreateModalType } = props;

	if (tier.value === '0') {
		return (
			<Card title={'Associated Entities'} glow={true} className={'text-tc-disabled'}>
				<p className={'text-tc-disabled'}>Select Supplier Tier to Enable.</p>
			</Card>
		);
	}
	let title = '';
	let createModalType: 'products' | 'materials' | 'attributes' = 'products';
	let entityToAdd: any[] = [];
	switch (tier.value) {
		case '1':
			title = 'Products';
			createModalType = 'products';
			entityToAdd = productsToAdd;
			break;
		default:
		case '2':
			title = 'Materials';
			createModalType = 'materials';
			entityToAdd = materialsToAdd;
			break;
	}

	return (
		<Card title={title} glow={true}>
			<BaseButton label={'Add'} iconLeft={IconNames.PlusIcon} variant={ButtonTypes.secondary} onClick={() => setCreateModalType(createModalType)} />
			<CreateEntityTable
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
	);
};

export const AddProductOrMaterialsToCreateSupplierCard = withErrorBoundary(_AddProductOrMaterialsToCreateSupplierCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in AddProductOrMaterialsToCreateSupplierCard: ', error);
	},
});
