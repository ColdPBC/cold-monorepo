import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from '../dashboardLayout/dashboardLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const meta: Meta<typeof DashboardLayout> = {
	title: 'Pages/Layout',
	component: DashboardLayout,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<BrowserRouter>
				<DashboardLayout {...args}>
					<Routes>
						<Route path="*" element={<div>Pending...</div>} />
					</Routes>
				</DashboardLayout>
			</BrowserRouter>
		);
	},
	args: {
		user: {
			name: 'Qaalib Farah',
			given_name: 'Qaalib',
			family_name: 'Farah',
			picture: 'https://img.uefa.com/imgml/TP/players/1/2023/324x324/250103758.jpg',
			email: 'qaalig.farah@coldclimate.com',
		},
	},
};
