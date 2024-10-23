import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TemperatureCheckItem } from './temperateCheckItem';

const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
		<path
			d="M18.8756 18.5849L18.2532 15.7838C18.1511 15.3265 17.7454 15.0015 17.2769 15.0015H13.5312"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M14.8376 20.7507L13.2539 13.7788C13.1503 13.3236 12.7454 13.0005 12.2785 13.0005H7.89769C7.41932 13.0001 7.00761 13.3385 6.91528 13.8079L6.08594 18.0406"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.7498 21.0036C17.7225 21.0036 21.7536 16.9725 21.7536 11.9998C21.7536 7.02721 17.7225 2.99609 12.7498 2.99609C7.77721 2.99609 3.74609 7.02721 3.74609 11.9998C3.74609 16.9725 7.77721 21.0036 12.7498 21.0036Z"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.7498 21.0036C17.7225 21.0036 21.7536 16.9725 21.7536 11.9998C21.7536 7.02721 17.7225 2.99609 12.7498 2.99609C7.77721 2.99609 3.74609 7.02721 3.74609 11.9998C3.74609 16.9725 7.77721 21.0036 12.7498 21.0036Z"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M13.7512 6.99805C13.7512 7.82682 13.0794 8.49867 12.2506 8.49867C11.4218 8.49867 10.75 9.17052 10.75 9.9993"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M17.7508 9.99902C17.7508 10.5516 17.3029 10.9995 16.7504 10.9995C16.1979 10.9995 15.75 11.4474 15.75 11.9999"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const meta: Meta<typeof TemperatureCheckItem> = {
	title: 'Molecules/TemperatureCheckItem',
	component: TemperatureCheckItem,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<div className="max-w-[200px]">
				<TemperatureCheckItem {...args} />
			</div>
		);
	},
	args: {
		icon,
		title: 'Footprint',
		value: 22.8,
		unitLabel: 'tCO2',
		glowPosition: 'bottomLeft',
	},
};

export const NoValue: Story = {
	render: args => {
		return (
			<div className="max-w-[200px]">
				<TemperatureCheckItem {...args} />
			</div>
		);
	},
	args: {
		icon,
		title: 'Footprint',
		value: null,
		unitLabel: 'tCO2',
		glowPosition: 'bottomLeft',
	},
};

export const NoUnitLabel: Story = {
	render: args => {
		return (
			<div className="max-w-[200px]">
				<TemperatureCheckItem {...args} />
			</div>
		);
	},
	args: {
		icon,
		title: 'Footprint',
		value: 0,
		glowPosition: 'bottomLeft',
	},
};
