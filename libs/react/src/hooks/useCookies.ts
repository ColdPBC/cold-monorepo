import cookie from 'js-cookie';

export const useCookies = () => {
  const setCookieData = (
    user: any,
    token: string,
    expires = new Date(1000 * 60 * 60 * 24),
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
  };

  return { setCookieData, getAccessToken, getCookieUser, getCookieData };
};

export const getCookieData = () => {
  // Get the data from cookie
  const raw = cookie.get('coldpbc');
  const data = raw ? JSON.parse(raw) : null;

  return data;
};

export const getCookieUser = () => {
  // Get the token from cookie
  const data = getCookieData();

  return data ? data.user : null;
};

export const getAccessToken = () => {
  // Get the token from cookie
  const data = getCookieData();

  return data ? data.accessToken : null;
};
