import { SWRSubscription } from 'swr/subscription';

export const mockMQTTContext = (
	handler: (
		topic: string | null,
		topicHeaders: {
			[key: string]: (args: any) => any;
		},
	) => any,
	topicHeaders: { [key: string]: (args: any) => any },
) => {
	const subscribeSWR: SWRSubscription<string, number, Error> = (key: string | null, { next }) => {
		if (!key) {
			return () => {};
		}
		next(null, handler(key, topicHeaders));

		return () => {};
	};

	const publishMessage = (topic: string, message: string) => {
		console.log({ text: 'publishMessage', topic, message });
	};

	return {
		subscribeSWR,
		publishMessage,
		connectionStatus: true,
		client: {
			current: {},
		},
	};
};
