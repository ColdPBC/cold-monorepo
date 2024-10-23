import { Meta, StoryObj } from '@storybook/react';
import { ProductsPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ProductsPage> = {
	title: 'Pages/ProductsPage',
	component: ProductsPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<ProductsPage />
			</StoryMockProvider>
		);
	},
};

export const WithoutAttributesFromRelatedEntitiesFlagEnabled: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<ProductsPage />
			</StoryMockProvider>
		);
	},
	parameters: {
		launchdarkly: {
			flags: {
				showEntitySustainabilityAttributesForRelatedEntitiesCold1128: false,
			},
		},
	},
};
