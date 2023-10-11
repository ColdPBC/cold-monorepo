import React, { PropsWithChildren } from 'react';
import ColdContext from '../context/coldContext';
import { ColdAuthProvider } from './coldAuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ColdLDProvider } from './coldLDProvider';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';

export interface ColdContextProviderProps {
  auth0Options: Auth0ProviderOptions;
  launchDarklyClientSideId: string;
}

export const ColdContextProvider = (
  props: PropsWithChildren<ColdContextProviderProps>,
) => {
  const { auth0Options, launchDarklyClientSideId, children } = props;

  return (
    <BrowserRouter>
      <ColdContext.Provider
        value={{
          auth0Options: auth0Options,
          launchDarklyClientSideId: launchDarklyClientSideId,
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
