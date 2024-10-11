import {
  CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE, CREATE_MATERIAL, CREATE_MATERIAL_SUPPLIER, CREATE_PRODUCT_MATERIAL,
  GET_ALL_FILES, GET_ALL_MATERIALS_FOR_ORG,
  GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  GET_ALL_ORGS, GET_ALL_PRODUCTS, GET_ALL_SCHEMA_ENUMS, GET_ALL_SUPPLIERS_FOR_ORG,
  GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  GET_ALL_SUS_ATTRIBUTES, GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
  UPDATE_DOCUMENT_ASSURANCE,
  UPDATE_DOCUMENT_FIELDS,
} from '@coldpbc/lib';
import {
  filesProcessedWithDatesMock,
  getFilesProcessingMock,
  getFilesWithAssurances,
  getFilesWithoutAssurances,
  filesWithTooManyRecordsMock,
  materialsForAssurancesMock,
  suppliersForAssurancesMock
} from '../filesMock';
import { getClaimsMock } from '../claimsMock';
import { DocumentNode } from '@apollo/client';
import { RequestHandler } from 'mock-apollo-client';
import { get } from 'lodash';
import {getSchemaMocks} from "../schemaMocks";
import {getSupplierMocks} from "../suppliersMock";
import {getProductsMock} from "../productsMock";
import {getMaterialsMocksWithAssurances} from "../materialsMock";
import { AttributeAssuranceMock } from '../attributeAssuranceMock';

export const defaultGraphqlMocks: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_ALL_ORGS,
		handler: () =>
			Promise.resolve({
				data: {
					organizations: [
						{
							id: 'org_miZPM14eAYpFn6gM',
							name: 'topo-example-files',
							displayName: 'Topo Example Files',
						},
						{
							id: 'org_wv1YhZQh0Tzcw8Xu',
							name: 'peak-design-dev',
							displayName: 'Peak Design Dev',
						},
						{
							id: 'org_VMBWDGdzs3p3UvoY',
							name: 'wild-rye',
							displayName: 'Wild Rye',
						},
						{
							id: 'org_vfY2W8SU7ROR2ras',
							name: 'storm-creek',
							displayName: 'Storm Creek',
						},
						{
							id: 'org_FQVyCkzvMratrUHC',
							name: 'pendleton',
							displayName: 'Pendleton',
						},
						{
							id: 'org_V9cOWB4xHRQSUDMH',
							name: 'bernard-group-test-alpha',
							displayName: 'Bernard Group Test Alpha',
						},
						{
							id: 'org_ftkZHIk7CFwnMIAW',
							name: 'simms-fishing-demo',
							displayName: 'Simms Fishing Demo',
						},
						{
							id: 'org_fbQc6ZJ04QBpyfvW',
							name: 'superfeet',
							displayName: 'Superfeet',
						},
						{
							id: 'org_45LMyqGlSlsVOgHQ',
							name: 'cold-demo-july-24',
							displayName: 'Cold Demo - July 24',
						},
						{
							id: 'org_2U63Ah2K4gUaZ67V',
							name: 'faribault-mill',
							displayName: 'Faribault Mill',
						},
						{
							id: 'org_RQnedV0LsQNch6FF',
							name: 'company-name-test-alpha',
							displayName: 'CompanyName_Test_Alpha',
						},
						{
							id: 'org_g2zzR5rwTKVAIwCn',
							name: 'cold-climate-staging',
							displayName: 'Cold Climate',
						},
						{
							id: 'org_UIdzHbXmCIlwkFA3',
							name: 'testing-new-org',
							displayName: 'Testing New Org',
						},
						{
							id: 'org_TJEoSI0SjFOjGm0k',
							name: 'cold-demo-account',
							displayName: 'Cold Demo Account',
						},
						{
							id: 'org_ggEG8zA2ZuA8aWvN',
							name: 'cold-demo-july-11',
							displayName: 'Cold Demo July 11',
						},
						{
							id: 'org_Fg5pGu6ruto2QBxo',
							name: 'demo-rag-company',
							displayName: 'Keen Footwear',
						},
						{
							id: 'org_bY3ikn0Sn3eBsYO0',
							name: 'heller-pfannerstill-and-sons',
							displayName: 'Heller - Pfannerstill and Sons',
						},
						{
							id: 'org_dCASACBGSM1Z1dAY',
							name: 'keen-test-alpha',
							displayName: 'KEEN_test_alpha',
						},
						{
							id: 'org_J5wDt6i7lvryt9g7',
							name: 'walker-test-alpha',
							displayName: 'Walker_Test_Alpha',
						},
						{
							id: 'org_Dg0znuWYnG5Dp9UZ',
							name: 'oboz',
							displayName: 'Oboz',
						},
						{
							id: 'org_cmf4sHYIRylxx4PU',
							name: 'or-test-beta',
							displayName: 'OR Test Beta',
						},
						{
							id: 'org_ZfhjVJsBwtTZZDO7',
							name: 'the-north-face',
							displayName: 'The North Face',
						},
						{
							id: 'org_DRrOiNS2ayk7HoWJ',
							name: 'canada-goose',
							displayName: 'Canada Goose',
						},
						{
							id: 'org_oeTqGMUDtYE3S9BB',
							name: 'cold-climate-demo',
							displayName: 'Cold Climate Demo',
						},
						{
							id: 'org_qXGL6aIj3g16Iqhf',
							name: 'demo-ben-org',
							displayName: 'Keen Footwear (Ben)',
						},
						{
							id: 'org_vHP3YC00i591iFtW',
							name: 'wiza-llc-group',
							displayName: 'Wiza LLC Group',
						},
						{
							id: 'org_6I3xd8q8AqW4j6bL',
							name: 'finisterre-test-alpha',
							displayName: 'Finisterre Test Alpha',
						},
						{
							id: 'org_Xgr9Ea4vzLluu9GZ',
							name: 'lemke-llc-llc',
							displayName: 'Lemke LLC LLC',
						},
						{
							id: 'org_2FIL7IaSevY9DBKo',
							name: 'or-test-gamma',
							displayName: 'OR Test Gamma',
						},
						{
							id: 'org_bIXT6n48Fn9yAqMg',
							name: 'bombas-test-beta',
							displayName: 'Bombas Test Beta',
						},
						{
							id: 'org_8kn6FXnZwx3gYoZJ',
							name: 'example-test-bet',
							displayName: 'Example Test Bet',
						},
						{
							id: 'org_TU33cvPuheClpbFw',
							name: 'demo-asst-company',
							displayName: 'Keen Footwear Asst.',
						},
						{
							id: 'org_BI9UEWuPNM5wiLWv',
							name: 'keen-test-beta',
							displayName: 'Keen Test Beta',
						},
						{
							id: 'org_xlxEy6TwThyGMkAj',
							name: 'simms',
							displayName: 'Simms',
						},
						{
							id: 'org_nTj9GAN4m3UbTvwb',
							name: 'hilll-thompson-and-sons',
							displayName: 'Hilll - Thompson and Sons',
						},
						{
							id: 'org_1K6yUyythyK9kzPd',
							name: 'hestra-test-alpha',
							displayName: 'Hestra Test Theta',
						},
						{
							id: 'org_XQl2LtQUVFCjAPeF',
							name: 'vasque',
							displayName: 'Vasque',
						},
						{
							id: 'org_ts9lggajpMX6NCFb',
							name: 'roomandboard-test-alpha',
							displayName: 'roomandboard_test_alpha',
						},
						{
							id: 'org_p4bNBUdfcs9g9KD3',
							name: '3rd-rock',
							displayName: '3rd Rock',
						},
						{
							id: 'org_bJoKKML10QPnPDKu',
							name: 'cotopaxi',
							displayName: 'cotopaxi',
						},
						{
							id: 'org_XACCSUpYKkU4xcEb',
							name: 'l-l-bean',
							displayName: 'L.L. Bean',
						},
						{
							id: 'org_0dJFK9braFhraK0w',
							name: 'lifestraw-test-alpha',
							displayName: 'Lifestraw Test Alpha',
						},
						{
							id: 'org_Z6uUmnUnPXodDlkx',
							name: 'drakes',
							displayName: 'Drakes',
						},
						{
							id: 'org_KHhMboCPXR5k8QCK',
							name: 'patagonia',
							displayName: 'Patagonia',
						},
						{
							id: 'org_bsbS9Qvi2HjQSELZ',
							name: 'bombas-test',
							displayName: 'Bombas Test',
						},
						{
							id: 'org_POUmCQgb5Op7NuRx',
							name: 'toad-test-alpha',
							displayName: 'Toad Test Alpha',
						},
						{
							id: 'org_3ufqonEqjmTGvCYb',
							name: 'shanahan-llc-group',
							displayName: 'Shanahan LLC Group',
						},
						{
							id: 'org_K7zIdOftN11Zgl0j',
							name: 'cummerata-and-sons-llc',
							displayName: 'Cummerata and Sons LLC',
						},
					],
				},
			}),
	},
	{
		query: GET_ALL_FILES,
		handler: variables =>
			Promise.resolve({
				data: {
					organizationFiles: getFilesWithAssurances(),
				},
			}),
	},
	{
		query: GET_ALL_SUS_ATTRIBUTES,
		handler: () =>
			Promise.resolve({
				data: {
					sustainabilityAttributes: getClaimsMock(),
				},
			}),
	},
  {
    query: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
    handler: () =>
      Promise.resolve({
        data: {
          sustainabilityAttributes: [],
        },
      }),
  },
	{
		query: GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT,
		handler: () =>
			Promise.resolve({
				data: {
					materials: materialsForAssurancesMock,
				},
			}),
	},
	{
		query: GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT,
		handler: () =>
			Promise.resolve({
				data: {
					suppliers: suppliersForAssurancesMock,
				},
			}),
	},
	{
		query: CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE,
		handler: variables => {
			const effectiveStartDate = get(variables, 'input.effectiveStartDate', new Date().toISOString());
			const effectiveEndDate = get(variables, 'input.effectiveEndDate', new Date().toISOString());
			return Promise.resolve({
				data: {
					createAttributeAssurance: {
						effectiveStartDate,
						effectiveEndDate,
						supplier: null,
						material: null,
					},
				},
			});
		},
	},
	{
		query: UPDATE_DOCUMENT_FIELDS,
		handler: variables => {
			const createdAt = new Date().toISOString();
			const type = get(variables, 'input.type', "OTHER");
			return Promise.resolve({
				data: {
					updateOrganizationFile: {
						originalName: 'test',
						createdAt: createdAt,
						type: type,
					},
				},
			});
		},
	},
	{
		query: UPDATE_DOCUMENT_ASSURANCE,
		handler: variables => {
			const effectiveStartDate = get(variables, 'input.effectiveStartDate', new Date().toISOString());
			const effectiveEndDate = get(variables, 'input.effectiveEndDate', new Date().toISOString());
			return Promise.resolve({
				data: {
					updateAttributeAssurance: {
						effectiveStartDate: effectiveStartDate,
						effectiveEndDate: effectiveEndDate,
					},
				},
			});
		},
	},
  {
    query: GET_ALL_SCHEMA_ENUMS,
    handler: () =>
      Promise.resolve({
        data: {
          _graphweaver: {
            enums: getSchemaMocks()
          }
        }
      })
  }, {
    query: GET_ALL_SUPPLIERS_FOR_ORG,
    handler: (variables) => {
      return Promise.resolve({
        data: {
          organizationFacilities: getSupplierMocks(),
        },
      });
    }
  }, {
    query: CREATE_MATERIAL,
    handler: () =>
      Promise.resolve({
        data: {
          createMaterial: {
            id: 'material_1',
          },
        },
      }),
  },
  {
    query: CREATE_MATERIAL_SUPPLIER,
    handler: () =>
      Promise.resolve({
        data: {
          createMaterialSupplier: {
            id: 'material_supplier_1',
          },
        },
      }),
  },
  {
    query: GET_ALL_PRODUCTS,
    handler: () =>
      Promise.resolve({
        data: {
          products: getProductsMock(),
        },
      }),
  },
  {
    query: CREATE_PRODUCT_MATERIAL,
    handler: () =>
      Promise.resolve({
        data: {
          createProductMaterial: {
            id: 'product_material_1',
          },
        },
      }),
  },
  {
    query: GET_ALL_MATERIALS_FOR_ORG,
    handler: () =>
      Promise.resolve({
        data: {
          materials: getMaterialsMocksWithAssurances(),
        },
      }),
  }
];

export const filesWithAssurancesMocks: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_ALL_FILES,
		handler: variables =>
			Promise.resolve({
				data: {
					organizationFiles: getFilesWithAssurances(),
				},
			}),
	},
];

export const filesWithOutAssurancesMocks: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_ALL_FILES,
		handler: variables =>
			Promise.resolve({
				data: {
					organizationFiles: getFilesWithoutAssurances(),
				},
			}),
	},
];

export const filesProcessingMocks: {
	query: DocumentNode;
	handler: RequestHandler;
}[] = [
	{
		query: GET_ALL_FILES,
		handler: () =>
			Promise.resolve({
				data: {
					organizationFiles: getFilesProcessingMock(),
				},
			}),
	},
];

export const filesProcessedWithDatesMocks: {
  query: DocumentNode;
  handler: RequestHandler;
}[] = [
  {
    query: GET_ALL_FILES,
    handler: () =>
      Promise.resolve({
        data: {
          organizationFiles: filesProcessedWithDatesMock(),
        },
      }),
  },
];

export const sustainabilityAttributesMocks = [
  {
    query: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
    handler: () =>
      Promise.resolve({
        data: {
          sustainabilityAttributes: [
            // For 'My Attributes'
            {
              id: 'a',
              name: 'Global Recycled Standard',
              logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
              attributeAssurances: [
                AttributeAssuranceMock({ entity: 'MATERIAL', status: 'ACTIVE', index: 1}),
              ],
              level: 'MATERIAL',
            },
            // For 'Other Attributes'
            {
              id: 'b',
              name: 'Fair Wear',
              logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
              attributeAssurances: [],
              level: 'SUPPLIER',
            }
          ],
        },
      }),
  }
];

export const filesWithTooManyRecordsMocks: {
  query: DocumentNode;
  handler: RequestHandler;
}[] = [
  {
    query: GET_ALL_FILES,
    handler: () =>
      Promise.resolve({
        data: {
          organizationFiles: filesWithTooManyRecordsMock(),
        },
      }),
  },
];
