import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DefaultHexColors } from '../../../enums/colors';
import { ColdIcon } from './coldIcon';
import { IconNames } from '../../../enums/iconNames';

const meta: Meta<typeof ColdIcon> = {
	title: 'Atoms/Icons/ColdIcon',
	component: ColdIcon,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {
		name: {
			control: 'select',
			options: IconNames,
		},
		color: {
			control: 'select',
			options: DefaultHexColors,
		},
		inverted: {
			control: 'boolean',
			defaultValue: false,
		},
		filled: {
			control: 'boolean',
			defaultValue: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
