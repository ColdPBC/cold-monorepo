import { Meta, StoryObj } from '@storybook/react';

import { ProductDetailsCard } from '@coldpbc/components';
import { getProductsMockById } from '@coldpbc/mocks';

const meta: Meta<typeof ProductDetailsCard> = {
	title: 'Molecules/ProductDetailsCard',
	component: ProductDetailsCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		product: {
			id: 'abc',
			name: 'Men’s Helium Rain Jacket',
			description:
				'The Helium Rain Jacket is an ultra-packable, lightweight, breathable, multi-use award winner, offering durable weather protection when the forecast calls for on-and-off-again sun, showers, clouds, and cool breezes.',
			organizationFacility: {
				id: '123',
				name: 'Youngone - KSL',
				attributeAssurances: [],
			},
			seasonCode: 'Fall 2024',
			upcCode: '275386',
			productCategory: 'Outerwear',
			productSubcategory: 'Hardshell Tops',
			brandProductId: null,
			supplierProductId: null,
			attributeAssurances: [],
			productMaterials: [],
			metadata: null,
		},
	},
};
