import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useCookies } from '@coldpbc/hooks';

export const Signup = () => {
  const { loginWithRedirect } = useAuth0();
  const { clearCookieData } = useCookies();
  const appState = {
    returnTo: '/',
  };

  useEffect(() => {
    clearCookieData();
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        scope: 'offline_access email profile openid',
      },
      appState: appState,
    });
  });
  return <Outlet />;
};
