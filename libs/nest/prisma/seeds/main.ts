import { seedCategoryDefinitions } from './seed_category_definitions';
import { seedNews } from './seed_news';
import { seedPolicies } from './seed_policy_content';
import { seedUtilities } from './seed_supported_utilites';
import { seedComponentDefinitions } from './seed_component_definitions';
import { seedScopes } from './seed_emission_scopes';
import { seedComplianceDefinitions } from './seed_compliance_definitions';
import { seedComplianceModels } from './seed_compliance_models';
import { buildQuestionDependencyChains } from './seed_compliance_question_dependencies';
import { buildSectionDependencyChains } from './seed_compliance_section_dependencies';
import { seedSustainabilityAttributes } from './seed_sustainability_attributes';

export const seedDB = async () => {
	/**
	 * Seed the component-definitions table with the following:
	 */
	await seedComponentDefinitions();
	await seedCategoryDefinitions();
	await seedPolicies();
	await seedNews();
	await seedUtilities();
	await seedScopes();
	await seedComplianceDefinitions();
	await seedSustainabilityAttributes();
	if (process.env['LOCAL_SERVICE'] === 'seed') {
		await seedComplianceModels();
		await buildQuestionDependencyChains();
		await buildSectionDependencyChains();
	}

	/**
	 * Repeat the pattern above for any other tables you want to seed.
	 */

	console.log('db seeding complete');
};

seedDB();
