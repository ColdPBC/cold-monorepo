import { get, set } from 'lodash';
import { getSectionGroupList } from './complianceManagerMQTTMock';

export const defaultMqttTopics = {
	'ui/:env/org_123/:name/complianceManagementPage': getSectionGroupList,
};

export const defaultMqttDataHandler = (topic: string | null, topicHeaders: { [key: string]: (args: any) => any }) => {
	if (!topic) return undefined;
	const matched = getMatchingTopicHeader(topic, Object.keys(topicHeaders));
	if (matched.header === undefined) return undefined;
	const method = get(topicHeaders, matched.header, undefined);
	if (!method) return undefined;
	return method(matched.args);
};

export const getMatchingTopicHeader = (
	topic: string,
	topicHeaders: string[],
): {
	header: string | undefined;
	args: { [key: string]: string };
} => {
	// split the topic into parts by '/'. Split the headers into parts by '/'
	// check if the parts match, expect for parts that have : at the beginning
	// return the first matching header
	const args = {};
	const topicParts = topic.split('/');
	const headersParts = topicHeaders.map(header => header.split('/'));
	const matchingHeader = headersParts.find(parts => {
		const partsLength = parts.length;
		const matched = parts.every((part, index) => {
			if (part.startsWith(':')) return true;
			return part === topicParts[index];
		});
		return matched && partsLength === topicParts.length;
	});
	if (!matchingHeader)
		return {
			header: undefined,
			args: args,
		};

	// get the args from the topic
	matchingHeader.forEach((part, index) => {
		if (part.startsWith(':')) {
			set(args, part.slice(1), topicParts[index]);
		}
	});
	return {
		header: matchingHeader.join('/'),
		args: args,
	};
};
