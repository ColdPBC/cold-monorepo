import { get } from 'lodash';

/**
 * Helper function to resolve URL based on where the app is running.
 * Moved the logic here since it was already in two places
 */
export const resolveAPIUrl = (): string => {
  // if running in storybook then use bogus url that isn't localhost
  if(typeof global.process === 'undefined' || global.process.title === 'browser') {
    return "https://api.coldclimate.test";
  }

  return process.env.VITE_API_BASE_URL || get(import.meta.env, 'VITE_API_BASE_URL', 'http://localhost:7001');
}
