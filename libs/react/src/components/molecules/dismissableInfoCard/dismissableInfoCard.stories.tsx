import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DismissableInfoCard } from './dismissableInfoCard';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof DismissableInfoCard> = {
	title: 'Molecules/DismissableInfoCard',
	component: DismissableInfoCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<StoryMockProvider>
			<DismissableInfoCard
				onDismiss={() => {}}
				text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
				dismissKey="story_key"
			/>
		</StoryMockProvider>
	),
};
