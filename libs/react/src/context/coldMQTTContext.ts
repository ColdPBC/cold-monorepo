import { createContext } from 'react';
import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { ErrorType } from '../enums/errors';

export type ColdMQTTContextType = {
  subscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
  messages: string[];
};

const ColdMQTTContext = createContext({
  subscribe: (topic: string) => {},
  publish: (topic: string, message: string) => {},
  messages: [] as string[],
} as ColdMQTTContextType);

export default ColdMQTTContext;
