import { DocumentNode, gql } from '@apollo/client';

export const GET_ALL_ORGS = gql`
	query GetAllOrganizations {
		organizations {
			id
			name
			displayName
		}
	}
`;

export const GET_ALL_FILES = gql`
	query GetAllFiles($filter: OrganizationFilesListFilter) {
		organizationFiles(filter: $filter) {
			id
			originalName
			createdAt
			type
			metadata
			attributeAssurances {
				id
				effectiveStartDate
				effectiveEndDate
				sustainabilityAttribute {
					id
					name
					level
				}
				organizationFacility {
					id
					name
					country
					supplierTier
					materialSuppliers {
						material {
							id
							name
						}
					}
				}
				material {
					id
					name
					materialSuppliers {
						organizationFacility {
							id
							name
							supplierTier
						}
					}
				}
			}
		}
	}
`;

export const GET_ALL_SUS_ATTRIBUTES = gql`
	query SustainabilityAttributes($pagination: SustainabilityAttributesPaginationInput, $filter: SustainabilityAttributesListFilter) {
		sustainabilityAttributes(pagination: $pagination, filter: $filter) {
			id
			name
			level
			type
		}
	}
`;

export const GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
	query Materials($filter: MaterialsListFilter) {
		materials(filter: $filter) {
			id
			name
		}
	}
`;

export const GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
	query OrganizationFacilities($filter: OrganizationFacilitiesListFilter) {
		organizationFacilities(filter: $filter) {
			id
			name
		}
	}
`;

export const CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE = gql`
	mutation CreateAttributeAssurance($input: AttributeAssuranceInsertInput!) {
		createAttributeAssurance(input: $input) {
			effectiveStartDate
			effectiveEndDate
		}
	}
`;

export const UPDATE_DOCUMENT_FIELDS = gql`
	mutation UpdateOrganizationFile($input: OrganizationFileUpdateInput!) {
		updateOrganizationFile(input: $input) {
			originalName
			createdAt
			type
		}
	}
`;

export const UPDATE_DOCUMENT_ASSURANCE = gql`
	mutation UpdateAttributeAssurance($input: AttributeAssuranceUpdateInput!) {
		updateAttributeAssurance(input: $input) {
			effectiveStartDate
			effectiveEndDate
		}
	}
`;

export const DELETE_ATTRIBUTE_ASSURANCE = gql`
	mutation DeleteAttributeAssurance($filter: DeleteOneFilterInput!) {
		deleteAttributeAssurance(filter: $filter)
	}
`;

export const GET_ALL_MATERIALS_FOR_ORG = gql`
	query Materials($filter: MaterialsListFilter!) {
		materials(filter: $filter) {
			id
			name
			materialSuppliers {
				organizationFacility {
					id
					name
					supplierTier
				}
			}
			attributeAssurances {
				id
				sustainabilityAttribute {
					id
					name
				}
			}
		}
	}
`;

export const queries: {
  [key: string]: DocumentNode;
} = {
  GET_ALL_ORGS: GET_ALL_ORGS,
  GET_ALL_FILES: GET_ALL_FILES,
  GET_ALL_SUS_ATTRIBUTES: GET_ALL_SUS_ATTRIBUTES,
  GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT: GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT: GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE: CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE,
  UPDATE_DOCUMENT_FIELDS: UPDATE_DOCUMENT_FIELDS,
  UPDATE_DOCUMENT_ASSURANCE: UPDATE_DOCUMENT_ASSURANCE,
  DELETE_ATTRIBUTE_ASSURANCE: DELETE_ATTRIBUTE_ASSURANCE,
  GET_ALL_MATERIALS_FOR_ORG: GET_ALL_MATERIALS_FOR_ORG,
};
