import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);

const seeds: Array<{
  name: string;
  type: string;
  description: string;
  definition: any;
  created_at: string;
  updated_at: string;
}> = [
  {
    name: 'sidebar_navigation',
    type: 'NAVIGATION_SIDE',
    description: 'Provides links in the application sidebar',
    definition: {
      items: [
        {
          key: 'home_key',
          icon: {
            name: 'ColdHomeIcon',
          },
          label: 'Home',
          route: '/home',
        },
        {
          key: 'footprint_key',
          icon: {
            name: 'ColdFootprintIcon',
          },
          label: 'Footprint',
          route: '/footprint',
        },
        {
          key: 'journey_key',
          icon: {
            name: 'ColdJourneyIcon',
          },
          label: 'Journey',
          route: '/journey',
        },
        {
          key: 'documents_key',
          icon: {
            name: 'ColdDocumentsIcon',
          },
          label: 'Documents',
          route: '/documents',
        },
        {
          key: 'compliance_key',
          icon: {
            name: 'ColdComplianceIcon',
          },
          label: 'Compliance',
          route: '/compliance',
        },
        {
          key: 'actions_key',
          icon: {
            name: 'ColdActionsIcon',
          },
          items: [
            {
              key: 'overview_actions_key',
              label: 'Overview',
              route: '/actions',
            },
            {
              key: 'facilities_actions_key',
              label: 'Facilities',
              route: '/actions/facilities',
            },
            {
              key: 'travel_actions_key',
              label: 'Travel',
              route: '/actions/travel',
            },
            {
              key: 'operations_actions_key',
              label: 'Operations',
              route: '/actions/operations',
            },
            {
              key: 'product_actions_key',
              label: 'Product',
              route: '/actions/product',
            },
            {
              key: 'employee_footprint_actions_key',
              label: 'Employee Footprint',
              route: '/actions/employee_footprint',
            },
            {
              key: 'employee_activation_actions_key',
              label: 'Employee Activation',
              route: '/actions/employee_activation',
            },
            {
              key: 'internal_alignment_actions_key',
              label: 'Internal Alignment',
              route: '/actions/internal_alignment',
            },
            {
              key: 'community_impact_actions_key',
              label: 'Community Impact',
              route: '/actions/community_impact',
            },
          ],
          label: 'Actions',
        },
        {
          key: 'settings_key',
          icon: {
            name: 'ColdSettingsIcon',
          },
          label: 'Settings',
          roles: ['cold:admin', 'company:admin', 'company:owner'],
          route: '/settings',
          placement: 'bottom',
        },
      ],
    },
    created_at: '2023-09-18T15:26:28.135Z',
    updated_at: '2023-12-02T03:31:49.969Z',
  },
];

export async function seedComponents() {
  await prisma.$connect();

  console.log(`Seeding Components...`);

  let count = 0;
  await Promise.all(
    seeds.map(async (seed: any) => {
      const result = await prisma.component_definitions.upsert({
        where: {
          name: seed.name,
        },
        update: seed,
        create: {
          ...seed,
          created_at: new Date(),
        },
      });

      count++;
      console.log(`🌱 seeded (${count} of ${seeds.length}) Components: ${seed.name} 🌱`, result);
    }),
  );

  if (process.env['NODE_ENV'] === 'test') {
    await Promise.all(
      seeds.map(async (seed: any) => {
        const result = await prisma.component_definitions.upsert({
          where: {
            id: seed.id,
          },
          update: seed,
          create: {
            ...seed,
            created_at: new Date(),
          },
        });

        count++;
        console.log(`🌱 seeded (${count} of ${seeds.length}) Components: ${seed.name} 🌱`, result);
      }),
    );
  }

  await prisma.$disconnect();
}
