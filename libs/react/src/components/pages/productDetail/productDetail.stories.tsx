import { Meta, StoryObj } from '@storybook/react';
import {ProductDetail} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import {fileWithProductMocks, productWithoutEmissionsFactor, StoryMockProvider} from '@coldpbc/mocks';
import {Route, Routes} from "react-router-dom";
import {fireEvent, waitForElementToBeRemoved, within} from "@storybook/testing-library";
import {GET_ALL_FILES} from "@coldpbc/lib";

const meta: Meta<typeof ProductDetail> = {
  title: 'Pages/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider memoryRouterProps={{
        initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
      }}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const BOMTab: Story = {
  render: (args) => {
    return (
      <StoryMockProvider memoryRouterProps={{
        initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
      }}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const bomTab = await canvas.findByTestId('tab-BOM');
    bomTab.click();
    await canvas.findByTestId('product-bom-tab-card');
  }
};

export const DocumentsTab: Story = {
  render: args => {
    return (
      <StoryMockProvider
        memoryRouterProps={{
          initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
        }}
        graphqlMocks={[
          {
            query: GET_ALL_FILES,
            handler: () =>
              Promise.resolve({
                data: {
                  organizationFiles: fileWithProductMocks(),
                },
              }),
          },
        ]}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const documentsTab = await canvas.findByTestId('tab-Documents');
    documentsTab.click();
    await canvas.findByTestId('product-documents-tab-card');
  },
};

export const ShowDeleteModal: Story = {
  render: args => {
    return (
      <StoryMockProvider
        memoryRouterProps={{
          initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
        }}
        graphqlMocks={[
          {
            query: GET_ALL_FILES,
            handler: () =>
              Promise.resolve({
                data: {
                  organizationFiles: fileWithProductMocks(),
                },
              }),
          },
        ]}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

    const menu = canvas.getByTestId('product-details-menu');

    const menuButton = within(menu).getByRole('button');
    fireEvent.click(menuButton);

    const deleteButton = await within(menu).findByTestId('product-details-menu-Delete Product');
    fireEvent.click(deleteButton);

  },
};

export const ShowEdit: Story = {
  render: (args) => {
    return (
      <StoryMockProvider memoryRouterProps={{
        initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
      }}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
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

export const CarbonAccountingTab: Story = {
  render: (args) => {
    return (
      <StoryMockProvider memoryRouterProps={{
        initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
      }}>
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const carbonAccountingTab = await canvas.findByTestId('tab-Carbon Accounting');
    carbonAccountingTab.click();
  }
};

export const CarbonAccountingTabWithoutEmissionsFactor: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        memoryRouterProps={{
          initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
        }}
        graphqlMocks={productWithoutEmissionsFactor}
      >
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const carbonAccountingTab = await canvas.findByTestId('tab-Carbon Accounting');
    carbonAccountingTab.click();
  }
};

export const CarbonAccountingTabOpenDetailExpandedView: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        memoryRouterProps={{
          initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
        }}
      >
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const carbonAccountingTab = await canvas.findByTestId('tab-Carbon Accounting');
    carbonAccountingTab.click();

    // find buttons with aria-label Expand
    const expandButtons = await canvas.findAllByLabelText('Expand');
    if(expandButtons.length > 0) {
      expandButtons[0].click();
    }
  }
};

export const CarbonAccountingTabOpenDetailExpandedViewUnknownFactor: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        memoryRouterProps={{
          initialEntries: [`/products/op_c0y7e5zsg09r0kxxlw2ha9cm`],
        }}
      >
        <Routes>
          <Route path={'/products/:id'} element={<ProductDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const carbonAccountingTab = await canvas.findByTestId('tab-Carbon Accounting');
    carbonAccountingTab.click();

    // find buttons with aria-label Expand
    const expandButtons = await canvas.findAllByLabelText('Expand');
    if(expandButtons.length > 0) {
      expandButtons[expandButtons.length - 1].click();
    }
  }
};
