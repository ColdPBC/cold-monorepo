import React, { PropsWithChildren } from 'react';
import ColdContext from '../context/coldContext';
import { ColdAuthProvider } from './coldAuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ColdLDProvider } from './coldLDProvider';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';
import { datadogRum } from '@datadog/browser-rum';
import { ErrorType } from '../enums/errors';
import { ColdMQTTProvider } from './coldMQTTProvider';
import { datadogLogs, StatusType } from '@datadog/browser-logs';
import { ColdApolloProvider } from './coldApolloProvider';

export interface ColdContextProviderProps {
  auth0Options: Auth0ProviderOptions;
  launchDarklyClientSideId: string;
}

export const ColdContextProvider = (props: PropsWithChildren<ColdContextProviderProps>) => {
  const { auth0Options, launchDarklyClientSideId, children } = props;

  const getImpersonatingOrg = () => {
    const impersonatingOrg = sessionStorage.getItem('impersonatingOrg');
    if (impersonatingOrg) {
      return JSON.parse(impersonatingOrg);
    } else {
      return undefined;
    }
  };

  const [impersonatingOrg, setImpersonatingOrg] = React.useState<any | undefined>(getImpersonatingOrg());

  const logError = (error: any, type: ErrorType, context?: object) => {
    error.name = type;
    datadogRum.addError(error, context);
  };

  const logBrowser = (message: string, type: StatusType, context?: any, error?: any) => {
    console.log(message, context, type, error);
    datadogLogs.logger.log(message, context, type, error);
  };

  const setSelectedOrg = (org: any) => {
    logBrowser('Impersonating new organization', 'info', { org: org });
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
          logBrowser: logBrowser,
          impersonatingOrg: impersonatingOrg,
          setImpersonatingOrg: setSelectedOrg,
        }}>
        <ColdAuthProvider>
          <ColdAxiosInterceptorProvider>
            <ColdLDProvider>
              <ColdMQTTProvider>
                <ColdApolloProvider>{children}</ColdApolloProvider>
              </ColdMQTTProvider>
            </ColdLDProvider>
          </ColdAxiosInterceptorProvider>
        </ColdAuthProvider>
      </ColdContext.Provider>
    </BrowserRouter>
  );
};
