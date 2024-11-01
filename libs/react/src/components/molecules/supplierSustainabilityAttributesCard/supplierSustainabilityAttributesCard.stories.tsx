import { Meta, StoryObj } from '@storybook/react';

import { SupplierSustainabilityAttributesCard } from '@coldpbc/components';
import { getSupplierMock } from '@coldpbc/mocks';

const meta: Meta<typeof SupplierSustainabilityAttributesCard> = {
	title: 'Molecules/SupplierSustainabilityAttributesCard',
	component: SupplierSustainabilityAttributesCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		supplier: getSupplierMock(1),
	},
};

export const NoAssurances: Story = {
	args: {
		supplier: {
			...getSupplierMock(1),
			attributeAssurances: [],
		},
	},
};

export const Tier2Supplier: Story = {
	args: {
		supplier: getSupplierMock(2),
	},
};

export const Tier2SupplierWithOnlyMaterialAttributeAssurances: Story = {
	args: {
		supplier: {
			...getSupplierMock(2),
			attributeAssurances: [],
		},
	},
};
