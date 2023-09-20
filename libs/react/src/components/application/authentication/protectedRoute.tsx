import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ColdRoutes, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import cookie from 'js-cookie';
import { useCookies } from '@coldpbc/hooks';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';

export const ProtectedRoute = () => {
  // check if the user is authenticated
  const path = useLocation();
  const { user, error, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const { auth0Options } = useContext(ColdContext);

  const [accessToken, setAccessTokenState] = useState<string>('');

  const { setCookieData } = useCookies();

  const ldClient = useLDClient();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        if (!isLoading && isAuthenticated && user) {
          if (!accessToken) {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: auth0Options.authorizationParams?.audience,
              },
            });
            setCookieData(user, accessToken);
            setAccessTokenState(accessToken);
            if (ldClient) {
              await ldClient.identify({
                kind: 'user',
                key: user.email,
                firstName: user.given_name,
                lastName: user.family_name,
                organizationId: user.coldclimate_claims.org_id,
              });
            }
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

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          returnTo: path,
        }}
        replace={true}
      />
    );
  }

  if (accessToken) {
    return <Outlet />;
  } else {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }
};
