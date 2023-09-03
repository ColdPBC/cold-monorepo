import React, {PropsWithChildren} from 'react';
import ColdContext from '../context/coldContext';
import {ColdAuthProvider} from '../providers/coldAuthProvider';
import {BrowserRouter} from 'react-router-dom';
import {ColdLDProvider} from '../providers/coldLDProvider';

export interface ColdContextProviderProps{
    domain: string;
    clientId: string;
    redirectUri: string;
    audience: string;
    launchDarklyClientSideId: string;
}

export const ColdContextProvider = (props: PropsWithChildren<ColdContextProviderProps>) => {
    const { domain, clientId, redirectUri, audience, launchDarklyClientSideId, children} = props;

    return (
        <BrowserRouter>
            <ColdContext.Provider value={{domain: domain, clientId: clientId, redirectUri: redirectUri, audience: audience, launchDarklyClientSideId: launchDarklyClientSideId}}>
                <ColdAuthProvider>
                    <ColdLDProvider>
                        {children}
                    </ColdLDProvider>
                </ColdAuthProvider>
            </ColdContext.Provider>
        </BrowserRouter>
    );
}
