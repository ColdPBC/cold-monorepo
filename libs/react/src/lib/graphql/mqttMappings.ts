import { forEach } from 'lodash';

export const mqttMappings: {
	[key: string]: string[];
} = {
	organization_files: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
	attribute_assurances: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
};

export const getQueryMappingsForKey = (key: string): string[] => {
	const mappings: string[] = [];
	// Check the swr key against the mqttMappings object. the key example is 'organization_files.uploaded'.
	// Get the first word separated by a dot.
	forEach(mqttMappings, (value, query) => {
		if (key.startsWith(query)) {
			mappings.push(...value);
		}
	});

	return mappings;
};
