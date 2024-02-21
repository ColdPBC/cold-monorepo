import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, { ColdContextType } from '../context/coldContext';
import { worker } from './browser';
import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { SWRConfig } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '@coldpbc/enums';
import { WizardContextType, WizardContext } from '@coldpbc/components';

export const StoryMockProvider = (
  props: PropsWithChildren<{
    handlers?: RestHandler<MockedRequest<DefaultBodyType>>[];
    memoryRouterProps?: MemoryRouterProps;
    coldContext?: ColdContextType;
    wizardContext?: WizardContextType;
  }>,
) => {
  const [impersonatingOrg, setImpersonatingOrg] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    worker && worker.use(...(props.handlers ?? []));
    return () => {
      // clear added handler on dismount, so stories that don't have custom handlers don't get this data
      worker && worker.resetHandlers();
    };
  });

  const coldContextValue = props.coldContext ?? {
    auth0Options: {
      domain: '',
      clientId: '',
      authorizationParams: {
        audience: '',
      },
    } as Auth0ProviderOptions,
    launchDarklyClientSideId: '',
    logError: (error: any, type: ErrorType, context?: object) => {},
    impersonatingOrg: impersonatingOrg,
    setImpersonatingOrg: setImpersonatingOrg,
  };

  return (
    // so swr doesn't cache between stories
    <ColdContext.Provider value={coldContextValue}>
      <WizardContext.Provider
        value={
          props.wizardContext ?? {
            nextStep: () => {},
            prevStep: () => {},
            setCurrentStep: () => {},
            currentStep: {
              title: '',
              name: '',
              route: '',
            },
            data: {},
            navigateToStep: () => {},
          }
        }>
        <SWRConfig value={{ provider: () => new Map() }}>
          <MemoryRouter {...props.memoryRouterProps}>{props.children}</MemoryRouter>
        </SWRConfig>
      </WizardContext.Provider>
    </ColdContext.Provider>
  );
};
