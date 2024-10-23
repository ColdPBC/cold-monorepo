import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComboBox, ComboBoxProps } from './comboBox';
import { InputOption } from '@coldpbc/interfaces';

const meta: Meta<typeof ComboBox> = {
	title: 'Molecules/ComboBox',
	component: ComboBox,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <ComboBoxStory {...args} />;
	},
	args: {
		options: [
			{ id: 1, name: 'Option 1', value: 'value_1' },
			{ id: 2, name: 'Option 2', value: 'value_2' },
			{ id: 3, name: 'Option 3', value: 'value_3' },
		],
		name: 'name',
		label: 'Label',
		value: { id: 1, name: 'Option 1', value: 'value_1' },
	},
};

const ComboBoxStory = (props: ComboBoxProps) => {
	const { options, name, label, value, onChange, className, buttonClassName = '' } = props;
	const [stateValue, setStateValue] = useState<InputOption>(value);

	return (
		<div className={'w-[150px]'}>
			<ComboBox
				{...props}
				value={stateValue}
				onChange={selectedOption => {
					setStateValue(selectedOption);
				}}
			/>
		</div>
	);
};
