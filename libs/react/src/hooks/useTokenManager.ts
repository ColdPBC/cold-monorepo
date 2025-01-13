import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

let accessTokenPromise: Promise<string | null> | null = null;

export const useTokenManager = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const fetchAccessToken = async (): Promise<string | null> => {
    if (!accessTokenPromise) {
      accessTokenPromise = getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_COLD_API_AUDIENCE as string,
          scope: 'offline_access email profile openid',
        }
      })
        .then(token => {
          setAccessToken(token);
          return token;
        })
        .catch(error => {
          console.error('Failed to fetch access token:', error);
          accessTokenPromise = null; // Reset the promise on failure
          return null;
        });
    }
    return accessTokenPromise;
  };

  useEffect(() => {
    if (isAuthenticated && !accessToken) {
      fetchAccessToken();
    }
  }, [isAuthenticated, user]);

  return {
    getAccessToken: fetchAccessToken,
    accessToken,
  };
};
