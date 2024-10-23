import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ActionDetail } from './actionDetail';

const meta: Meta<typeof ActionDetail> = {
	title: 'Pages/ActionDetail',
	component: ActionDetail,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => (
		<StoryMockProvider>
			<ActionDetail id={'1'} />
		</StoryMockProvider>
	),
};

export const NoResources: Story = {
	render: args => (
		<StoryMockProvider handlers={[getActionHandler.noResources]}>
			<ActionDetail id={'1'} />
		</StoryMockProvider>
	),
};

export const AllStepsComplete: Story = {
	render: args => (
		<StoryMockProvider handlers={[getActionHandler.allStepsComplete]}>
			<ActionDetail id={'1'} />
		</StoryMockProvider>
	),
};

export const NoDueDateSet: Story = {
	render: args => (
		<StoryMockProvider handlers={[getActionHandler.noDueDateSet]}>
			<ActionDetail id={'1'} />
		</StoryMockProvider>
	),
};

export const ActionWithUsersAssigned: Story = {
	render: args => (
		<StoryMockProvider handlers={[getActionHandler.usersAssigned]}>
			<ActionDetail id={'1'} />
		</StoryMockProvider>
	),
};
