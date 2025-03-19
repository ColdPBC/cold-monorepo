import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, {ColdContextType, Organization} from '../../context/coldContext';
import { worker } from '../browser';
import { HttpHandler } from 'msw';
import { SWRConfig, SWRResponse } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '@coldpbc/enums';
import { WizardContext, WizardContextType } from '@coldpbc/components';
import ColdMQTTContext from '../../context/coldMQTTContext';
import { mockMQTTContext } from '../mqtt/mockMQTTContext';
import { defaultMqttDataHandler, defaultMqttTopics } from '../mqtt';
import {
	ColdComplianceQuestionnaireContext,
	ComplianceQuestionnaireContextType,
} from '@coldpbc/context';
import { getComplianceMock, getQuestionnaireSidebarComplianceMock } from '../complianceMock';
import { AIDetails } from '@coldpbc/interfaces';
import { defaultGraphqlMocks } from '../graphql';
import { ColdApolloContext } from '@coldpbc/providers';
import { createMockClient, RequestHandler } from 'mock-apollo-client';
import { DocumentNode, InMemoryCache } from '@apollo/client';
import { forEach, isEqual } from 'lodash';

export interface StoryMockProviderProps {
	handlers?: HttpHandler[];
	memoryRouterProps?: MemoryRouterProps;
	coldContext?: ColdContextType;
	wizardContext?: WizardContextType;
	mqttTopics?: { [key: string]: (args: any) => any };
	complianceQuestionnaireContext?: Partial<ComplianceQuestionnaireContextType>;
	graphqlMocks?: {
		query: DocumentNode;
		handler: RequestHandler;
	}[];
}

export const StoryMockProvider = (props: PropsWithChildren<StoryMockProviderProps>) => {
	const [impersonatingOrg, setImpersonatingOrg] = React.useState<Organization | undefined>(undefined);
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

	const client = createMockClient({
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'no-cache',
				errorPolicy: 'ignore',
			},
			query: {
				fetchPolicy: 'no-cache',
				errorPolicy: 'all',
			},
		},
	});

	const mergedMocks = defaultGraphqlMocks;

	// merge in any custom mocks. remove duplicate queries
	if (props.graphqlMocks) {
		forEach(props.graphqlMocks, mock => {
			const existingMock = mergedMocks.find(existing => isEqual(existing.query, mock.query));
			if (existingMock) {
				mergedMocks.splice(mergedMocks.indexOf(existingMock), 1);
			}
			mergedMocks.push(mock);
		});
	}

	mergedMocks.forEach(mock => {
		client.setRequestHandler(mock.query, mock.handler);
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
				</ColdMQTTContext.Provider>
			</WizardContext.Provider>
		</ColdContext.Provider>
	);
};
