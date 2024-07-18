import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SuppliersDataGrid } from '@coldpbc/components';

const meta: Meta<typeof SuppliersDataGrid> = {
  title: 'Organisms/SuppliersDataGrid',
  component: SuppliersDataGrid,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
