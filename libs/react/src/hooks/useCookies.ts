import cookie from 'js-cookie';
import { useState } from 'react';

export const useCookies = () => {
  // const [cookieExists, setCookieExists] = useState(false);

  const setCookieData = (
    user: any,
    token: string,
    expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  ) => {
    // Store the user and token in a cookie
    cookie.set(
      'coldpbc',
      JSON.stringify({ accessToken: token, expires, user }),
      {
        path: '/',
        sameSite: 'strict',
        secure: true,
      },
    );
    // setCookieExists(true);
  };

  const getCookieData = () => {
    // Get the data from cookie
    const raw = cookie.get('coldpbc');
    const data = raw ? JSON.parse(raw) : null;

    return data;
  };

  const getCookieUser = () => {
    // Get the token from cookie
    const data = getCookieData();

    return data ? data.user : null;
  };

  const getAccessToken = () => {
    // Get the token from cookie
    const data = getCookieData();

    return data ? data.accessToken : null;
  };

  const clearCookieData = () => {
    cookie.remove('coldpbc');
  };

  return {
    setCookieData,
    getAccessToken,
    getCookieUser,
    getCookieData,
    clearCookieData,
    // cookieExists,
    // setCookieExists,
  };
};
