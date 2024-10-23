import { getEmissionsOverviewCardHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { CarbonFootprint } from '@coldpbc/components';

const meta: Meta<typeof CarbonFootprint> = {
	title: 'Pages/CarbonFootprint',
	component: CarbonFootprint,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => (
		<StoryMockProvider>
			<CarbonFootprint />
		</StoryMockProvider>
	),
};

export const EmptyData: Story = {
	render: args => (
		<StoryMockProvider handlers={getEmissionsOverviewCardHandler.empty}>
			<CarbonFootprint />
		</StoryMockProvider>
	),
};

export const SingleYear: Story = {
	render: args => (
		<StoryMockProvider handlers={getEmissionsOverviewCardHandler.singleYear}>
			<CarbonFootprint />
		</StoryMockProvider>
	),
};
