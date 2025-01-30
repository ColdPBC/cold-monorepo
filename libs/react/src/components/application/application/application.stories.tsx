import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Application } from './application';
import { auth0UserMock, getCategoriesHandler, getFootprintHandler, getSignupHandlersForApplicationSignup, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof Application> = {
	title: 'Application/Application',
	component: Application,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<Application />
			</StoryMockProvider>
		);
	},
};

export const Loading: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<Application />
			</StoryMockProvider>
		);
	},
	parameters: {
		auth0AddOn: {
      isLoading: true,
    },
	},
};

export const EmptyFootprintData: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
				<Application />
			</StoryMockProvider>
		);
	},
};

export const NeedsSignup: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={getSignupHandlersForApplicationSignup.DEFAULT}>
				<Application />
			</StoryMockProvider>
		);
	},
	parameters: {
		auth0AddOn: {
			user: {
				...auth0UserMock,
				coldclimate_claims: '',
				family_name: null,
				given_name: null,
			},
		},
	},
};

export const Handle404 = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.handle404, getCategoriesHandler.handle404]}>
			<Application />
		</StoryMockProvider>
	);
};

export const ColdAdmin: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<Application />
			</StoryMockProvider>
		);
	},
	parameters: {
		auth0AddOn: {
			user: {
				coldclimate_claims: {
					roles: ['company:admin', 'cold:admin'],
				},
			},
		},
	},
};
