import React, { PropsWithChildren, useEffect } from 'react';
import ColdContext, {ColdContextType, Organization} from '../../context/coldContext';
import { worker } from '../browser';
import { HttpHandler } from 'msw';
import { SWRConfig } from 'swr';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '@coldpbc/enums';
import { WizardContext, WizardContextType } from '@coldpbc/components';
import ColdMQTTContext from '../../context/coldMQTTContext';
import { mockMQTTContext } from '../mqtt';
import { defaultMqttDataHandler, defaultMqttTopics } from '../mqtt';
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
            <ColdApolloContext.Provider
              value={{
                client: client,
              }}>
              <SWRConfig value={{ provider: () => new Map() }}>
                <MemoryRouter {...props.memoryRouterProps}>{props.children}</MemoryRouter>
              </SWRConfig>
            </ColdApolloContext.Provider>
				</ColdMQTTContext.Provider>
			</WizardContext.Provider>
		</ColdContext.Provider>
	);
};
