import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext from '../context/coldContext';
import { ColdAuthProvider } from './coldAuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ColdLDProvider } from './coldLDProvider';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';
import { datadogRum } from '@datadog/browser-rum';
import { ErrorType } from '../enums/errors';

export interface ColdContextProviderProps {
  auth0Options: Auth0ProviderOptions;
  launchDarklyClientSideId: string;
}

export const ColdContextProvider = (
  props: PropsWithChildren<ColdContextProviderProps>,
) => {
  const { auth0Options, launchDarklyClientSideId, children } = props;
  const [impersonatingOrg, setImpersonatingOrg] = React.useState<
    any | undefined
  >(undefined);

  const logError = (error: any, type: ErrorType) => {
    error.name = type;
    datadogRum.addError(error);
  };

  return (
    <BrowserRouter>
      <ColdContext.Provider
        value={{
          auth0Options: auth0Options,
          launchDarklyClientSideId: launchDarklyClientSideId,
          logError: logError,
          impersonatingOrg: impersonatingOrg,
          setImpersonatingOrg: setImpersonatingOrg,
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
