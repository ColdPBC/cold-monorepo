import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
	title: 'Organisms/Header',
	component: Header,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <Header />;
	},
};
