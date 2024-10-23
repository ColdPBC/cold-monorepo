import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { UserSettings } from './userSettings';
import { auth0UserMock } from '@coldpbc/mocks';
import { MainContent } from '../../organisms/mainContent';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof UserSettings> = {
	title: 'Molecules/UserSettings',
	component: UserSettings,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<BrowserRouter>
				<MainContent>
					<UserSettings />
				</MainContent>
			</BrowserRouter>
		);
	},
};
