import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import cookie from 'js-cookie';

const Logout = () => {
  const { error, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const clearSession = async () => {
      try {
        // Save the access token to local storage or a secure store if needed
        sessionStorage.clear();
        // Remove the cookie
        cookie.remove('coldpbc');
        // Redirect to the home page
        logout();
        navigate('/');
      } catch (e) {
        console.error('Failed to clear session and cookies', e);
      }
    };

    clearSession();
  }, [logout, error, navigate, 'coldpbc']);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Logout;
