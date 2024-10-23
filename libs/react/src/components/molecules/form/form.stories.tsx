import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Form } from './form';

const meta: Meta<typeof Form> = {
	title: 'Molecules/Form',
	component: Form,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		sections: [
			{
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
			{
				title: 'Company Information',
				description: 'Your company information',
				resource_name: 'companies',
				fields: [
					{
						name: 'name',
						input_label: 'Company Name',
						placeholder: 'Acme Corporation',
					},
				],
			},
		],
	},
};
