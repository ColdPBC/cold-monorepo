import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { AppContent } from '@coldpbc/components';

const meta = {
	title: 'Molecules/AppContent',
	component: AppContent,
	tags: ['autodocs'],
	decorators: [withKnobs],
} satisfies Meta<typeof AppContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};
