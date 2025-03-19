import { Meta, StoryObj } from '@storybook/react';
import { MaterialsSuppliedTab, Tabs } from '@coldpbc/components';
import { getMaterialsMocksWithAssurances, getSupplierMock, StoryMockProvider } from '@coldpbc/mocks';
import { expect, fireEvent, within } from "@storybook/test";
import React from "react";

const meta: Meta<typeof MaterialsSuppliedTab> = {
	title: 'Organisms/MaterialsSuppliedTab',
	component: MaterialsSuppliedTab,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		supplier: {
			...getSupplierMock(2),
			materials: getMaterialsMocksWithAssurances(),
		},
    refreshData: () => {},
  },
	// Need to place the data grid in a parent component for correct rendering
  render: args => {
    return <RenderMaterialsSuppliedTabStory {...args} />;
  },
};

export const SelectMaterialsOpenBulkEditModal: Story = {
  args: {
    supplier: {
      ...getSupplierMock(2),
      materials: getMaterialsMocksWithAssurances(),
    },
    refreshData: () => {},
  },
  // Need to place the data grid in a parent component for correct rendering
  render: args => {
    return <RenderMaterialsSuppliedTabStory {...args} />;
  },
  play: async ({ canvasElement, step}) => {
    const canvas = within(canvasElement);
    await step('Select all materials', async () => {
      // find 'Bulk Edit Attributes' button
      const bulkEditButton = await canvas.findByRole('button', { name: 'Bulk Edit Attributes' });
      await expect(bulkEditButton).toBeDisabled();
      const selectAllCheckbox = await canvas.findByTestId('select-all-checkbox-materials-supplied');
      fireEvent.click(selectAllCheckbox);
      const buttonEnabled = await canvas.findByRole('button', { name: 'Bulk Edit Attributes' });
      await expect(buttonEnabled).toBeEnabled();
      // click the button
      fireEvent.click(bulkEditButton);
    })
  }
};

export const SelectMaterialsOpenEditMaterialsModal: Story = {
  args: {
    supplier: {
      ...getSupplierMock(2),
      materials: getMaterialsMocksWithAssurances(),
    },
    refreshData: () => {},
  },
  // Need to place the data grid in a parent component for correct rendering
  render: args => {
    return <RenderMaterialsSuppliedTabStory {...args} />;
  },
  play: async ({ canvasElement, step}) => {
    const canvas = within(canvasElement);
    await step('Select all materials', async () => {
      const editButton = await canvas.findByTestId('Edit Materials-button');
      await expect(editButton).toBeEnabled();
      // click the button
      fireEvent.click(editButton);
    })
  }
};


const RenderMaterialsSuppliedTabStory = (args: any) => {
  return (
    <StoryMockProvider>
      <Tabs
        tabs={[
          {
            label: 'Materials',
            content: <MaterialsSuppliedTab {...args} />,
          },
        ]}
      />
    </StoryMockProvider>
  );
}
