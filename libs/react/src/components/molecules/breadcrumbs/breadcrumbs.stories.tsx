import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import React from 'react';

const meta = {
	title: 'Molecules/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
	decorators: [withKnobs],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [{ label: 'Home', href: '/home' }, { label: 'Create New' }],
	},
	render: args => {
		return (
			<StoryMockProvider>
				<Breadcrumbs {...args} />
			</StoryMockProvider>
		);
	},
};
