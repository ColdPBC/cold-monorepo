import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SuppliersDataGrid } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SuppliersDataGrid> = {
  title: 'Organisms/SuppliersDataGrid',
  component: SuppliersDataGrid,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Tier1: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <SuppliersDataGrid tier={1} />
      </StoryMockProvider>
    );
  },
};

export const Tier2: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <SuppliersDataGrid tier={2} />
      </StoryMockProvider>
    );
  },
};
