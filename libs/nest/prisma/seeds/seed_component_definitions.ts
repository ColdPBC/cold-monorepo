import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
// Add new component_definition row data to the seeds array
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
      "items": [
        {
          "field": "name",
          "cellStyle": "h-16",
          "headerStyle": "py-4",
          "headerTitle": "NAME"
        },
        {
          "field": "email",
          "cellStyle": "h-16",
          "headerStyle": "py-4",
          "headerTitle": "EMAIL"
        },
        {
          "field": "role",
          "cellStyle": "h-16",
          "headerStyle": "py-4",
          "headerTitle": "ROLE"
        },
        {
          "size": "w-[60px]",
          "field": "actions",
          "cellStyle": "",
          "hideTitle": "true",
          "headerStyle": "py-4",
          "headerTitle": "Table Actions"
        }
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
          key: 'compliance_key',
          label: 'Compliance',
          items: [
            {
              key: 'sustainability_key',
              icon: {
                name: 'ColdSustainabilityIcon',
              },
              label: 'Sustainability Claims',
              route: '/sustainability_claims',
            },
            {
              key: 'assurance_documents_key',
              icon: {
                name: 'ColdDocumentUploadIcon',
              },
              label: 'Assurance Documents',
              route: '/documents',
            }
          ]
        },
        {
          key: 'climate_key',
          label: 'Climate',
          items: [
            {
              key: 'carbon_footprint_key',
              icon: {
                name: 'ColdChartIcon',
              },
              label: 'Carbon Footprint',
              route: '/carbon_footprint',
            }
          ]
        },
        {
          key: 'reporting_automation_key',
          label: 'Reporting Automation',
          items: [
            {
              key: 'questionnaires_key',
              icon: {
                name: 'ColdQuestionnaireIcon',
              },
              label: 'Assessments',
              route: '/assessments',
            }
          ]
        },
        {
          key: 'my_data_key',
          label: 'My Data',
          items: [
            {
              key: 'materials_key',
              icon: {
                name: 'ColdMaterialsNavIcon',
              },
              label: 'Materials',
              route: '/materials',
            },
            {
              key: 'products_key',
              icon: {
                name: 'ColdProductsNavIcon',
              },
              label: 'Products',
              route: '/products',
            },
            {
              key: 'suppliers_key',
              icon: {
                name: 'ColdSuppliersNavIcon',
              },
              label: 'Suppliers',
              route: '/suppliers',
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
              key: 'uploads_key',
              icon: {
                name: 'ColdDocumentsIcon',
              },
              label: 'Uploads',
              route: '/uploads',
            },
          ]
        },
        {
          key: 'settings_key',
          items: [
            {
              key: 'settings_account_key',
              label: 'Account',
              route: '/settings/account',
              icon: {
                name: 'ColdSettingsIcon',
              },
            },
            {
              key: 'settings_user_key',
              label: 'Users',
              route: '/settings/users',
              icon: {
                name: 'ColdTeamMembersIcon',
              },
            },
            {
              key: 'settings_billing_key',
              label: 'Billing',
              route: '/settings/billing',
              icon: {
                name: 'ColdDollarSignIcon',
              },
            },
          ],
          label: 'Settings',
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
  {
    name: 'documents_list_table',
    type: 'DATAGRID',
    description: 'Provides details for the table of documents',
    definition: {
      items: [
        {
          field: 'name',
          headerStyle: 'py-4',
          headerTitle: 'Document Name',
        },
        {
          field: 'type',
          headerStyle: 'py-4',
          headerTitle: 'Document Type',
        },
      ],
    },
  },
];

export async function seedComponentDefinitions() {
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
