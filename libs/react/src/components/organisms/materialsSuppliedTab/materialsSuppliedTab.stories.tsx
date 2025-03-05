import { Meta, StoryObj } from '@storybook/react';
import { MaterialsSuppliedTab, Tabs } from '@coldpbc/components';
import { getMaterialsMocksWithAssurances, getSupplierMock, StoryMockProvider } from '@coldpbc/mocks';
import { expect, fireEvent, within } from "@storybook/test";

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
	},
	// Need to place the data grid in a parent component for correct rendering
	render: args => {
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
	},
};

export const SelectMaterialsOpenBulkEditModal: Story = {
  args: {
    supplier: {
      ...getSupplierMock(2),
      materials: getMaterialsMocksWithAssurances(),
    },
  },
  // Need to place the data grid in a parent component for correct rendering
  render: args => {
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
  },
  play: async ({ canvasElement, step}) => {
    const canvas = within(canvasElement);
    await step('Select all materials', async () => {
      // find 'Bulk Edit Attributes' button
      const bulkEditButton = canvas.getByRole('button', { name: 'Bulk Edit Attributes' });
      await expect(bulkEditButton).toBeDisabled();
      const selectAllCheckbox = canvas.getByTestId('select-all-checkbox-materials-supplied');
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
  },
  // Need to place the data grid in a parent component for correct rendering
  render: args => {
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
  },
  play: async ({ canvasElement, step}) => {
    const canvas = within(canvasElement);
    await step('Select all materials', async () => {
      const editButton = canvas.getByTestId('Edit Materials-button');
      await expect(editButton).toBeEnabled();
      // click the button
      fireEvent.click(editButton);
    })
  }
};
