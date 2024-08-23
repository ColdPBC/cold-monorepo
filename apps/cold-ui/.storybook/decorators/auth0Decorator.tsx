// eslint-disable-next-line @nx/enforce-module-boundaries
import { auth0UserMock } from '../../../../libs/react/src';
import { get } from 'lodash';
import { Auth0Context } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';

export const Auth0Decorator = (
  props: PropsWithChildren<{
    options: {
      parameters: {
        [key: string]: any;
      };
    };
  }>,
) => {
  const { options, children } = props;
  const { parameters } = options;
  const initialState = {
    isLoading: false,
    isAuthenticated: true,
    getAccessTokenSilently: () => {
      return 'accessToken';
    },
    getAccessTokenWithPopup: () => {},
    getIdTokenClaims: () => {},
    loginWithRedirect: () => {},
    loginWithPopup: () => {},
    logout: () => {},
    handleRedirectCallback: () => {},
    buildAuthorizeUrl: () => {},
    buildLogoutUrl: () => {},
    user: auth0UserMock,
  };
  const auth0Parameter = get(parameters, 'auth0AddOn', {});

  return (
    <Auth0Context.Provider
      value={{
        ...initialState,
        ...auth0Parameter,
      }}>
      {children}
    </Auth0Context.Provider>
  );
};
