import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GetTokenSilentlyOptions, useAuth0, User } from '@auth0/auth0-react';
import { SignupPage, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { get, has, isUndefined } from 'lodash';
import { useCookies } from 'react-cookie';
import { useAuth0Wrapper } from '../../../hooks/useAuth0Wrapper';

export const ProtectedRoute = () => {
  const {
    user,
    error,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0Wrapper();
  const { auth0Options } = useContext(ColdContext);

  const [cookies, setCookie, removeCookie] = useCookies(['coldpbc']);

  const { coldpbc } = cookies;

  const ldClient = useLDClient();

  const appState = {
    returnTo: window.location.pathname,
  };

  const needsSignup = () => {
    const ifNoOrgId = isUndefined(user?.coldclimate_claims.org_id);
    if (user) {
      const ifNoName =
        !user.family_name || !user.given_name;
      return ifNoName || ifNoOrgId;
    } else {
      return ifNoOrgId || false;
    }
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        if (!isLoading) {
          if (isAuthenticated) {
            if (!coldpbc && user) {
              const options = {
                authorizationParams: {
                  audience: auth0Options.authorizationParams?.audience,
                  scope: 'offline_access email profile openid',
                },
              } as GetTokenSilentlyOptions;
              if (user.coldclimate_claims.org_id) {
                options.authorizationParams = {
                  ...options.authorizationParams,
                  organization: user.coldclimate_claims.org_id,
                };
              }
              const accessToken = await getAccessTokenSilently(options);

              setCookie('coldpbc', { user, accessToken });

              if (ldClient && user.coldclimate_claims.org_id) {
                await ldClient.identify({
                  kind: 'user',
                  organizationId: user.coldclimate_claims.org_id,
                });
              }
            }
          } else {
            if (!isAuthenticated) {
              removeCookie('coldpbc');
              await loginWithRedirect({
                appState: appState,
                authorizationParams: {
                  audience: auth0Options.authorizationParams?.audience,
                  scope: 'offline_access email profile openid',
                },
              });
            }
          }
        }
      } catch (e) {
        if (has(e, 'error')) {
          if (get(e, 'error') === 'login_required') {
            await loginWithRedirect();
          }
          if (get(e, 'error') === 'consent_required') {
            await loginWithRedirect();
          }
        }
        console.error(e);
      }
    };

    getUserMetadata();
  }, [
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    appState,
    coldpbc,
  ]);

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

  if (isAuthenticated && user && coldpbc) {
    if (needsSignup()) {
      return <SignupPage userData={user} />;
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
