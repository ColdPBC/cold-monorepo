import { Meta, StoryObj } from '@storybook/react';
import { MaterialsSuppliedTab, Tabs } from '@coldpbc/components';
import { getMaterialsMocksWithAssurances, getSupplierMock, StoryMockProvider } from '@coldpbc/mocks';
import {fireEvent, within} from "@storybook/testing-library";

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
			materialSuppliers: getMaterialsMocksWithAssurances().map((material, index) => ({
				id: index.toString(),
				material,
			})),
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
      materialSuppliers: getMaterialsMocksWithAssurances().map((material, index) => ({
        id: index.toString(),
        material,
      })),
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
  play: async ({ canvasElement}) => {
    const canvas = within(canvasElement);
    // find 'Bulk Edit Attributes' button
    const bulkEditButton = canvas.getByText('Bulk Edit Attributes');
    // make sure it is disabled
    await expect(bulkEditButton).toBeDisabled();

    const selectAllCheckbox = canvas.getByTestId('select-all-checkbox-materials-supplied');
    fireEvent.click(selectAllCheckbox);

  }
};
