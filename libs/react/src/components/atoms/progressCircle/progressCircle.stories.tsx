import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';

const meta: Meta<typeof ProgressCircle> = {
	title: 'Atoms/ProgressCircle',
	component: ProgressCircle,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: HexColors.lightblue['200'],
		percentage: 50,
		radius: 6,
	},
};
