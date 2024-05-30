import { Cuid2Generator, ZodSurveyTypesSchema } from '@coldpbc/nest';
import fakerator from 'fakerator';

const fakeDataGenerator = fakerator();

export const testOrgIdExample = '{{test_organization_id}}';
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

export const fullReqExample = { headers: {}, body: {}, query: {}, user: authenticatedUserExample };
export const noBodyReqExample = { headers: {}, query: {}, user: authenticatedUserExample };
export const noBodyOrQueryReqExample = { headers: {}, user: authenticatedUserExample };
export const noHeadersOrQueryOrBodyReqExample = { user: authenticatedUserExample };
export const testOrgNameExample = 'Test Organization';

export const genId = (pfx: string) => {
  return new Cuid2Generator(pfx).scopedId;
};

export const genCompKey = () => {
  return `${fakeDataGenerator.random.letter().toUpperCase()}${fakeDataGenerator.random.letter().toUpperCase()}${fakeDataGenerator.random.letter().toUpperCase()}`;
};

export const genQuestionData = () => {
  const component = fakeDataGenerator.random.arrayElement(['select', 'number', 'text_area', 'yes_no', 'multi_select']);
  let options: string[] = [];
  const rubric = {
    score_map: {},
  };

  if (component === 'number') {
    const answers = [0, 1, 2, 3, 4];
    answers.forEach(answer => {
      rubric.score_map[answer] = fakeDataGenerator.random.number(0, 1);
    });
  }
  if (component === 'select' || component === 'multi_select') {
    options = [fakeDataGenerator.lorem.word(), fakeDataGenerator.lorem.word(), fakeDataGenerator.lorem.word(), fakeDataGenerator.lorem.word()];
  }
  if (component === 'yes_no') {
    options = ['Yes', 'No'];
  }

  if (options.length > 0) {
    options.forEach(option => {
      rubric.score_map[option] = fakeDataGenerator.random.number(0.1, 1);
    });
    rubric.score_map['Not sure'] = 0;
    options.push('Not sure');
  }

  return { component, options, rubric };
};
export const genComplianceDefinition = () => {
  return {
    // you may want to replace these with actual data structure
    id: genId('compdef'),
    name: `${fakeDataGenerator.company.name()} Test Survey`,
    logo_url: fakeDataGenerator.internet.image(),
    surveys: [],
    title: fakeDataGenerator.lorem.sentence(),
    image_url: fakeDataGenerator.internet.image(),
    order: fakeDataGenerator.random.number(100),
    version: fakeDataGenerator.date.future(1, new Date()).getFullYear(),
    visible: false,
  };
};

export const genOrganization = () => {
  return {
    id: genId('org'),
    logo_url: fakeDataGenerator.internet.image(),
    display_name: fakeDataGenerator.company.name(),
    website: fakeDataGenerator.internet.url(),
    isTest: true,
  };
};

export const genComplianceDependencyChain = () => {
  return {
    id: genId('cdc'),
    compliance_question_id: genId('cq'),
    compliance_response_id: genId('cr'),
    compliance_section_id: genId('cs'),
    compliance_section_group_id: genId('csg'),
    compliance_id: genId('compdef'),
    compliance_name: `${fakeDataGenerator.company.name()} Test Survey`,
    compliance_section_key: genCompKey(),
    compliance_question_key: genCompKey(),
  };
};
export const genComplianceName = () => {
  return `${fakeDataGenerator.company.name()} Test Survey`;
};
export const genComplianceResponse = () => {
  return {
    id: genId('cr'),
    compliance_question_id: genId('cq'),
    compliance_section_id: genId('cs'),
    compliance_section_group_id: genId('csg'),
    compliance_definition_name: genComplianceName(),
    organization_id: genId('org'),
    organization_compliance_id: genId('oc'),
    organization_compliance_ai_response_id: genId('ocair'),
    organization_compliance_response_id: genId('ocr'),
  };
};
export const genComplianceSectionGroup = () => {
  return {
    id: genId('csg'),
    compliance_definition_name: genComplianceName(),
    title: fakeDataGenerator.lorem.sentence(),
    order: fakeDataGenerator.random.number(100),
  };
};

export const genComplianceSection = () => {
  return {
    id: genId('cs'),
    key: genCompKey(),
    title: fakeDataGenerator.lorem.sentence(),
    order: fakeDataGenerator.random.number(100),
    compliance_section_group_id: genId('csg'),
    compliance_definition_name: genComplianceName(),
    dependency_expression: `true in $map($lookup(definition.sections.*.follow_up, 'CDE-62').value, function($v) { $v in ['We facilitate or have an allocated budget for external professional development opportunities, (e.g. conference attendance, online trainings)'] })`,
  };
};
export const genComplianceQuestion = () => {
  const questionData = genQuestionData();
  return {
    id: genId('cq'),
    compliance_section_id: genId('cs'),
    key: genCompKey(),
    order: fakeDataGenerator.random.number(100),
    prompt: fakeDataGenerator.lorem.sentence(),
    component: questionData.component,
    options: questionData.options,
    rubric: questionData.rubric,
    tooltip: fakeDataGenerator.lorem.sentence(),
    placeholder: fakeDataGenerator.lorem.sentence(),
    compliance_definition_name: genComplianceName(),
    dependency_expression: `true in $map($lookup(definition.sections.*.follow_up, 'CDE-62').value, function($v) { $v in ['We facilitate or have an allocated budget for external professional development opportunities, (e.g. conference attendance, online trainings)'] })`,
  };
};

export const getOrgCompliance = () => {
  return {
    id: genId('oc'),
    description: fakeDataGenerator.lorem.sentence(),
    organization_id: genId('org'),
    compliance_definition_name: genComplianceName(),
    compliance_responses: [],
  };
};
export const generateSurveyTypesMock = () => {
  const survey_types = ZodSurveyTypesSchema._def.values;
  return survey_types[0];
};

export const selectRandomComplianceName = () => {
  return fakeDataGenerator.random.arrayElement(['b_corp_2024', 'rei_pia_2024']);
};
export const generateSurveyMock = () => {
  const title = `${fakeDataGenerator.company.name()} Test Survey`;
  const version = fakeDataGenerator.date.future(1, new Date()).getFullYear();
  const sections = {};
  for (let i = 0; i < fakeDataGenerator.random.number(5, 10); i++) {
    const key = `${fakeDataGenerator.random.letter().toUpperCase()}${fakeDataGenerator.random.letter().toUpperCase()}${fakeDataGenerator.random.letter().toUpperCase()}`;
    const followUp = {};
    for (let j = 0; j < fakeDataGenerator.random.number(2, 10); j++) {
      const followUpKey = `${key}-${j}`;
      const questionData = genQuestionData();
      followUp[followUpKey] = {
        idx: fakeDataGenerator.random.number(100),
        prompt: fakeDataGenerator.lorem.sentence(),
        rubric: questionData.rubric,
        options: questionData.options,
        tooltip: fakeDataGenerator.lorem.sentence(),
        component: questionData.component,
        placeholder: fakeDataGenerator.lorem.sentence(),
      };
    }
    sections[key] = {
      title: fakeDataGenerator.lorem.word(),
      prompt: fakeDataGenerator.lorem.sentence(),
      component: '',
      follow_up: followUp,
      image_url: fakeDataGenerator.internet.image(),
      category_idx: fakeDataGenerator.random.number(10),
      section_type: fakeDataGenerator.random.arrayElement(['General', 'Measure', 'Plan', 'Reduce', 'Advocate']),
      category_description: fakeDataGenerator.lorem.sentence(),
    };
  }

  return {
    id: new Cuid2Generator('compdef').scopedId,
    title,
    version,
    sections,
    image_url: fakeDataGenerator.internet.image(),
  };
};
