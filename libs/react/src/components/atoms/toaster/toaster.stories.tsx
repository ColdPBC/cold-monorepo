import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './toaster';
import { ToastMessage } from '../../../interfaces/toastMessage';

const meta: Meta<typeof Toaster> = {
	title: 'Atoms/Toaster',
	component: Toaster,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<div className={'relative w-full h-screen'}>
				<Toaster {...args} />
			</div>
		);
	},
	args: {
		toastMessage: {
			message: 'This is a toast message',
		},
	},
};
