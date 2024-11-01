import { Meta, StoryObj } from '@storybook/react';

import { SupplierDetailsCard } from '@coldpbc/components';
import { getSupplierMock } from '@coldpbc/mocks';

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
		supplier: getSupplierMock(1),
	},
};
