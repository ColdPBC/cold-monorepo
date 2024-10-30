import { Meta, StoryObj } from '@storybook/react';

import { SupplierDetailsCard } from '@coldpbc/components';

const meta: Meta<typeof SupplierDetailsCard> = {
	title: 'Molecules/SupplierDetailsCard',
	component: SupplierDetailsCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		supplier: {
			id: 'supplier_1',
			name: 'Supplier 1',
      supplierTier: 1,
			addressLine1: '729 N Washington Ave',
			addressLine2: '6th Floor',
			city: 'Minneapolis',
			stateProvince: 'MN',
      postalCode: '55401',
			country: 'USA',
			attributeAssurances: [],
			materialSuppliers: [],
		},
	},
};
