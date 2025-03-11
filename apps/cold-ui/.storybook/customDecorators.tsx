import {LicenseInfo} from "@mui/x-license";
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {auth0UserMock, muiTheme} from "../../../libs/react/src";
import {DecoratorFunction} from "@storybook/core-common";
import {get} from "lodash";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { Auth0Context } from "@auth0/auth0-react";

export const ADDON_ID = "storybook/addon-auth0-react";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `auth0AddOn`;
export const defaultAuth0State = {
  isLoading: false,
  isAuthenticated: false,
  getAccessTokenSilently: (): any => null,
  getAccessTokenWithPopup: (): any  => null,
  getIdTokenClaims: (): any  => null,
  loginWithRedirect: (): any  => null,
  loginWithPopup: (): any  => null,
  logout: (): any  => null,
  handleRedirectCallback: (): any  => null,
  buildAuthorizeUrl: (): any  => null,
  buildLogoutUrl: (): any  => null,
  user: undefined,
}

export const CustomDecorators = (Story, context, licenseKey: string) => {
  const { parameters } = context;
  const initialAuth0State = {
    ...defaultAuth0State,
    ...get(parameters, PARAM_KEY, {})
  }

  LicenseInfo.setLicenseKey(licenseKey);

  return (
    // @ts-ignore
    <Auth0Context.Provider value={initialAuth0State}>
      {/* @ts-ignore */}
      <StyledEngineProvider injectFirst>
        {/* @ts-ignore */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* @ts-ignore */}
          <ThemeProvider theme={muiTheme}>
            {Story()}
          </ThemeProvider>
        </LocalizationProvider>
      </StyledEngineProvider>
    </Auth0Context.Provider>
  )
}
