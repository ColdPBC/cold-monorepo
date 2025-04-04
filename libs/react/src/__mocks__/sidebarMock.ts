import {getDocumentsListTableMock} from "./componentMock";
import {ComponentDefinitionGraphQL} from "@coldpbc/interfaces";

export function getSidebarMock() {
  return {
    id: 'cc0267d8-f49c-493e-8ea0-2aaa58bb61f3',
    name: 'sidebar_navigation',
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
            },
            {
              key: 'regulatory_compliance_key',
              icon: {
                name: 'ColdRegulatoryComplianceIcon',
              },
              label: 'Regulatory Compliance',
              route: '/regulatory_compliance',
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
  };
}

export function getComponentMocksByFilter(name: string): ComponentDefinitionGraphQL[] {
  const componentDefinitions: ComponentDefinitionGraphQL[] = [getDocumentsListTableMock(), getSidebarMock()]
  return componentDefinitions.filter((component) => {
    return component.name === name;
  });
}
