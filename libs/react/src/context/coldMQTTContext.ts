import { createContext } from 'react';
import { SWRSubscription } from 'swr/subscription';

export type ColdMQTTContextType = {
	subscribeSWR: SWRSubscription<string | null, number, Error>;
	publishMessage: (topic: string, message: string) => void;
	connectionStatus: boolean;
	client: any | null;
};

const ColdMQTTContext = createContext({
	subscribeSWR: (key, { next }) => {},
	publishMessage: (topic: string, message: string) => {},
	connectionStatus: false,
	client: null,
} as ColdMQTTContextType);

export default ColdMQTTContext;
