import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ActionsOverview } from './actionsOverview';
import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ActionsOverview> = {
	title: 'Pages/ActionsOverview',
	component: ActionsOverview,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={getActionHandler.actionsOverview}>
				<ActionsOverview {...args} />
			</StoryMockProvider>
		);
	},
};
