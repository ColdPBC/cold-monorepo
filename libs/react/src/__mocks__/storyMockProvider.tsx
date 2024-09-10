import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, { ColdContextType } from '../context/coldContext';
import { worker } from './browser';
import { HttpHandler } from 'msw';
import { SWRConfig, SWRResponse } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ComplianceManagerStatus, ErrorType } from '@coldpbc/enums';
import { WizardContext, WizardContextType } from '@coldpbc/components';
import ColdMQTTContext from '../context/coldMQTTContext';
import { mockMQTTContext } from './mqtt/mockMQTTContext';
import { defaultMqttDataHandler, defaultMqttTopics } from './mqtt';
import {
	ColdComplianceManagerContext,
	ColdComplianceQuestionnaireContext,
	ComplianceManagerContextType,
	ComplianceManagerData,
	ComplianceQuestionnaireContextType,
} from '@coldpbc/context';
import { getAllFilesMock } from './filesMock';
import { getComplianceCountsMock, getComplianceMock, getQuestionnaireSidebarComplianceMock } from './complianceMock';
import { AIDetails, ComplianceManagerCountsPayload, ComplianceSidebarPayload } from '@coldpbc/interfaces';
import { defaultGraphqlMocks } from './graphql';
import { ColdApolloContext } from '@coldpbc/providers';
import { createMockClient } from 'mock-apollo-client';
import { forEach } from 'lodash';
import { DocumentNode } from '@apollo/client';

export interface StoryMockProviderProps {
	handlers?: HttpHandler[];
	memoryRouterProps?: MemoryRouterProps;
	coldContext?: ColdContextType;
	wizardContext?: WizardContextType;
	mqttTopics?: { [key: string]: (args: any) => any };
	complianceManagerContext?: Partial<{
		data: Partial<ComplianceManagerData>;
		status: ComplianceManagerStatus;
		setStatus: (status: ComplianceManagerStatus) => void;
		showOverviewModal: boolean;
		setShowOverviewModal: React.Dispatch<React.SetStateAction<boolean>>;
	}>;
	complianceQuestionnaireContext?: Partial<ComplianceQuestionnaireContextType>;
	graphqlMocks?: {
		query: DocumentNode;
		resolver: () => Promise<any>;
	}[];
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

	const [status, setStatus] = React.useState<ComplianceManagerStatus>(props.complianceManagerContext?.status || ComplianceManagerStatus.notActivated);
	const [showOverviewModal, setShowOverviewModal] = React.useState<boolean>(props.complianceManagerContext?.showOverviewModal || false);

	const complianceManagerContextData: ComplianceManagerData = {
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
		complianceCounts: {
			data: getComplianceCountsMock(),
			error: undefined,
			revalidate: () => {},
			isValidating: false,
			isLoading: false,
			mutate: () => Promise.resolve(),
		} as SWRResponse<ComplianceManagerCountsPayload, any, any>,
		sectionGroups: {
			data: getQuestionnaireSidebarComplianceMock(),
			error: undefined,
			revalidate: () => {},
			isValidating: false,
			isLoading: false,
			mutate: () => Promise.resolve(),
		} as SWRResponse<ComplianceSidebarPayload, any, any>,
		compliance: getComplianceMock().find(c => c.name === 'rei_pia_2024'),
		...props.complianceManagerContext?.data,
	};

	const complianceManagerContextValue: ComplianceManagerContextType = {
		...props.complianceManagerContext,
		data: complianceManagerContextData,
		status,
		setStatus: props.complianceManagerContext?.setStatus || setStatus,
		showOverviewModal,
		setShowOverviewModal: props.complianceManagerContext?.setShowOverviewModal || setShowOverviewModal,
	};

	const [complianceQuestionnaireFocusQuestion, setComplianceQuestionnaireFocusQuestion] = React.useState<{
		key: string;
		aiDetails: AIDetails;
	} | null>(props.complianceQuestionnaireContext?.focusQuestion ?? null);

	const [complianceQuestionnaireScrollToQuestion, setComplianceQuestionnaireScrollToQuestion] = React.useState<string | null>(
		props.complianceQuestionnaireContext?.scrollToQuestion ?? null,
	);

	const complianceQuestionnaireContextValue: ComplianceQuestionnaireContextType = {
		name: 'rei_pia_2024',
		sectionGroups: {
			data: getQuestionnaireSidebarComplianceMock(),
			error: undefined,
			revalidate: () => {},
			isValidating: false,
			isLoading: false,
			mutate: () => Promise.resolve(),
		} as SWRResponse<any, any, any>,
		complianceDefinition: getComplianceMock().find(c => c.name === 'rei_pia_2024'),
		...props.complianceQuestionnaireContext,
		scrollToQuestion: complianceQuestionnaireScrollToQuestion,
		setScrollToQuestion: props.complianceQuestionnaireContext?.setScrollToQuestion ?? setComplianceQuestionnaireScrollToQuestion,
		focusQuestion: complianceQuestionnaireFocusQuestion,
		setFocusQuestion: props.complianceQuestionnaireContext?.setFocusQuestion ?? setComplianceQuestionnaireFocusQuestion,
	};

	const client = createMockClient();

	forEach(props.graphqlMocks ? props.graphqlMocks : defaultGraphqlMocks, mock => {
		client.setRequestHandler(mock.query, mock.resolver);
	});

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
							<ColdApolloContext.Provider
								value={{
									client: client,
								}}>
								<SWRConfig value={{ provider: () => new Map() }}>
									<MemoryRouter {...props.memoryRouterProps}>{props.children}</MemoryRouter>
								</SWRConfig>
							</ColdApolloContext.Provider>
						</ColdComplianceQuestionnaireContext.Provider>
					</ColdComplianceManagerContext.Provider>
				</ColdMQTTContext.Provider>
			</WizardContext.Provider>
		</ColdContext.Provider>
	);
};
