import { Meta, StoryObj } from '@storybook/react';
import { ProductDetail } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { waitForElementToBeRemoved, within } from '@storybook/testing-library';

const meta: Meta<typeof ProductDetail> = {
	title: 'Pages/ProductDetail',
	component: ProductDetail,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider
				memoryRouterProps={{
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
	render: args => {
		return (
			<StoryMockProvider
				memoryRouterProps={{
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
	},
};
