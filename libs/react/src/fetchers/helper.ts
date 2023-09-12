import {get} from 'lodash';

/**
 * Helper function to resolve URL based on where the app is running.
 * Moved the logic here since it was already in two places
 */
export const resolveAPIUrl = (): string => {
  // get the api url from the environment variable.
  // If storybook is running then use STORYBOOK_API_URL.
  // Otherwise when running locally and other environments use VITE_API_BASE_URL.
  return (
    import.meta.env.STORYBOOK_API_URL ||
    get(import.meta.env, 'VITE_API_BASE_URL', 'http://localhost:7001')
  );
};
