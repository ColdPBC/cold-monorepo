import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
// Add new form_definition row data to the seeds array
const seeds: Array<{
  name: string;
  type: string;
  description: string;
  definition: any;
}> = [
  // Signup form definition
  {
    name: 'signup_form',
    type: 'FORM',
    description: 'Provides a form for users to sign up',
    definition: {
      sections: [
        {
          status: 'current',
          key: 'user-information',
          title: 'User Profile',
          description: "Include your first and last name if it doesn't already exist.",
          resource_name: 'users',
          fields: [
            {
              name: 'given_name',
              input_label: 'First Name',
              placeholder: 'Jane',
              default_value: null,
            },
            {
              name: 'family_name',
              input_label: 'Last Name',
              placeholder: 'Doe',
              default_value: null,
            },
            {
              name: 'some_field ',
              input_label: 'Generic',
              placeholder: 'Doe',
              default_value: null,
            },
          ],
        },
        {
          key: 'company-information',
          title: 'Company Information',
          description: '',
          resource_name: 'companies',
          fields: [
            {
              name: 'name',
              input_label: 'Company Name',
              placeholder: 'Acme Corporation',
            },
          ],
        },
      ],
    },
  },
  // Team member table definition
  {
    name: 'team_member_table',
    type: 'DATAGRID',
    description: 'Provides a table for managing team members',
    definition: {
      items: [
        {
          field: 'image',
          hideTitle: 'true',
          headerTitle: 'Profile Image',
          size: 'w-8',
          headerStyle: 'py-4',
          cellStyle: 'py-2 px-4 h-16',
        },
        {
          field: 'name',
          headerTitle: 'NAME',
          headerStyle: 'py-4',
          cellStyle: 'h-16',
        },
        {
          field: 'role',
          headerTitle: 'ROLE',
          headerStyle: 'py-4',
          cellStyle: 'h-16',
        },
        {
          field: 'status',
          headerTitle: 'STATUS',
          headerStyle: 'py-4',
          cellStyle: 'h-16',
        },
        {
          field: 'actions',
          hideTitle: 'true',
          headerTitle: 'Table Actions',
          size: 'w-8',
          headerStyle: 'py-4',
          cellStyle: 'justify-end grid content-center h-16',
        },
      ],
    },
  },
  // Sidebar navigation definition
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
          placement: 'bottom',
          icon: {
            name: 'ColdSettingsIcon',
          },
          label: 'Settings',
          route: '/settings',
          roles: ['cold:admin', 'company:admin', 'company:owner'],
        },
      ],
    },
  },
  // header navigation definition
  {
    name: 'header_navigation',
    type: 'NAVIGATION_HEADER',
    description: 'Provides links in the application header',
    definition: {
      navigation: [
        { name: 'Product', href: '#' },
        { name: 'Features', href: '#' },
        {
          name: 'Marketplace',
          href: '#',
        },
        { name: 'Company', href: '#' },
      ],
    },
  },
  // footer navigation definition
  {
    name: 'footer_navigation',
    type: 'NAVIGATION_FOOTER',
    description: 'Provides links in the application footer',
    definition: {
      solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
      ],
      support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
      ],
      company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
      ],
      legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
      ],
    },
  },
];

export async function seedFormDefinitions() {
  await prisma.$connect();

  console.log(`Seeding component_definitions...`);
  let count = 0;

  await Promise.all(
    seeds.map(async (seed: any) => {
      const result = await prisma.component_definitions
        .upsert({
          where: { name: seed.name },
          update: seed,
          create: {
            id: v4(),
            created_at: new Date(),
            ...seed,
          },
        })
        .catch(error => {
          console.error(error);
        });
      count++;

      console.log(`🌱 Seeded (${count} of ${seeds.length}): ${seed.name} 🌱`, result);
    }),
  );

  console.log(`${count} component_definitions seeded!`);

  await prisma.$disconnect();
}
