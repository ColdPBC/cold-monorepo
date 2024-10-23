import { ColdClimateWordmark } from './coldClimateWordmark';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { HexColors } from '../../../themes/cold_theme';

const meta: Meta<typeof ColdClimateWordmark> = {
	title: 'Atoms/Logos/ColdClimateWordmark',
	component: ColdClimateWordmark,
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
