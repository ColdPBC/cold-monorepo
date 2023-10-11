import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import axios from 'axios';
import { resolveAPIUrl } from '@coldpbc/fetchers';

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

type AxiosInterceptorProviderProps = { children: React.ReactNode };

export const ColdAxiosInterceptorProvider = ({
  children,
}: AxiosInterceptorProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      await setAxiosTokenInterceptor(getAccessTokenSilently);
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  return <>{children}</>;
};
