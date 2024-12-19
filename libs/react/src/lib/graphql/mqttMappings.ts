export const mqttMappings: {
  [key: string]: string[];
} = {
  organization_files: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
  attribute_assurances: ['GET_ALL_FILES', 'GET_ALL_SUS_ATTRIBUTES', 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT', 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT'],
};

const isOrgKey = (key: string, orgId: string) => (key.includes('organization') || key.includes('organizationId')) && key.includes(orgId);

const hasQuery = (key: string, query: string) => key.includes(query);

export const getQueryMappingsForKey = (key: string, cacheKeys: string[], orgId: string): string[] => {
  const firstPart = key.split('.')[0];
  const queryKeys = mqttMappings[firstPart] || [];
  return queryKeys.flatMap(query =>
		cacheKeys.filter(cacheKey => (isOrgKey(cacheKey, orgId) || !(cacheKey.includes('organization') || cacheKey.includes('organizationId'))) && hasQuery(cacheKey, query)),
	);
};
