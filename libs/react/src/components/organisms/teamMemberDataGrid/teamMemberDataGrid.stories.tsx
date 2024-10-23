import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TeamMembersDataGrid } from './teamMembersDataGrid';
import { SWRConfig } from 'swr';

const meta: Meta<typeof TeamMembersDataGrid> = {
	title: 'Organisms/TeamMemberDatagrid',
	component: TeamMembersDataGrid,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<SWRConfig
				value={{
					provider: cache => {
						return cache;
					},
				}}>
				<TeamMembersDataGrid {...args} />
			</SWRConfig>
		);
	},
	args: {
		selectedMemberStatusType: 'Members',
	},
};

export const Invitations: Story = {
	render: args => {
		return (
			<SWRConfig
				value={{
					provider: cache => {
						return cache;
					},
				}}>
				<TeamMembersDataGrid {...args} />
			</SWRConfig>
		);
	},
	args: {
		selectedMemberStatusType: 'Invitations',
	},
};
