import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext from '../context/coldContext';
import { ColdAuthProvider } from './coldAuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ColdLDProvider } from './coldLDProvider';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';
import { datadogRum } from '@datadog/browser-rum';
import { ErrorType } from '../enums/errors';
import { ColdMQTTProvider } from "./coldMQTTProvider";

export interface ColdContextProviderProps {
  auth0Options: Auth0ProviderOptions;
  launchDarklyClientSideId: string;
}

export const ColdContextProvider = (
  props: PropsWithChildren<ColdContextProviderProps>,
) => {
  const { auth0Options, launchDarklyClientSideId, children } = props;

  const getImpersonatingOrg = () => {
    const impersonatingOrg = sessionStorage.getItem('impersonatingOrg');
    if (impersonatingOrg) {
      return JSON.parse(impersonatingOrg);
    } else {
      return undefined;
    }
  };

  const [impersonatingOrg, setImpersonatingOrg] = React.useState<
    any | undefined
  >(getImpersonatingOrg());

  const logError = (error: any, type: ErrorType, context?: object) => {
    error.name = type;
    datadogRum.addError(error, context);
  };

  const setSelectedOrg = (org: any) => {
    setImpersonatingOrg(org);
    if (org) {
      sessionStorage.setItem('impersonatingOrg', JSON.stringify(org));
    } else {
      sessionStorage.removeItem('impersonatingOrg');
    }
  };

  return (
    <BrowserRouter>
      <ColdContext.Provider
        value={{
          auth0Options: auth0Options,
          launchDarklyClientSideId: launchDarklyClientSideId,
          logError: logError,
          impersonatingOrg: impersonatingOrg,
          setImpersonatingOrg: setSelectedOrg,
        }}
      >
        <ColdAuthProvider>
          <ColdAxiosInterceptorProvider>
            <ColdLDProvider>
              <ColdMQTTProvider>
                {children}
              </ColdMQTTProvider>
            </ColdLDProvider>
          </ColdAxiosInterceptorProvider>
        </ColdAuthProvider>
      </ColdContext.Provider>
    </BrowserRouter>
  );
};
