import { seedCategoryDefinitions } from './seed_category_definitions';
import { seedNews } from './seed_news';
import { seedPolicies } from './seed_policy_content';
import { seedUtilities } from './seed_supported_utilites';
import { seedComponentDefinitions } from './seed_component_definitions';
import { seedScopes } from './seed_emission_scopes';

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
  /**
   * Repeat the pattern above for any other tables you want to seed.
   */

  console.log('db seeding complete');
};

seedDB();
