// cold:admin has full control; all other roles have no access;
export const coldAdminEntities: string[] = ['service_definitions'];

// cold:admin has full control; company:owner & company:admin has read & write, company:member as read only all roles can return records where organization is also null
export const includeNullOrgs: string[] = ['compliance_responses'];

// cold:admin has full control; all others can only read
export const readOnlyEntities: string[] = [
	'action_templates',
	'actions',
	'news',
	'category_definitions',
	'category_data',
	'compliance_definitions',
	'compliance_question_dependency_chains',
	'compliance_questions',
	'compliance_section_dependency_chains',
	'compliance_section_groups',
	'compliance_sections',
	'component_definitions',
	'emission_scopes',
	'organization_compliance_ai_response_files',
	'organization_compliance_ai_responses',
	'policy_definitions',
	'supported_utilities',
	'survey_definitions',
	'survey_status',
	'utility_bills',
];

// These entities should not be exposed via any API.
export const restrictedEntities: string[] = ['_prisma_migrations', 'vector_records'];
