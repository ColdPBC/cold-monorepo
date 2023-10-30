import { createContext } from 'react';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '../enums/errors';

const ColdContext = createContext({
  auth0Options: {} as Auth0ProviderOptions,
  launchDarklyClientSideId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logError: (error: any, type: ErrorType) => {},
});

export default ColdContext;
