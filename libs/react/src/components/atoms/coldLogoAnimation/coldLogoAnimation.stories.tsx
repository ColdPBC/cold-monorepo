import { Meta, StoryObj } from '@storybook/react';
import { ColdLogoAnimation } from './coldLogoAnimation';

const meta: Meta<typeof ColdLogoAnimation> = {
	title: 'Atoms/ColdLogoAnimation',
	component: ColdLogoAnimation,
	tags: ['autodocs'],
	decorators: [],
	argTypes: {
		expanded: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		expanded: false,
	},
};
