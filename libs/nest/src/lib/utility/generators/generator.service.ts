import { BaseWorker } from '../../worker';
import { Cuid2Generator } from '../../utility';

import fakerator from 'fakerator';
import { GuidPrefixes } from '../compliance.enums';
import { ZodSurveyTypesSchema } from '../../../validation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratorService extends BaseWorker {
	constructor() {
		super(GeneratorService.name);
	}
	fakeDataGenerator = fakerator();

	testOrgIdExample = '{{test_organization_id}}';
	authenticatedUserExample = {
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

	fullReqExample = { headers: {}, body: {}, query: {}, user: this.authenticatedUserExample };

	noBodyReqExample = { headers: {}, query: {}, user: this.authenticatedUserExample };

	noBodyOrQueryReqExample = { headers: {}, user: this.authenticatedUserExample };
	noHeadersOrQueryOrBodyReqExample = { user: this.authenticatedUserExample };
	testOrgNameExample = 'Test Organization';

	genId = (pfx: GuidPrefixes) => {
		return new Cuid2Generator(pfx).scopedId;
	};

	genCompKey = () => {
		return `${this.fakeDataGenerator.random.letter().toUpperCase()}${this.fakeDataGenerator.random.letter().toUpperCase()}${this.fakeDataGenerator.random.letter().toUpperCase()}`;
	};

	const;
	genQuestionData = () => {
		const component = this.fakeDataGenerator.random.arrayElement(['select', 'number', 'text_area', 'yes_no', 'multi_select']);
		let options: string[] = [];
		const rubric = {
			score_map: {},
		};

		if (component === 'number') {
			const answers = [0, 1, 2, 3, 4];
			answers.forEach(answer => {
				rubric.score_map[answer] = this.fakeDataGenerator.random.number(0, 1);
			});
		}
		if (component === 'select' || component === 'multi_select') {
			options = [this.fakeDataGenerator.lorem.word(), this.fakeDataGenerator.lorem.word(), this.fakeDataGenerator.lorem.word(), this.fakeDataGenerator.lorem.word()];
		}
		if (component === 'yes_no') {
			options = ['Yes', 'No'];
		}

		if (options.length > 0) {
			options.forEach(option => {
				rubric.score_map[option] = this.fakeDataGenerator.random.number(0.1, 1);
			});
			rubric.score_map['Not sure'] = 0;
			options.push('Not sure');
		}

		return { component, options, rubric };
	};

	genComplianceDefinition = () => {
		return {
			// you may want to replace these with actual data structure
			id: this.genId(GuidPrefixes.ComplianceDefinition),
			name: `${this.fakeDataGenerator.company.name()} Test Survey`,
			logo_url: this.fakeDataGenerator.internet.image(),
			surveys: [],
			title: this.fakeDataGenerator.lorem.sentence(),
			image_url: this.fakeDataGenerator.internet.image(),
			order: this.fakeDataGenerator.random.number(100),
			version: this.fakeDataGenerator.date.future(1, new Date()).getFullYear(),
			visible: false,
		};
	};

	genOrganization = () => {
		return {
			id: this.genId(GuidPrefixes.Organization),
			logo_url: this.fakeDataGenerator.internet.image(),
			display_name: this.fakeDataGenerator.company.name(),
			website: this.fakeDataGenerator.internet.url(),
			isTest: true,
		};
	};

	genComplianceDependencyChain = () => {
		return {
			id: this.genId(GuidPrefixes.ComplianceDependencyChain),
			compliance_question_id: this.genId(GuidPrefixes.ComplianceQuestion),
			compliance_response_id: this.genId(GuidPrefixes.ComplianceResponse),
			compliance_section_id: this.genId(GuidPrefixes.ComplianceSection),
			compliance_section_group_id: this.genId(GuidPrefixes.SectionGroup),
			compliance_id: this.genId(GuidPrefixes.ComplianceDefinition),
			compliance_name: `${this.fakeDataGenerator.company.name()} Test Survey`,
			compliance_section_key: this.genCompKey(),
			compliance_question_key: this.genCompKey(),
		};
	};

	genComplianceName = () => {
		return `${this.fakeDataGenerator.company.name()} Test Survey`;
	};

	genComplianceResponse = () => {
		return {
			id: this.genId(GuidPrefixes.ComplianceResponse),
			compliance_question_id: this.genId(GuidPrefixes.ComplianceQuestion),
			compliance_section_id: this.genId(GuidPrefixes.ComplianceSection),
			compliance_section_group_id: this.genId(GuidPrefixes.SectionGroup),
			compliance_definition_name: this.genComplianceName(),
			organization_id: this.genId(GuidPrefixes.Organization),
			organization_compliance_id: this.genId(GuidPrefixes.OrganizationCompliance),
			organization_compliance_ai_response_id: this.genId(GuidPrefixes.OrganizationComplianceAiResponse),
			organization_compliance_response_id: this.genId(GuidPrefixes.OrganizationComplianceResponse),
		};
	};

	genComplianceSectionGroup = () => {
		return {
			id: this.genId(GuidPrefixes.SectionGroup),
			compliance_definition_name: this.genComplianceName(),
			title: this.fakeDataGenerator.lorem.sentence(),
			order: this.fakeDataGenerator.random.number(100),
		};
	};

	genComplianceSection = () => {
		return {
			id: this.genId(GuidPrefixes.ComplianceSection),
			key: this.genCompKey(),
			title: this.fakeDataGenerator.lorem.sentence(),
			order: this.fakeDataGenerator.random.number(100),
			compliance_section_group_id: this.genId(GuidPrefixes.SectionGroup),
			compliance_definition_name: this.genComplianceName(),
			dependency_expression: `true in $map($lookup(definition.sections.*.follow_up, 'CDE-62').value, function($v) { $v in ['We facilitate or have an allocated budget for external professional development opportunities, (e.g. conference attendance, online trainings)'] })`,
		};
	};

	genComplianceQuestion = () => {
		const questionData = this.genQuestionData();
		return {
			id: this.genId(GuidPrefixes.ComplianceQuestion),
			compliance_section_id: this.genId(GuidPrefixes.ComplianceSection),
			key: this.genCompKey(),
			order: this.fakeDataGenerator.random.number(100),
			prompt: this.fakeDataGenerator.lorem.sentence(),
			component: questionData.component,
			options: questionData.options,
			rubric: questionData.rubric,
			tooltip: this.fakeDataGenerator.lorem.sentence(),
			placeholder: this.fakeDataGenerator.lorem.sentence(),
			compliance_definition_name: this.genComplianceName(),
			dependency_expression: `true in $map($lookup(definition.sections.*.follow_up, 'CDE-62').value, function($v) { $v in ['We facilitate or have an allocated budget for external professional development opportunities, (e.g. conference attendance, online trainings)'] })`,
		};
	};

	getOrgCompliance = () => {
		return {
			id: this.genId(GuidPrefixes.OrganizationCompliance),
			description: this.fakeDataGenerator.lorem.sentence(),
			organization_id: this.genId(GuidPrefixes.Organization),
			compliance_definition_name: this.genComplianceName(),
			compliance_responses: [],
		};
	};

	generateSurveyTypesMock = () => {
		const survey_types = ZodSurveyTypesSchema._def.values;
		return survey_types[0];
	};

	selectRandomComplianceName = () => {
		return this.fakeDataGenerator.random.arrayElement(['b_corp_2024', 'rei_pia_2024']);
	};

	generateSurveyMock = () => {
		const title = `${this.fakeDataGenerator.company.name()} Test Survey`;
		const version = this.fakeDataGenerator.date.future(1, new Date()).getFullYear();
		const sections = {};
		for (let i = 0; i < this.fakeDataGenerator.random.number(5, 10); i++) {
			const key = `${this.fakeDataGenerator.random.letter().toUpperCase()}${this.fakeDataGenerator.random.letter().toUpperCase()}${this.fakeDataGenerator.random
				.letter()
				.toUpperCase()}`;
			const followUp = {};
			for (let j = 0; j < this.fakeDataGenerator.random.number(2, 10); j++) {
				const followUpKey = `${key}-${j}`;
				const questionData = this.genQuestionData();
				followUp[followUpKey] = {
					idx: this.fakeDataGenerator.random.number(100),
					prompt: this.fakeDataGenerator.lorem.sentence(),
					rubric: questionData.rubric,
					options: questionData.options,
					tooltip: this.fakeDataGenerator.lorem.sentence(),
					component: questionData.component,
					placeholder: this.fakeDataGenerator.lorem.sentence(),
				};
			}
			sections[key] = {
				title: this.fakeDataGenerator.lorem.word(),
				prompt: this.fakeDataGenerator.lorem.sentence(),
				component: '',
				follow_up: followUp,
				image_url: this.fakeDataGenerator.internet.image(),
				category_idx: this.fakeDataGenerator.random.number(10),
				section_type: this.fakeDataGenerator.random.arrayElement(['General', 'Measure', 'Plan', 'Reduce', 'Advocate']),
				category_description: this.fakeDataGenerator.lorem.sentence(),
			};
		}

		return {
			id: new Cuid2Generator(GuidPrefixes.ComplianceDefinition).scopedId,
			title,
			version,
			sections,
			image_url: this.fakeDataGenerator.internet.image(),
		};
	};
}
