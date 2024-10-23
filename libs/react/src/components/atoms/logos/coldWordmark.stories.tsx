import { ColdWordmark } from './coldWordmark';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { HexColors } from '../../../themes/cold_theme';

const meta: Meta<typeof ColdWordmark> = {
	title: 'Atoms/Logos/ColdWordmark',
	component: ColdWordmark,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: HexColors.white,
	},
};
