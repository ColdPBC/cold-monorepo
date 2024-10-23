import { getCategoriesHandler, getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Home } from './home';

const meta: Meta<typeof Home> = {
	title: 'Pages/Home',
	component: Home,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<StoryMockProvider handlers={[]}>
			<Home />
		</StoryMockProvider>
	),
};

export const EmptyFootprintData: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
				<Home />
			</StoryMockProvider>
		);
	},
};

export const REIComplianceMVP: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
				<Home />
			</StoryMockProvider>
		);
	},
	parameters: {
		launchdarkly: {
			flags: {
				showNewHomePageComplianceReiMvp: true,
			},
		},
	},
};
