import React, { useContext, useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ErrorFallback, SignupPage, Spinner } from '@coldpbc/components';
import { ErrorType, GlobalSizes } from '@coldpbc/enums';
import ColdContext from '../../../context/coldContext';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { get, has, isEmpty, isUndefined } from 'lodash';
import { PolicySignedDataType } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { SurveyPayloadType } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '../errors/errorPage';
import { datadogRum } from '@datadog/browser-rum';

const _ProtectedRoute = () => {
  const {
    user,
    error,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    orgId,
  } = useAuth0Wrapper();
  const { auth0Options } = useContext(ColdContext);

  const { logError } = useColdContext();

  const ldClient = useLDClient();

  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const signedPolicySWR = useSWR<PolicySignedDataType[], any, any>(
    user && isAuthenticated ? ['/policies/signed/user', 'GET'] : null,
    axiosFetcher,
  );

  const needsSignup = () => {
    if (signedPolicySWR.data) {
      // check if user has signed both policies
      const tos = signedPolicySWR.data?.some(
        (policy) => policy.name === 'tos' && !isEmpty(policy.policy_data),
      );
      const privacy = signedPolicySWR.data?.some(
        (policy) => policy.name === 'privacy' && !isEmpty(policy.policy_data),
      );
      return !tos || !privacy || !user?.family_name || !user?.given_name;
    } else {
      return true;
    }
    // todo - put this check back in when we need to check for company
    // check if company is already set
    // if (isUndefined(user?.coldclimate_claims.org_id)) return true;
  };

  const initialSurveySWR = useOrgSWR<SurveyPayloadType, any>(
    user && isAuthenticated ? [`/surveys/journey_overview`, 'GET'] : null,
    axiosFetcher,
  );

  const getAppState = () => {
    const { pathname, search } = location;
    let searchToBeAdded = '';
    if (
      !(
        search.includes('invitation') &&
        search.includes('organization') &&
        search.includes('organization_name')
      )
    ) {
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
                await ldClient.identify({
                  kind: 'organization',
                  key: orgId,
                });
              }
              datadogRum.setUser(user?.coldclimate_claims);
            } else {
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
            logError(e, ErrorType.Auth0Error);
            await loginWithRedirect();
          }
          if (get(e, 'error') === 'consent_required') {
            logError(e, ErrorType.Auth0Error);
            await loginWithRedirect();
          }
        }
        logError(e, ErrorType.Auth0Error);
      }
    };

    getUserMetadata();
  }, [
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    appState,
    orgId,
    error,
  ]);

  useEffect(() => {
    if (initialSurveySWR.data?.definition && !needsSignup()) {
      const surveyName = searchParams.get('surveyName');
      if (
        !initialSurveySWR.data.definition.submitted &&
        (!surveyName || (surveyName && surveyName !== 'journey_overview'))
      ) {
        navigate('/home?surveyName=journey_overview');
      }
    }
  });

  if (isLoading || initialSurveySWR.isLoading || signedPolicySWR.isLoading) {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }

  if (error || initialSurveySWR.error || signedPolicySWR.error) {
    let errorMessage;
    if (error) {
      logError(error, ErrorType.Auth0Error);
      if (error.message === 'invitation not found or already used') {
        errorMessage =
          'This link is no longer valid. Please request a new invitation from one of your administrators.';
      }
    }
    if (initialSurveySWR.error) {
      logError(initialSurveySWR.error, ErrorType.SWRError);
    }
    if (signedPolicySWR.error) {
      logError(signedPolicySWR.error, ErrorType.SWRError);
    }

    return <ErrorPage error={errorMessage} />;
  }

  if (isAuthenticated && user) {
    if (needsSignup()) {
      return (
        <SignupPage signedPolicyData={signedPolicySWR.data} userData={user} />
      );
    }

    return <Outlet />;
  } else {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  }
};

export const ProtectedRoute = withErrorBoundary(_ProtectedRoute, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProtectedRoute: ', error);
  },
});
