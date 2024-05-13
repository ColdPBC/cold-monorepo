import { seedCategoryDefinitions } from './seed_category_definitions';
import { seedNews } from './seed_news';
import { seedPolicies } from './seed_policy_content';
import { seedUtilities } from './seed_supported_utilites';
import { seedComponentDefinitions } from './seed_component_definitions';
import { seedScopes } from './seed_emission_scopes';
import { seedComplianceDefinitions } from './seed_compliance_definitions';
import { buildDependencyChains, seedComplianceModels } from './seed_compliance_models';

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
  await seedComplianceModels();
  await buildDependencyChains();
  /**
   * Repeat the pattern above for any other tables you want to seed.
   */

  console.log('db seeding complete');
};

seedDB();
