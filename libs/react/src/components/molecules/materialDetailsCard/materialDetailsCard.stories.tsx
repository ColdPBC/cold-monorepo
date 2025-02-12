import { Meta, StoryObj } from '@storybook/react';

import { MaterialDetailsCard } from '@coldpbc/components';
import { getMaterialMock } from '@coldpbc/mocks';
import { WeightFactorUnits } from '@coldpbc/enums';

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

export const OverrideWeightFactor: Story = {
  args: {
    material: {
      ...getMaterialMock,
      weightFactor: 200,
      weightFactorUnitOfMeasure: WeightFactorUnits.KG_PER_PCS,
    },
  },
};
