export function getSidebarMock ()
{
    return {
        "id": "66b2ff76-39cb-4a0d-83c7-951d34f3f653",
        "name": "sidebar_navigation",
        "description": "Provides links in the application sidebar",
        "created_at": "2023-05-21T19:47:11.390Z",
        "updated_at": "2023-05-21T19:47:11.969Z",
        "definition": {
            "items": [
                {
                    "key": "home_key",
                    "icon": {
                        "name": "ColdHomeIcon"
                    },
                    "label": "Home",
                    "route": "/home",
                },
                {
                    "key": "footprint_key",
                    "icon": {
                        "name": "ColdFootprintIcon"
                    },
                    "label": "Footprint",
                    "route": "/footprint",
                },
                {
                    "key": "journey_key",
                    "icon": {
                        "name": "ColdJourneyIcon"
                    },
                    "label": "Journey",
                    "route": "/journey",
                },
                {
                    "key": "actions_key",
                    "icon": {
                        "name": "ColdActionsIcon"
                    },
                    "items": [
                        {
                            "key": "overview_actions_key",
                            "label": "Overview",
                            "route": "/actions",
                        },
                        {
                            "key": "facilities_actions_key",
                            "label": "Facilities",
                            "route": "/actions/facilities",
                        },
                        {
                            "key": "travel_actions_key",
                            "label": "Travel",
                            "route": "/actions/travel",
                        },
                        {
                            "key": "operations_actions_key",
                            "label": "Operations",
                            "route": "/actions/operations",
                        },
                        {
                            "key": "product_actions_key",
                            "label": "Product",
                            "route": "/actions/product",
                        },
                        {
                            "key": "employee_footprint_actions_key",
                            "label": "Employee Footprint",
                            "route": "/actions/employee_footprint",
                        },
                        {
                            "key": "employee_activation_actions_key",
                            "label": "Employee Activation",
                            "route": "/actions/employee_activation",
                        },{
                            "key": "internal_alignment_actions_key",
                            "label": "Internal Alignment",
                            "route": "/actions/internal_alignment",
                        },
                        {
                            "key": "community_impact_actions_key",
                            "label": "Community Impact",
                            "route": "/actions/community_impact",
                        }
                    ],
                    "label": "Actions",
                },
                {
                    "key": "settings_key",
                    "placement": "bottom",
                    "icon": {
                        "name": "ColdSettingsIcon"
                    },
                    "label": "Settings",
                    "route": "/settings",
                    "roles": [
                        "cold:admin",
                        "company:admin",
                        "company:owner"
                    ],
                }
            ]
        }
    }
}

