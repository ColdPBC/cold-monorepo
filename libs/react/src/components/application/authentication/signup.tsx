import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';

export const Signup = () => {
  const { loginWithRedirect } = useAuth0();

  const appState = {
    returnTo: window.location.pathname,
  };

  useEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
      appState: appState,
    });
  });
  return <Outlet />;
};
