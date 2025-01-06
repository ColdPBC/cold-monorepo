import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MaterialDetail } from '@coldpbc/components';
import { getMaterialGraphQLMock, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import {fireEvent, waitFor, waitForElementToBeRemoved, within} from "@storybook/testing-library";
import {expect} from "@storybook/jest";

const meta: Meta<typeof MaterialDetail> = {
  title: 'Pages/MaterialDetail',
  component: MaterialDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider
        memoryRouterProps={{ initialEntries: ['/materials/material_1'] }}
        graphqlMocks={getMaterialGraphQLMock}
      >
        <Routes>
          <Route path={'/materials/:id'} element={<MaterialDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const ShowDeleteModal: Story = {
  render: () => {
    return (
      <StoryMockProvider
        memoryRouterProps={{ initialEntries: ['/materials/material_1'] }}
        graphqlMocks={getMaterialGraphQLMock}
      >
        <Routes>
          <Route path={'/materials/:id'} element={<MaterialDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

    const menu = canvas.getByTestId('material-details-menu');

    const menuButton = within(menu).getByRole('button');
    fireEvent.click(menuButton);

    const deleteButton = await within(menu).findByTestId('material-details-menu-Delete Material');
    fireEvent.click(deleteButton);

  },
};
