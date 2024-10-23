import { createContext } from 'react';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '../enums/errors';
import { StatusType } from '@datadog/browser-logs';

export type ColdContextType = {
	auth0Options: Auth0ProviderOptions;
	launchDarklyClientSideId: string;
	logError: (error: any, type: ErrorType, context?: object) => void;
	logBrowser: (message: string, type: StatusType, context?: any, error?: any) => void;
	impersonatingOrg: Organization | undefined;
	setImpersonatingOrg: (org: Organization | undefined) => void;
};

export type Organization = {
	id: string;
	name: string;
	display_name: string;
};

const ColdContext = createContext({
	auth0Options: {} as Auth0ProviderOptions,
	launchDarklyClientSideId: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	logError: (error: any, type: ErrorType, context?: object) => {},
	logBrowser: (message: string, type: StatusType, context?: any, error?: any) => {},
	impersonatingOrg: undefined as Organization | undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setImpersonatingOrg: (org: Organization | undefined) => {},
} as ColdContextType);

export default ColdContext;
