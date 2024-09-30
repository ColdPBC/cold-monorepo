import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { resolveAPIUrl, resolveStripeIntegrationUrl } from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';
import { ColdContextType } from '@coldpbc/context';

const setAxiosTokenInterceptor = async (getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>, context: ColdContextType): Promise<void> => {
  const { logBrowser } = context;
  axios.interceptors.request.use(async config => {
    if (config.baseURL === resolveAPIUrl() || config.baseURL === resolveStripeIntegrationUrl()) {
      const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: 'offline_access email profile openid',
        },
      });
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    logBrowser(`Axios request sent to ${config.url}`, 'info', {
      config: config
    });
    return config;
  });
};

const setAxiosResponseInterceptor = (coldContext: ColdContextType) => {
  const { logError, logBrowser } = coldContext;
  axios.interceptors.response.use(
    response => {
      logBrowser(`Axios response received from ${response.config.url}`, 'info', {
        response: {
          ...response,
          data: undefined
        }
      });
      return response;
    },
    error => {
      if (!(error.response && error.response.status === 404 && error.config.url?.includes('/categories'))) {
        logError(error, ErrorType.AxiosError, {
          error: error
        });
      }
      logBrowser(`Axios error connecting to ${error.config.url}`, 'error', {
        error: error
      });
      return Promise.reject(error);
    },
  );
};

type AxiosInterceptorProviderProps = { children: React.ReactNode };

export const ColdAxiosInterceptorProvider = ({ children }: AxiosInterceptorProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const context = useColdContext();
  useEffect(() => {
    const getAccessToken = async () => {
      await setAxiosTokenInterceptor(getAccessTokenSilently, context);
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  setAxiosResponseInterceptor(context);

  return <>{children}</>;
};
