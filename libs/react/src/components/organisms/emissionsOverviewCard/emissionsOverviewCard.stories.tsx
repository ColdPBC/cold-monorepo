import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsOverviewCard } from '@coldpbc/components';
import { getEmissionsOverviewCardHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof EmissionsOverviewCard> = {
	title: 'Organisms/EmissionsOverviewCard',
	component: EmissionsOverviewCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<EmissionsOverviewCard />
			</StoryMockProvider>
		);
	},
};

export const EmptyData: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={getEmissionsOverviewCardHandler.empty}>
				<EmissionsOverviewCard />;
			</StoryMockProvider>
		);
	},
};
