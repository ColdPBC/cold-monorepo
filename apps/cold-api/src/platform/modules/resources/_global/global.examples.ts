import { ZodSurveyTypesSchema } from '@coldpbc/nest';
import fakerator from 'fakerator';
import { v4 } from 'uuid';

const fakeDataGenerator = fakerator();
//TODO: Deprecate this file!
export const testOrgIdExample = '{{cold_org_id}}';
export const authenticatedUserExample = {
  company_id: null,
  coldclimate_claims: {
    email: 'test@test.com',
    org_id: 'org_123',
    id: 'auth0|123',
    roles: ['cold:admin'],
  },
  iss: 'string',
  sub: 'string',
  azp: 'string',
  aud: ['coldclimate.online'],
  iat: 123,
  exp: 123,
  scope: 'blah',
  permissions: ['read:all'],
  isAdmin: true,
  isOwner: false,
  isColdAdmin: true,
  isMember: false,
};

export const fullReqExample = {
  headers: {},
  body: {},
  query: {},
  user: authenticatedUserExample,
  organization: {
    id: '',
    name: '',
    display_name: '',
    enabled_connections: null,
    branding: null,
    phone: null,
    email: null,
    created_at: new Date(),
    updated_at: new Date(),
    isTest: false,
    website: null,
    deleted: false,
  },
};
export const noBodyReqExample = { headers: {}, query: {}, user: authenticatedUserExample, organization: fullReqExample.organization };
export const noBodyOrQueryReqExample = { headers: {}, user: authenticatedUserExample, organization: fullReqExample.organization };
export const noHeadersOrQueryOrBodyReqExample = { user: authenticatedUserExample, organization: fullReqExample.organization };
export const testOrgNameExample = 'Test Organization';

export const generateSurveyTypesMock = () => {
  const survey_types = ZodSurveyTypesSchema._def.values;
  return survey_types[0];
};
export const generateSurveyMock = () => {
  return {
    id: v4(),
    name: fakeDataGenerator.names.name(),
    type: generateSurveyTypesMock(),
    definition: {
      // you may want to replace these with actual data structure
      key1: fakeDataGenerator.lorem.word(),
      key2: fakeDataGenerator.random.number(100),
      key3: fakeDataGenerator.internet.email(),
    },
    description: fakeDataGenerator.random.boolean() ? fakeDataGenerator.lorem.paragraph() : null,
    created_at: fakeDataGenerator.date.recent(50),
    updated_at: fakeDataGenerator.random.boolean() ? fakeDataGenerator.date.recent(30) : null,
  };
};
