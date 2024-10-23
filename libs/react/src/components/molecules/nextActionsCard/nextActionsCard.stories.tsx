import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { NextActionsCard } from './nextActionsCard';
import { StoryMockProvider, RightColumnContent } from '../../../';

const meta: Meta<typeof NextActionsCard> = {
	title: 'Molecules/NextActionsCard',
	component: NextActionsCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<RightColumnContent>
					<NextActionsCard />
				</RightColumnContent>
			</StoryMockProvider>
		);
	},
};
