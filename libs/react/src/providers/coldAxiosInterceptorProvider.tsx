import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { resolveAPIUrl } from '@coldpbc/fetchers';
import { ErrorType } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';

const setAxiosTokenInterceptor = async (
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions,
  ) => Promise<string>,
): Promise<void> => {
  axios.interceptors.request.use(async (config) => {
    if (config.baseURL === resolveAPIUrl()) {
      const audience = import.meta.env.VITE_COLD_API_AUDIENCE as string;
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: 'offline_access email profile openid',
        },
      });
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });
};

const setAxiosResponseInterceptor = (coldContext: any) => {
  const { logError } = coldContext;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // filter out 404 errors when fetching data from /categories
      if (
        !(
          error.response &&
          error.response.status === 404 &&
          error.config.url?.includes('/categories')
        )
      ) {
        logError(error, ErrorType.AxiosError, {
          ...error,
        });
      }
      return Promise.reject(error);
    },
  );
};

type AxiosInterceptorProviderProps = { children: React.ReactNode };

export const ColdAxiosInterceptorProvider = ({
  children,
}: AxiosInterceptorProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const context = useColdContext();
  useEffect(() => {
    const getAccessToken = async () => {
      await setAxiosTokenInterceptor(getAccessTokenSilently);
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  setAxiosResponseInterceptor(context);

  return <>{children}</>;
};
