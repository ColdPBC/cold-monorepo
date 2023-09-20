import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import cookie from 'js-cookie';

export const Logout = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const clearSession = () => {
      // Save the access token to local storage or a secure store if needed
      sessionStorage.clear();
      // Remove the cookie
      cookie.remove('coldpbc');
      // Redirect to the home page
      logout();
    };

    clearSession();
  }, [logout, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
