import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, { ColdContextType } from '../context/coldContext';
import { worker } from './browser';
import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { SWRConfig } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ComplianceManagerStatus, ErrorType } from '@coldpbc/enums';
import { WizardContext, WizardContextType } from '@coldpbc/components';
import ColdMQTTContext from '../context/coldMQTTContext';
import { mockMQTTContext } from './mqtt/mockMQTTContext';
import { defaultMqttDataHandler, defaultMqttTopics, getSectionGroupList } from './mqtt';
import { ColdComplianceManagerContext, ComplianceManagerContextType } from '@coldpbc/context';

export const StoryMockProvider = (
  props: PropsWithChildren<{
    handlers?: RestHandler<MockedRequest<DefaultBodyType>>[];
    memoryRouterProps?: MemoryRouterProps;
    coldContext?: ColdContextType;
    wizardContext?: WizardContextType;
    mqttTopics?: { [key: string]: (args: any) => any };
    complianceManagerContext?: ComplianceManagerContextType;
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
    logBrowser: (message: string, type: any, context?: any, error?: any) => {},
    impersonatingOrg: impersonatingOrg,
    setImpersonatingOrg: setImpersonatingOrg,
  };

  const mqttTopics = props.mqttTopics ? props.mqttTopics : defaultMqttTopics;
  const mqttContextValue = mockMQTTContext(defaultMqttDataHandler, mqttTopics);

  const complianceManagerContextValue = props.complianceManagerContext ?? {
    data: {
      mqttComplianceSet: getSectionGroupList({
        name: 'rei_pia_2024',
      }),
      name: 'rei_pia_2024',
    },
    status: ComplianceManagerStatus.notActivated,
    setStatus: () => {},
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
        <ColdMQTTContext.Provider
          value={{
            client: mqttContextValue.client,
            connectionStatus: mqttContextValue.connectionStatus,
            publishMessage: mqttContextValue.publishMessage,
            subscribeSWR: mqttContextValue.subscribeSWR,
          }}>
          <ColdComplianceManagerContext.Provider value={complianceManagerContextValue}>
            <SWRConfig value={{ provider: () => new Map() }}>
              <MemoryRouter {...props.memoryRouterProps}>{props.children}</MemoryRouter>
            </SWRConfig>
          </ColdComplianceManagerContext.Provider>
        </ColdMQTTContext.Provider>
      </WizardContext.Provider>
    </ColdContext.Provider>
  );
};
