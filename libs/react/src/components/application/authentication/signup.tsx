import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

export const Signup = () => {
	const { loginWithRedirect } = useAuth0();
	const appState = {
		returnTo: '/',
	};

	useEffect(() => {
		loginWithRedirect({
			authorizationParams: {
				screen_hint: 'signup',
				scope: 'offline_access email profile openid',
			},
			appState: appState,
		});
	});
	return <Outlet />;
};
