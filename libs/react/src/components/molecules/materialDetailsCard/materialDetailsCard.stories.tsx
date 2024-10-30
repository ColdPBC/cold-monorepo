import { Meta, StoryObj } from '@storybook/react';

import { MaterialDetailsCard } from '@coldpbc/components';
import { getMaterialMock } from '@coldpbc/mocks';

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
		material: getMaterialMock,
	},
};
