import React, { PropsWithChildren, useContext } from 'react';
import ColdContext from '../context/coldContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const ColdAuthProvider = ({ children }: PropsWithChildren) => {
	const { auth0Options } = useContext(ColdContext) as any;
	const navigate = useNavigate();

	const onRedirectCallback = (appState: any) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider {...auth0Options} onRedirectCallback={onRedirectCallback}>
			{children}
		</Auth0Provider>
	);
};
