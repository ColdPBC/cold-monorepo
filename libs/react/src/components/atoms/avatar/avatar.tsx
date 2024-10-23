import React from 'react';
import { GlobalSizes } from '../../../enums/sizes';
import { Avatar as FlowBiteAvatar, Spinner } from 'flowbite-react';
import { useAuth0, User } from '@auth0/auth0-react';
import flowbiteThemeOverride from '../../../themes/flowbiteThemeOverride';
import clsx from 'clsx';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';

export type AvatarProps = {
	size?: GlobalSizes.xSmall | GlobalSizes.small | GlobalSizes.medium | GlobalSizes.large | GlobalSizes.xLarge;
	circle?: boolean;
	user?: User;
	children?: React.ReactNode;
};

export function Avatar(props: AvatarProps) {
	const size = props.size || GlobalSizes.medium;

	const { isLoading, error, user } = useAuth0();
	const { logError } = useColdContext();

	if (!props.user && isLoading) return <Spinner size={size} />;
	if (error) {
		logError(error, ErrorType.Auth0Error);
		return null;
	}
	if (user || props.user) {
		const avatarUser: User = props.user ? props.user : (user as User);

		if (avatarUser.picture && avatarUser.picture !== 'null')
			return (
				<span data-chromatic="ignore">
					<FlowBiteAvatar size={size} img={avatarUser.picture} rounded={props.circle} theme={flowbiteThemeOverride.avatar}>
						{props.children}
					</FlowBiteAvatar>
				</span>
			);

		return (
			<svg className={clsx({ 'rounded-full': props.circle })} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill="#282C3E" />
				<path d="M14 26C14 22.25 16.25 20 20 20C23.7499 20 26 22.25 26 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
				<circle cx="20" cy="14" r="3" fill="white" />
			</svg>
		);
	}

	return (
		<FlowBiteAvatar size={size} rounded={props.circle}>
			{props.children}
		</FlowBiteAvatar>
	);
}
