import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StatusChip } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';

const meta: Meta<typeof StatusChip> = {
	title: 'Atoms/StatusChip',
	component: StatusChip,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: HexColors.lightblue['200'],
		text: 'Status',
	},
};
