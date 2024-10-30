import { Meta, StoryObj } from '@storybook/react';

import { MaterialDetailsCard } from '@coldpbc/components';

const meta: Meta<typeof MaterialDetailsCard> = {
	title: 'Molecules/MaterialDetailsCard',
	component: MaterialDetailsCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		material: {
			id: 'material_1',
			name: 'Organic Wool',
			materialSuppliers: [
				{
					id: 'material_supplier_1',
					organizationFacility: {
						id: 'tier_2_supplier_1',
						name: 'Wool Factory',
						country: 'New Zealand',
					},
				},
			],
			materialCategory: 'Fabrics',
			materialSubcategory: 'Wools',
			attributeAssurances: [],
		},
	},
};
