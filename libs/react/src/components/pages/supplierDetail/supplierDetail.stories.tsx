import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MaterialDetail, SupplierDetail } from '@coldpbc/components';
import { defaultGraphqlMocks, getMaterialGraphQLMock, getSupplierGraphQLMock, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import {fireEvent, waitForElementToBeRemoved, within} from "@storybook/testing-library";

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

export const ShowDeleteModal: Story = {
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

    const menu = canvas.getByTestId('supplier-details-menu');

    const menuButton = within(menu).getByRole('button');
    fireEvent.click(menuButton);

    const deleteButton = await within(menu).findByTestId('supplier-details-menu-Delete Supplier');
    fireEvent.click(deleteButton);

  },
};

export const ShowEdit: Story = {
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

    const editButton = canvas.getByText('Edit');
    fireEvent.click(editButton);
  },
};
