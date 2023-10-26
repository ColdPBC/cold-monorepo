import React, { PropsWithChildren } from 'react';
import ColdContext from '../context/coldContext';
import { ColdAuthProvider } from './coldAuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ColdLDProvider } from './coldLDProvider';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';
import { datadogRum, RumInitConfiguration } from '@datadog/browser-rum';
import { ErrorType } from '../enums/errors';

export interface ColdContextProviderProps {
  auth0Options: Auth0ProviderOptions;
  launchDarklyClientSideId: string;
  ddRumClientConfig: RumInitConfiguration;
}

export const ColdContextProvider = (
  props: PropsWithChildren<ColdContextProviderProps>,
) => {
  const {
    auth0Options,
    launchDarklyClientSideId,
    ddRumClientConfig,
    children,
  } = props;

  datadogRum.init(ddRumClientConfig);
  datadogRum.startSessionReplayRecording();

  const logError = (error: any, type: ErrorType) => {
    switch (type) {
      case ErrorType.SWRError:
        error.name = 'SWRError';
        datadogRum.addError(error);
        break;
      case ErrorType.RenderingError:
        error.name = 'RenderingError';
        datadogRum.addError(error);
        break;
      case ErrorType.Auth0Error:
        error.name = 'Auth0Error';
        datadogRum.addError(error);
        break;
    }
  };

  return (
    <BrowserRouter>
      <ColdContext.Provider
        value={{
          auth0Options: auth0Options,
          launchDarklyClientSideId: launchDarklyClientSideId,
          logError: logError,
        }}
      >
        <ColdAuthProvider>
          <ColdAxiosInterceptorProvider>
            <ColdLDProvider>{children}</ColdLDProvider>
          </ColdAxiosInterceptorProvider>
        </ColdAuthProvider>
      </ColdContext.Provider>
    </BrowserRouter>
  );
};
