import React, { useEffect } from 'react';
import axios from 'axios';
import { resolveAPIUrl, resolveStripeIntegrationUrl } from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import {useColdContext, useTokenManager} from '@coldpbc/hooks';
import { ColdContextType } from '@coldpbc/context';

const setAxiosTokenInterceptor = async (getAccessTokenSilently: () => Promise<string | null>, context: ColdContextType): Promise<void> => {
  const { logBrowser } = context;
  axios.interceptors.request.use(async config => {
    if (config.baseURL === resolveAPIUrl() || config.baseURL === resolveStripeIntegrationUrl()) {
      const accessToken = await getAccessTokenSilently();
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
  const { getAccessToken } = useTokenManager()
  const context = useColdContext();
  useEffect(() => {
    const fetchAccessToken = async () => {
      await setAxiosTokenInterceptor(getAccessToken, context);
    };
    fetchAccessToken();
  }, [getAccessToken]);

  setAxiosResponseInterceptor(context);

  return <>{children}</>;
};
