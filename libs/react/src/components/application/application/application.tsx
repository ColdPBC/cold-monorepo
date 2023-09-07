import React, {useEffect, useState} from "react";
import cookies from 'js-cookie';
import {useAuth0} from '@auth0/auth0-react';
import {ColdRoutes} from '../routes';
import {useCookies} from '@coldpbc/hooks';
import {Spinner} from '../../atoms';
import {useLDClient} from 'launchdarkly-react-client-sdk';
import {GlobalSizes} from '@coldpbc/enums';

export const Application = () => {
    const {user, error, loginWithRedirect, isAuthenticated, isLoading, logout, getAccessTokenSilently} = useAuth0();

    const ldClient = useLDClient();

    const [accessToken, setAccessTokenState] = useState<string>('');

    const { setCookieData } = useCookies();

    // For redirecting to the correct URL after login refresh
    const appState = {
        returnTo: window.location.pathname,
    };

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                if(!isLoading && isAuthenticated && user) {
                    if (!accessToken && user.coldclimate_claims.org_id) {
                        const accessToken = await getAccessTokenSilently({
                            authorizationParams: {
                                ignoreCache: true,
                            },
                            cacheMode: "off"
                        });

                        const now = new Date();
                        const expiresAt = new Date(now.getTime() + 1000 * 60 * 60);
                        sessionStorage.setItem('accessToken', JSON.stringify({ accessToken, expires: expiresAt}));

                        cookies.set('coldpbc', JSON.stringify({accessToken, expires: expiresAt}), {expires: 1, secure: false, sameSite: 'lax'});
                        setCookieData(user, accessToken);
                        setAccessTokenState(accessToken);
                        if(ldClient){
                            await ldClient.identify(
                                {
                                        kind: 'user',
                                        key: user.coldclimate_claims.id,
                                        firstName: user.given_name,
                                        lastName: user.family_name,
                                        email: user.email,
                                }
                            )
                        }
                    }
                } else {
                    if(!isLoading && !isAuthenticated) {
                        await loginWithRedirect({appState: appState});
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        getUserMetadata();
    }, [getAccessTokenSilently, user, isAuthenticated, isLoading, ldClient])

    if (isLoading) { return <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><Spinner size={GlobalSizes.xLarge}/></div>; }

    if (error) { return <div>Encountered error: {error.message}</div>; }

    if(isAuthenticated && user && accessToken) {
        return (
            <ColdRoutes/>
        );
    } else {
      return <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><Spinner size={GlobalSizes.xLarge}/></div>;
    }
};
