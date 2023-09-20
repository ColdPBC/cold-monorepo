import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useLocation } from 'react-router-dom';

export const Login = () => {
  const { user, loginWithRedirect } = useAuth0();

  const location = useLocation();

  useEffect(() => {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname === '/logout' ? '/' : location.pathname,
      },
    });
  });

  return <Outlet />;
};
