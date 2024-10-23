import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './formSection';

const meta: Meta<typeof FormSection> = {
	title: 'Molecules/FormSection',
	component: FormSection,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'User Profile',
		description: "Include your first and last name if it doesn't already exist.",
		resource_name: 'users',
		fields: [
			{
				name: 'given_name',
				input_label: 'First Name',
				placeholder: 'Jane',
			},
			{
				name: 'family_name',
				input_label: 'Last Name',
				placeholder: 'Doe',
			},
		],
	},
};
