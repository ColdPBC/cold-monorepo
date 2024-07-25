import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SuppliersDataGrid } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof SuppliersDataGrid> = {
  title: 'Organisms/SuppliersDataGrid',
  component: SuppliersDataGrid,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <Routes>
          <Route index element={<SuppliersDataGrid />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
