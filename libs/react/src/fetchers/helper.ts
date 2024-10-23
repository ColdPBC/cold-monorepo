import {get} from 'lodash';

/**
 * Helper function to resolve URL based on where the app is running.
 * Moved the logic here since it was already in two places
 */
export const resolveAPIUrl = (): string => {
	// get the api url from the environment variable.
	// If storybook is running then use STORYBOOK_API_URL.
	// Otherwise when running locally and other environments use VITE_API_BASE_URL.
	return import.meta.env.STORYBOOK_API_URL || get(import.meta.env, 'VITE_API_BASE_URL', 'http://localhost:7001');
};

export const resolveNodeEnv = (): string => {
	return get(import.meta.env, 'VITE_DD_ENV', 'development');
};

export const resolveStripeIntegrationUrl = (): string => {
	return import.meta.env.STORYBOOK_API_URL || get(import.meta.env, 'VITE_STRIPE_INTEGRATION_URL', 'http://localhost:7005');
};

export const resolveGraphQLUrl = (): string => {
	return `${import.meta.env.STORYBOOK_API_URL || get(import.meta.env, 'VITE_GRAPHQL_URL', 'http://localhost:9001')}/`;
};
