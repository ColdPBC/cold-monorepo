export const mqttMappings: {
  [key: string]: string[];
} = {
  organization_files: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
  attribute_assurances: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
};

const queryContainsExactWord = (query: string, word: string) => {
  const regex = new RegExp(`\\b${word}\\b`, 'g');
  return regex.test(query);
}

const containsOrganizationReference = (key: string) => queryContainsExactWord(key, 'organization') || queryContainsExactWord(key, 'organizationId');

const isOrgKey = (key: string, orgId: string) => containsOrganizationReference(key) && queryContainsExactWord(key, orgId);

export const getQueryMappingsForKey = (key: string, cacheKeys: string[], orgId: string): string[] => {
  const firstPart = key.split('.')[0];
  const queryKeys = mqttMappings[firstPart] || [];
  const newCacheKeys = cacheKeys.filter(cacheKey => queryKeys.some(queryKey => queryContainsExactWord(cacheKey, queryKey)));
  return queryKeys.flatMap(query =>
    newCacheKeys.filter(cacheKey => {
			return (isOrgKey(cacheKey, orgId) || !(containsOrganizationReference(cacheKey))) && queryContainsExactWord(cacheKey, query);
		}),
	);
};
