import { Meta, StoryObj } from '@storybook/react';
import { SuppliersPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SuppliersPage> = {
	title: 'Pages/SuppliersPage',
	component: SuppliersPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<SuppliersPage />
			</StoryMockProvider>
		);
	},
};

export const WithoutAttributesFromRelatedEntitiesFlagEnabled: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<SuppliersPage />
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
