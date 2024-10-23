import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TeamMemberSettings } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { within, waitForElementToBeRemoved, waitFor, findByText, userEvent, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TeamMemberSettings> = {
	title: 'Organisms/TeamMemberSettings',
	component: TeamMemberSettings,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={[]}>
				<TeamMemberSettings {...args} />
			</StoryMockProvider>
		);
	},
};
