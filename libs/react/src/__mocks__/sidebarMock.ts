export function getSidebarMock() {
  return {
    id: '66b2ff76-39cb-4a0d-83c7-951d34f3f653',
    name: 'sidebar_navigation',
    description: 'Provides links in the application sidebar',
    created_at: '2023-05-21T19:47:11.390Z',
    updated_at: '2023-05-21T19:47:11.969Z',
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
  };
}
