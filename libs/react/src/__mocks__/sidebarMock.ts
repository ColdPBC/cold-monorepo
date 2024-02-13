export function getSidebarMock() {
  return {
    id: 'cc0267d8-f49c-493e-8ea0-2aaa58bb61f3',
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
          key: 'compliance_key',
          icon: {
            name: 'ColdComplianceIcon',
          },
          label: 'Compliance',
          route: '/compliance',
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
          label: 'Reports',
          items: [
            {
              key: 'reports_carbon_footprint_key',
              label: 'Carbon Footprint',
              route: '/reports/carbon_footprint',
            },
          ],
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
              key: 'settings_company_info_key',
              label: 'Company Info',
              route: '/settings/company_info',
            },
            {
              key: 'settings_account_key',
              label: 'Account Management',
              route: '/settings/account',
            },
            {
              key: 'settings_user_key',
              label: 'User Management',
              route: '/settings/user',
            },
          ],
          label: 'Settings',
          roles: ['cold:admin', 'company:admin', 'company:owner'],
          route: '/settings',
        },
      ],
    },
    created_at: '2023-09-11T17:17:02.295Z',
    updated_at: '2024-02-12T10:49:58.323Z',
  };
}
