import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { PercentSlider } from './percentSlider';

const meta: Meta<typeof PercentSlider> = {
	title: 'Molecules/PercentSlider',
	component: PercentSlider,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState<number | null>(args.value);

		const onChange = (value: number | null) => {
			setValue(value);
		};

		return <PercentSlider {...args} onChange={onChange} value={value} />;
	},
	args: {
		value: 50,
		tooltip: 'Select estimated percentage',
	},
};

export const MoreThan100: Story = {
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState<number | null>(args.value);

		const onChange = (value: number | null) => {
			setValue(value);
		};

		return <PercentSlider {...args} onChange={onChange} value={value} />;
	},
	args: {
		value: 101,
		tooltip: 'Select estimated percentage',
	},
};

export const LessThan0: Story = {
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState<number | null>(args.value);

		const onChange = (value: number | null) => {
			setValue(value);
		};

		return <PercentSlider {...args} onChange={onChange} value={value} />;
	},
	args: {
		value: -1,
		tooltip: 'Select estimated percentage',
	},
};

export const NonIntString: Story = {
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState<number | null>(args.value);

		const onChange = (value: number | null) => {
			setValue(value);
		};

		return <PercentSlider {...args} onChange={onChange} value={value} />;
	},
	args: {
		value: 'string',
		tooltip: 'Select estimated percentage',
	},
};
