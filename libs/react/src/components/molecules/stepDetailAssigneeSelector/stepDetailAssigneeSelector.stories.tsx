import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StepDetailAssigneeSelector } from './stepDetailAssigneeSelector';
import { Assignee } from '@coldpbc/interfaces';

const meta: Meta<typeof StepDetailAssigneeSelector> = {
	title: 'Molecules/StepDetailAssigneeSelector',
	component: StepDetailAssigneeSelector,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAssignee: Story = {
	args: {
		assignee: {
			email: 'john.doe@coldclimate.com',
			name: 'John Doe',
			picture: 'https://picsum.photos/200',
			given_name: 'John',
			family_name: 'Doe',
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleAssigneeSelection: (assignee: Assignee | null) => {},
	},
};

export const WithoutUser: Story = {
	args: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleAssigneeSelection: (assignee: Assignee | null) => {},
	},
};
