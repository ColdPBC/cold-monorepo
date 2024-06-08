import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, { ColdContextType } from '../context/coldContext';
import { worker } from './browser';
import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { SWRConfig, SWRResponse } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ComplianceManagerStatus, ErrorType } from '@coldpbc/enums';
import { WizardContext, WizardContextType } from '@coldpbc/components';
import ColdMQTTContext from '../context/coldMQTTContext';
import { mockMQTTContext } from './mqtt/mockMQTTContext';
import { defaultMqttDataHandler, defaultMqttTopics, getSectionGroupList } from './mqtt';
import { ColdComplianceManagerContext, ColdComplianceQuestionnaireContext, ComplianceManagerContextType, ComplianceManagerData } from '@coldpbc/context';
import { getAllFilesMock } from './filesMock';

export interface StoryMockProviderProps {
  handlers?: RestHandler<MockedRequest<DefaultBodyType>>[];
  memoryRouterProps?: MemoryRouterProps;
  coldContext?: ColdContextType;
  wizardContext?: WizardContextType;
  mqttTopics?: { [key: string]: (args: any) => any };
  complianceManagerContext?: Partial<{
    data: Partial<ComplianceManagerData>;
    status: ComplianceManagerStatus;
    setStatus: (status: ComplianceManagerStatus) => void;
    complianceCounts: {
      [key: string]: {
        not_started: number;
        ai_answered: number;
        user_answered: number;
        bookmarked: number;
      };
    };
    setComplianceCounts: React.Dispatch<
      React.SetStateAction<{
        [key: string]: {
          not_started: number;
          ai_answered: number;
          user_answered: number;
          bookmarked: number;
        };
      }>
    >;
    showOverviewModal: boolean;
    setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  complianceQuestionnaireContext?: Partial<{
    activeQuestion: string | null;
    setActiveQuestion: (questionId: string | null) => void;
  }>;
}

export const StoryMockProvider = (props: PropsWithChildren<StoryMockProviderProps>) => {
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
    logBrowser: (message: string, type: any, context?: any, error?: any) => {
      console.log({ message, type, context, error });
    },
    impersonatingOrg: impersonatingOrg,
    setImpersonatingOrg: setImpersonatingOrg,
  };

  const mqttTopics = props.mqttTopics ? props.mqttTopics : defaultMqttTopics;
  const mqttContextValue = mockMQTTContext(defaultMqttDataHandler, mqttTopics);

  const [complianceCounts, setComplianceCounts] = React.useState<{
    [key: string]: {
      not_started: number;
      ai_answered: number;
      user_answered: number;
      bookmarked: number;
    };
  }>(props.complianceManagerContext?.complianceCounts || {});
  const [status, setStatus] = React.useState<ComplianceManagerStatus>(props.complianceManagerContext?.status || ComplianceManagerStatus.notActivated);
  const [showOverviewModal, setShowOverviewModal] = React.useState<boolean>(props.complianceManagerContext?.showOverviewModal || false);

  const complianceManagerContextData: ComplianceManagerData = {
    mqttComplianceSet: getSectionGroupList({
      name: 'rei_pia_2024',
    }),
    name: 'rei_pia_2024',
    files: {
      data: getAllFilesMock(),
      error: undefined,
      revalidate: () => {},
      isValidating: false,
      isLoading: false,
      mutate: () => Promise.resolve(),
    } as SWRResponse<any[], any, any>,
    currentAIStatus: undefined,
    orgCompliances: undefined,
    ...props.complianceManagerContext?.data,
  };

  const complianceManagerContextValue: ComplianceManagerContextType = {
    ...props.complianceManagerContext,
    data: complianceManagerContextData,
    status,
    setStatus: props.complianceManagerContext?.setStatus || setStatus,
    complianceCounts,
    setComplianceCounts: props.complianceManagerContext?.setComplianceCounts || setComplianceCounts,
    showOverviewModal,
    setShowOverviewModal: props.complianceManagerContext?.setShowOverviewModal || setShowOverviewModal,
  };

  const [complianceQuestionnaireActiveQuestion, setComplianceQuestionnaireActiveQuestion] = React.useState<string | null>(
    props.complianceQuestionnaireContext?.activeQuestion ?? null,
  );

  const complianceQuestionnaireContextValue = {
    name: 'rei_pia_2024',
    ...props.complianceQuestionnaireContext,
    activeQuestion: complianceQuestionnaireActiveQuestion,
    setActiveQuestion: props.complianceQuestionnaireContext?.setActiveQuestion ?? setComplianceQuestionnaireActiveQuestion,
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
            <ColdComplianceQuestionnaireContext.Provider value={complianceQuestionnaireContextValue}>
              <SWRConfig value={{ provider: () => new Map() }}>
                <MemoryRouter {...props.memoryRouterProps}>{props.children}</MemoryRouter>
              </SWRConfig>
            </ColdComplianceQuestionnaireContext.Provider>
          </ColdComplianceManagerContext.Provider>
        </ColdMQTTContext.Provider>
      </WizardContext.Provider>
    </ColdContext.Provider>
  );
};
