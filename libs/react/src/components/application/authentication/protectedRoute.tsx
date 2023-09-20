import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth0, User } from '@auth0/auth0-react';
import { ColdRoutes, SignupPage, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import cookie from 'js-cookie';
import { useCookies } from '@coldpbc/hooks';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import useSWR, { SWRResponse } from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import cookies from 'js-cookie';
import { isEmpty, isUndefined } from 'lodash';

export const ProtectedRoute = () => {
  const {
    user,
    error,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const { auth0Options } = useContext(ColdContext);
  const [accessTokenState, setAccessTokenState] = useState<string>('');

  const { setCookieData } = useCookies();

  const ldClient = useLDClient();
  const appState = {
    returnTo: window.location.pathname,
  };
  const needsSignup = () => {
    const ifNoOrgId = isUndefined(user?.coldclimate_claims.org_id);
    if (user) {
      const ifNoName = !user.family_name || !user.given_name;
      return ifNoName || ifNoOrgId;
    } else {
      return ifNoOrgId || false;
    }
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        if (!isLoading && isAuthenticated && user) {
          if (!accessTokenState) {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: auth0Options.authorizationParams?.audience,
              },
            });

            const now = new Date();
            const expiresAt = new Date(now.getTime() + 1000 * 60 * 60);

            cookies.set(
              'coldpbc',
              JSON.stringify({ accessToken, expires: expiresAt }),
              {
                expires: 1,
                secure: false,
                sameSite: 'lax',
              },
            );
            setCookieData(user, accessToken);
            setAccessTokenState(accessToken);
            if (ldClient && user.coldclimate_claims.org_id) {
              await ldClient.identify({
                kind: 'user',
                organizationId: user.coldclimate_claims.org_id,
              });
            }
          }
        } else {
          if (!isLoading && !isAuthenticated) {
            await loginWithRedirect({ appState: appState });
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }

  if (error) {
    return <div>Encountered error: {error.message}</div>;
  }

  if (isAuthenticated && user && accessTokenState) {
    if (needsSignup()) {
      return <SignupPage />;
    } else {
      return <Outlet />;
    }
  } else {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }
};
