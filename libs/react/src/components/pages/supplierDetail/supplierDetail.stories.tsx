import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SupplierDetail } from '@coldpbc/components';
import { defaultGraphqlMocks, getSupplierGraphQLMock, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof SupplierDetail> = {
  title: 'Pages/SupplierDetail',
  component: SupplierDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider
        memoryRouterProps={{ initialEntries: ['/suppliers/1']}}
        graphqlMocks={getSupplierGraphQLMock(2)}
      >
        <Routes>
          <Route path={'/suppliers/:id'} element={<SupplierDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const Tier1WithoutMaterials: Story = {
  render: () => {
    return (
      <StoryMockProvider
        memoryRouterProps={{ initialEntries: ['/suppliers/1']}}
        graphqlMocks={getSupplierGraphQLMock(1)}
      >
        <Routes>
          <Route path={'/suppliers/:id'} element={<SupplierDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
