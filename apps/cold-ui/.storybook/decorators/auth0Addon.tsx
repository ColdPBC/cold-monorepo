// eslint-disable-next-line @nx/enforce-module-boundaries
import { auth0UserMock, muiTheme } from '../../../../libs/react/src';
import { get } from 'lodash';
import { Auth0Context } from '@auth0/auth0-react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC } from 'react';
import { LaunchDarkly } from './launchdarkly';

export const Auth0Addon = (
  Story: FC<unknown>,
  options: {
    parameters: {
      [key: string]: any;
    };
  },
) => {
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
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={muiTheme}>
          <Auth0Context.Provider
            value={{
              ...initialState,
              ...auth0Parameter,
            }}>
            <LaunchDarkly Story={Story} options={options} />
          </Auth0Context.Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};
