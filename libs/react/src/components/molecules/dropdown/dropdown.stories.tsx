import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownProps } from '@coldpbc/components';

const meta: Meta<typeof Dropdown> = {
	title: 'Molecules/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <DropdownStory {...args} />;
	},
	args: {
		selected: 'all',
		options: [
			{ value: 'all', label: 'All Facilities' },
			{ value: 'facility_1', label: 'Facility One' },
			{ value: 'facility_2', label: 'Facility Two' },
		],
	},
};

const DropdownStory = (args: DropdownProps) => {
	const [selected, setSelected] = React.useState<string | undefined>(args.selected);

	return (
		<Dropdown
			{...args}
			onSelect={value => {
				setSelected(value);
			}}
			selected={selected}
		/>
	);
};
