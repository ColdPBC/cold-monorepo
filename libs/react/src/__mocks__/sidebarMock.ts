export function getSidebarMock() {
  return {
    id: 'cc0267d8-f49c-493e-8ea0-2aaa58bb61f3',
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
    created_at: '2023-09-11T17:17:02.295Z',
    updated_at: '2024-03-18T17:45:23.188Z',
  };
}
