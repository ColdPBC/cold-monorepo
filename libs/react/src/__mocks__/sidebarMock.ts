import { ColdMaterialsIcon } from '@coldpbc/components';

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
          icon: {
            name: 'ColdComplianceIcon',
          },
          label: 'Compliance',
          route: '/compliance',
        },
        {
          key: 'materials_key',
          icon: {
            name: 'ColdMaterialsIcon',
          },
          label: 'Materials',
          route: '/materials',
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
          key: 'assessments_key',
          icon: {
            name: 'ColdJourneyIcon',
          },
          label: 'Assessments',
          route: '/assessments',
        },
        {
          key: 'actions_key',
          icon: {
            name: 'ColdActionsIcon',
          },
          label: 'Actions',
          route: '/actions',
        },
        {
          key: 'reports_key',
          icon: {
            name: 'ColdReportIcon',
          },
          items: [
            {
              key: 'reports_carbon_footprint_key',
              label: 'Carbon Footprint',
              route: '/reports/carbon_footprint',
            },
          ],
          label: 'Reports',
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
          key: 'settings_key',
          icon: {
            name: 'ColdSettingsIcon',
          },
          items: [
            {
              key: 'settings_account_key',
              label: 'Account',
              route: '/settings/account',
            },
            {
              key: 'settings_user_key',
              label: 'Users',
              route: '/settings/users',
            },
            {
              key: 'settings_billing_key',
              label: 'Billing',
              route: '/settings/billing',
            },
          ],
          label: 'Settings',
          roles: ['cold:admin', 'company:admin', 'company:owner'],
          route: '/settings',
        },
      ],
    },
    created_at: '2023-09-11T17:17:02.295Z',
    updated_at: '2024-03-18T17:45:23.188Z',
  };
}
