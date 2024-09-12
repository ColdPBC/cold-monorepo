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
	query GetAllFiles {
		organizationFiles {
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
				supplier {
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
						supplier {
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
	query SustainabilityAttributes {
		sustainabilityAttributes {
			id
			name
			level
			type
		}
	}
`;

export const GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
	query Materials {
		materials {
			id
			name
		}
	}
`;

export const GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
	query Suppliers {
		suppliers {
			id
			name
		}
	}
`;

export const CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE = gql`
	mutation CreateAttributeAssurance {
		createAttributeAssurance(input: $input) {
			effectiveStartDate
			effectiveEndDate
		}
	}
`;

export const UPDATE_DOCUMENT_FIELDS = gql`
	mutation UpdateOrganizationFile {
		updateOrganizationFile(input: $input) {
			originalName
			createdAt
			type
		}
	}
`;

export const UPDATE_DOCUMENT_ASSURANCE = gql`
	mutation UpdateAttributeAssurance {
		updateAttributeAssurance(input: $input) {
			effectiveStartDate
			effectiveEndDate
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
};
