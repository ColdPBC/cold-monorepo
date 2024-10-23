import React from 'react';
import { Avatar } from './avatar';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { GlobalSizes } from '../../../enums/sizes';
import { User } from '@auth0/auth0-react';
import { fullUser, invalidUser, userWithEmail, userWithNames } from '../../../__mocks__/userMock';

const meta: Meta<typeof Avatar> = {
	title: 'Atoms/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {
		size: {
			control: 'select',
			defaultValue: GlobalSizes.medium,
			options: [GlobalSizes.xSmall, GlobalSizes.small, GlobalSizes.medium, GlobalSizes.large, GlobalSizes.xLarge],
		},
		user: User,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		user: fullUser,
	},
	decorators: [
		withKnobs,
		(Story: any) => {
			return (
				<>
					<div style={{ margin: '3em' }}>By default, the Avatar component will get all necessary data from the Auth0Provider context, there is no need to pass the user prop.</div>
					<Story />
				</>
			);
		},
	],
};

export const UserWithJustNames: Story = {
	args: {
		user: userWithNames,
	},
	decorators: [
		withKnobs,
		(Story: any) => {
			return (
				<>
					<div style={{ margin: '3em' }}>If no picture is available and family_name and given_name provided, it renders the user's initials instead.</div>
					<Story />
				</>
			);
		},
	],
};

export const UserWithJustEmail: Story = {
	args: {
		user: userWithEmail,
	},
	decorators: [
		withKnobs,
		(Story: any) => {
			return (
				<>
					<div style={{ margin: '3em' }}>If no picture is available and only email is available, it renders the first two characters of the email address.</div>
					<Story />
				</>
			);
		},
	],
};

export const InvalidUser: Story = {
	args: {
		user: invalidUser,
	},
	decorators: [
		withKnobs,
		(Story: any) => {
			return (
				<>
					<div style={{ margin: '3em' }}>If the user object doesn't have a picture, email, or given_name and family_name it will just render the generic avatar</div>
					<Story />
				</>
			);
		},
	],
};

export const Rounded: Story = {
	decorators: [
		withKnobs,
		(Story: any) => {
			return (
				<>
					With Picture:
					<span>
						<Avatar circle={true} size={GlobalSizes.small} user={fullUser} />
						<Avatar circle={true} size={GlobalSizes.medium} user={fullUser} />
						<Avatar circle={true} size={GlobalSizes.large} user={fullUser} />
					</span>
					Just First & Last Name
					<span>
						<Avatar circle={true} size={GlobalSizes.small} user={userWithNames} />
						<Avatar circle={true} size={GlobalSizes.medium} user={userWithNames} />
						<Avatar circle={true} size={GlobalSizes.large} user={userWithNames} />
					</span>
					Just Email
					<span>
						<Avatar circle={true} size={GlobalSizes.small} user={userWithEmail} />
						<Avatar circle={true} size={GlobalSizes.medium} user={userWithEmail} />
						<Avatar circle={true} size={GlobalSizes.large} user={userWithEmail} />
					</span>
				</>
			);
		},
	],
};
