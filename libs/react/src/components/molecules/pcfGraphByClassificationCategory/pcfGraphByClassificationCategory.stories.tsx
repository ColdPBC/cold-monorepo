import { Meta, StoryObj } from '@storybook/react';
import { PcfGraphByClassificationCategory } from '@coldpbc/components';
import { MaterialClassificationCategory } from '@coldpbc/enums';

const meta: Meta<typeof PcfGraphByClassificationCategory> = {
  title: 'Molecules/PcfGraphByClassificationCategory',
  component: PcfGraphByClassificationCategory,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: Object.values(MaterialClassificationCategory).map((materialClassificationCategory, index) => ({
      classificationCategory: materialClassificationCategory,
      emissions: (index + 1) * 10,
    })),
    displayStyle: 'pcfTab',
  },
};

export const ProductDetails: Story = {
  args: {
    data: Object.values(MaterialClassificationCategory).slice(0, 3).map((materialClassificationCategory, index) => ({
      classificationCategory: materialClassificationCategory,
      emissions: (index + 1) * 10,
    })),
    displayStyle: 'productDetails',
  },
};


export const NoData: Story = {
	args: {
		data: [],
    displayStyle: 'pcfTab',
	},
};
