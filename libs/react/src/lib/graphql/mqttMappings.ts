const mqttMappings: {
  [key: string]: string[];
} = {
  organization_files: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_UPLOADS'],
  attribute_assurances: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_UPLOADS'],
};

const urlMappings = {
  organization_files: ['organizations', 'files'],
  attribute_assurances: ['organizations', 'files'],
};

function mapUrlToKey(apiUrl: string, expectedOrgId: string) {
  // Extract the path segments from the URL
  const urlSegments = apiUrl.split('/').filter(segment => segment);

  // Check if the URL contains the expected organization ID
  if (!urlSegments.includes(expectedOrgId)) {
    return null; // Organization ID not found in URL
  }

  // Iterate through the predefined mappings
  for (const [key, segments] of Object.entries(urlMappings)) {
    // Check if all segments in the mapping are present in the URL segments
    if (segments.every(segment => urlSegments.includes(segment))) {
      return key;
    }
  }

  // Return null if no mapping is found
  return null;
}

export const queryContainsExactWord = (query: string, word: string) => {
  const regex = new RegExp(`\\b${word}\\b`, 'g');
  return regex.test(query);
}

export const containsOrganizationReference = (key: string) => queryContainsExactWord(key, 'organization') || queryContainsExactWord(key, 'organizationId');

export const isOrgKey = (key: string, orgId: string) => containsOrganizationReference(key) && queryContainsExactWord(key, orgId);

export const getQueryMappingsForKey = (key: string, cacheKeys: string[], orgId: string): string[] => {
  let mappingKey: string | null = null;

  if (key.includes('/')) {
    // Treat 'key' as a URL path
    mappingKey = mapUrlToKey(key, orgId);
  } else {
    // Treat 'key' as a dot-separated string
    mappingKey = key.split('.')[0];
  }

  if(!mappingKey) {
    return []
  }

  const queryKeys = mqttMappings[mappingKey] || [];

  const newCacheKeys = cacheKeys.filter(cacheKey => queryKeys.some(queryKey => queryContainsExactWord(cacheKey, queryKey)));
  return queryKeys.flatMap(query =>
    newCacheKeys.filter(cacheKey => {
			return (isOrgKey(cacheKey, orgId) || !(containsOrganizationReference(cacheKey))) && queryContainsExactWord(cacheKey, query);
		}),
	);
};
