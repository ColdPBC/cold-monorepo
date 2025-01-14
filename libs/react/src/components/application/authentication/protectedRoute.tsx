import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ProtectedRouteErrorFallback, SignupPage, Spinner, Takeover, ErrorPage } from '@coldpbc/components';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType, GlobalSizes } from '@coldpbc/enums';
import { PolicySignedDataType } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import useSWR from 'swr';
import { get, has, isArray, isEmpty } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { datadogRum } from '@datadog/browser-rum';
import { LDContext } from 'launchdarkly-js-sdk-common';
import { datadogLogs } from '@datadog/browser-logs';
import { isAxiosError } from 'axios';

const _ProtectedRoute = () => {
  const { user, error, loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently, orgId, logout } = useAuth0Wrapper();
  const { auth0Options } = useContext(ColdContext);

  const { logError, logBrowser } = useColdContext();

  const ldClient = useLDClient();

  const location = useLocation();

  const signedPolicySWR = useSWR<PolicySignedDataType[], any, any>(user && isAuthenticated ? ['/policies/signed/user', 'GET'] : null, axiosFetcher);

  const needsSignup = () => {
    if (signedPolicySWR.data && !isAxiosError(signedPolicySWR.data) && isArray(signedPolicySWR.data)) {
      // check if user has signed both policies
      const tos = signedPolicySWR.data?.some(policy => policy.name === 'tos' && !isEmpty(policy.policy_data));
      const privacy = signedPolicySWR.data?.some(policy => policy.name === 'privacy' && !isEmpty(policy.policy_data));
      return !tos || !privacy || !user?.family_name || !user?.given_name;
    } else {
      return true;
    }
    // todo - put this check back in when we need to check for company
    // check if company is already set
    // if (isUndefined(user?.coldclimate_claims.org_id)) return true;
  };

  const getAppState = () => {
    const { pathname, search } = location;
    let searchToBeAdded = '';
    if (!(search.includes('invitation') && search.includes('organization') && search.includes('organization_name'))) {
      searchToBeAdded = search;
    }
    const returnTo = pathname + searchToBeAdded;
    return { returnTo: returnTo };
  };

  const appState = getAppState();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        if (!isLoading) {
          if (!error) {
            if (isAuthenticated) {
              if (ldClient && orgId) {
                const currentContext = ldClient.getContext() as LDContext;
                let newContext: LDContext;
                if (currentContext.anonymous === true) {
                  newContext = {
                    kind: 'multi',
                    organization: {
                      kind: 'organization',
                      key: orgId,
                    },
                    role: {
                      kind: 'role',
                      key: get(user, 'coldclimate_claims.roles[0]', 'company:member'),
                    },
                  };
                } else {
                  newContext = {
                    ...currentContext,
                    kind: 'multi',
                    organization: {
                      kind: 'organization',
                      key: orgId,
                    },
                    role: {
                      kind: 'role',
                      key: get(user, 'coldclimate_claims.roles[0]', 'company:member'),
                    },
                  };
                }

                logBrowser(`Setting LD context for organization: ${orgId}`, 'info', {
                  orgId,
                  newContext,
                });

                await ldClient.identify(newContext);
              }
              datadogRum.setUser(user?.coldclimate_claims);
              datadogLogs.setUser(user?.coldclimate_claims);
            } else {
              logBrowser('Logging in user', 'info', { user, isAuthenticated });
              localStorage.clear()
              sessionStorage.clear()
              await loginWithRedirect({
                appState: appState,
                authorizationParams: {
                  audience: auth0Options.authorizationParams?.audience,
                  scope: 'offline_access email profile openid',
                  prompt: 'login',
                },
              });
            }
          }
        }
      } catch (e) {
        if (has(e, 'error')) {
          if (get(e, 'error') === 'login_required') {
            logBrowser('User needs to login', 'error', { error: e });
            logError(e, ErrorType.Auth0Error);
            localStorage.clear()
            sessionStorage.clear()
            await logout();
          }
          if (get(e, 'error') === 'consent_required') {
            logBrowser('User needs to give consent', 'error', { error: e });
            logError(e, ErrorType.Auth0Error);
            localStorage.clear()
            sessionStorage.clear()
            await logout();
          }
        }
        logBrowser('Error occurred while logging user in', 'error', { error: e });
        logError(e, ErrorType.Auth0Error);
        localStorage.clear()
        sessionStorage.clear()
        await logout();
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user, isAuthenticated, isLoading, appState, orgId, error]);

  if (isLoading || signedPolicySWR.isLoading) {
    return (
      <Takeover show={true} setShow={() => {}}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </Takeover>
    );
  }

  if (error || isAxiosError(signedPolicySWR.data)) {
    let errorMessage;

    if (error) {
      logBrowser('Error occurred in ProtectedRoute', 'error', { ...error }, error);
      logError(error, ErrorType.Auth0Error);
      if (error.message === 'invitation not found or already used') {
        errorMessage = 'This invitation has either expired or already been used. If you have already accepted the invite, try logging in again with the button below.';
      } else {
        errorMessage = 'A connection error occurred. Please refresh the page or re-login.';
      }
    }

    if (isAxiosError(signedPolicySWR.data)) {
      logBrowser('Error occurred in ProtectedRoute', 'error', { error: signedPolicySWR.error }, signedPolicySWR.error);
      logError(signedPolicySWR.data, ErrorType.SWRError);
      errorMessage = 'A connection error occurred. Please refresh the page or re-login.';
    }

    return <ErrorPage error={errorMessage} />;
  }

  if (isAuthenticated && user) {
    if (needsSignup()) {
      logBrowser('User needs to sign up', 'info', { user });
      return <SignupPage signedPolicyData={signedPolicySWR.data} userData={user} />;
    }
    logBrowser('User is authenticated', 'info', { user, isAuthenticated, orgId });
    return <Outlet />;
  } else {
    logBrowser('User is not authenticated', 'info', { user, isAuthenticated, orgId, isLoading, error });
    return (
      <Takeover show={true} setShow={() => {}}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </Takeover>
    );
  }
};

export const ProtectedRoute = withErrorBoundary(_ProtectedRoute, {
  FallbackComponent: props => <ProtectedRouteErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProtectedRoute: ', error);
  },
});
