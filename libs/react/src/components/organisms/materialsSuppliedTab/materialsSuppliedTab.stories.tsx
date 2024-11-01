import { Meta, StoryObj } from '@storybook/react';

import { MaterialsSuppliedTab, Tabs } from '@coldpbc/components';
import { getMaterialsMocksWithAssurances, getSupplierMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof MaterialsSuppliedTab> = {
	title: 'Molecules/MaterialsSuppliedTab',
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
