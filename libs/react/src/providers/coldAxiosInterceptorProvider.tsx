import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import axios from 'axios';
import {resolveAPIUrl, resolveOpenAIServiceURL, resolveStripeIntegrationUrl} from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { ColdContextType } from '@coldpbc/context';
import { forEach, get } from 'lodash';
import { redactTelemetry } from '../lib/telemetryUtils';

const setAxiosTokenInterceptor = async ( auth0Context: Auth0ContextInterface<User>, context: ColdContextType): Promise<void> => {
  const { logBrowser } = context;
  axios.interceptors.request.use(async config => {
    if (config.baseURL === resolveAPIUrl() || config.baseURL === resolveStripeIntegrationUrl() || config.baseURL === resolveOpenAIServiceURL()) {
      const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
      try {
        const accessToken = await auth0Context.getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: 'offline_access email profile openid',
          },
        });
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
        if(get(error, 'error', '') === 'invalid_grant'){
          // delete auth0 data in localstorage
          const keysThatHaveAuth0 = Object.keys(localStorage).filter(key => key.includes('auth0spajs'));
          forEach(keysThatHaveAuth0, key => {
            localStorage.removeItem(key);
          })
        }
        logBrowser('Error getting access token for Axios', 'error', {
          error: error,
        }, error);
        await auth0Context.logout({
          logoutParams: { returnTo: window.location.origin }
        });
      }
    }
    logBrowser(`Axios request sent to ${config.url}`, 'info', {
      method: config.method,
    });
    return config;
  });
};

const setAxiosResponseInterceptor = (coldContext: ColdContextType) => {
  const { logError, logBrowser } = coldContext;
  axios.interceptors.response.use(
    response => {
      logBrowser(`Axios response received from ${response.config.url}`, 'info', {
        method: response.config.method,
        status: response.status,
      });
      return response;
    },
    error => {
      const diagnostics = {
        method: error.config?.method,
        status: error.response?.status,
        code: error.code,
      };
      if (!(error.response && error.response.status === 404 && error.config.url?.includes('/categories'))) {
        logError(redactTelemetry(error), ErrorType.AxiosError, diagnostics);
      }
      logBrowser(`Axios error connecting to ${error.config.url}`, 'error', {
        ...diagnostics,
      });
      return Promise.reject(error);
    },
  );
};

type AxiosInterceptorProviderProps = { children: React.ReactNode };

export const ColdAxiosInterceptorProvider = ({ children }: AxiosInterceptorProviderProps) => {
  const auth0Context = useAuth0();
  const context = useColdContext();
  useEffect(() => {
    const getAccessToken = async () => {
      await setAxiosTokenInterceptor(auth0Context, context);
    };
    getAccessToken();
  }, [auth0Context.getAccessTokenSilently, context]);

  setAxiosResponseInterceptor(context);

  return <>{children}</>;
};
