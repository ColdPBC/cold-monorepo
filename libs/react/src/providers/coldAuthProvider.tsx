import {PropsWithChildren, useContext} from 'react';
import ColdContext from '../context/coldContext';
import {Auth0Provider} from '@auth0/auth0-react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export const ColdAuthProvider = ({children}: PropsWithChildren) => {
    const {domain, clientId, redirectUri, audience} = useContext(ColdContext) as any;

    const navigate = useNavigate();
    const onRedirectCallback = (appState:any) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            onRedirectCallback={onRedirectCallback}
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience:`${audience}`,
            }}
        >
            {children}
        </Auth0Provider>
    )
}
