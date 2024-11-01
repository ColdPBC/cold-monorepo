import { Meta, StoryObj } from '@storybook/react';

import { MaterialSustainabilityAttributesCard } from '@coldpbc/components';
import { getMaterialMock } from '@coldpbc/mocks';

const meta: Meta<typeof MaterialSustainabilityAttributesCard> = {
	title: 'Molecules/MaterialSustainabilityAttributesCard',
	component: MaterialSustainabilityAttributesCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		material: getMaterialMock,
    setShowUpdateAttributesModal: () => {},
	},
};

export const NoAssurances: Story = {
	args: {
		material: {
			...getMaterialMock,
			attributeAssurances: [],
		},
    setShowUpdateAttributesModal: () => {},
	},
};
