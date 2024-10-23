import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { YesNo } from './yesNo';

const meta: Meta<typeof YesNo> = {
	title: 'Molecules/YesNo',
	component: YesNo,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = React.useState(args.value);

		const onChange = (value: any) => {
			setValue(value);
		};

		return <YesNo value={value} onChange={onChange} />;
	},
	args: {
		value: null,
	},
};
