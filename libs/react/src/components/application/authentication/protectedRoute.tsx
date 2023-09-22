import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { GetTokenSilentlyOptions, useAuth0, User } from '@auth0/auth0-react';
import { ColdRoutes, SignupPage, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import cookie from 'js-cookie';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import useSWR, { SWRResponse } from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { get, has, isEmpty, isUndefined } from 'lodash';
import { useCookies } from 'react-cookie';

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

  // const { setCookieData, getCookieData } = useCookies();
  //
  // const cookieData = getCookieData();

  const [cookies, setCookie, removeCookie] = useCookies(['coldpbc']);

  const { coldpbc } = cookies;

  const userData = useSWR<User, any, any>(
    user && coldpbc ? [`/users/${user.email}`, 'GET'] : null,
    axiosFetcher,
  );

  const ldClient = useLDClient();

  const appState = {
    returnTo: window.location.pathname,
  };

  const needsSignup = () => {
    const ifNoOrgId = isUndefined(user?.coldclimate_claims.org_id);
    if (userData?.data) {
      const ifNoName =
        userData?.data.family_name === 'null' ||
        userData?.data.given_name === 'null';
      return ifNoName || ifNoOrgId;
    } else {
      return ifNoOrgId || false;
    }
  };

  const isLoggedIntoWithoutOrg = () => {
    return isUndefined(user?.coldclimate_claims.org_id);
  };

  const isLoggedIntoAnOrg = () => {
    return !isUndefined(user?.coldclimate_claims.org_id);
  };

  const hasSignedUp = () => {
    // if user has signed up, they will not have org_id in their claims
    // but they will have their names in the userData.data object
    return (
      !isUndefined(user?.coldclimate_claims.org_id) &&
      !isEmpty(userData?.data?.family_name) &&
      !isEmpty(userData?.data?.given_name)
    );
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
            // else {
            //   await loginWithRedirect({
            //     appState: appState,
            //     authorizationParams: {
            //       audience: auth0Options.authorizationParams?.audience,
            //       scope: 'offline_access email profile openid',
            //     },
            //   });
            // }
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

  if (isLoading || userData.isLoading) {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }

  if (error || userData.error) {
    return (
      <div>Encountered error: {error?.message || userData.error.message}</div>
    );
  }

  if (isAuthenticated && user && userData.data) {
    if (needsSignup()) {
      return <SignupPage userData={userData.data} />;
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
