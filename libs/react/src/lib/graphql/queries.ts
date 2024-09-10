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
				effectiveStartDate
				effectiveEndDate
				sustainabilityAttribute {
					name
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

export const queries: {
	[key: string]: DocumentNode;
} = {
	GET_ALL_ORGS: GET_ALL_ORGS,
	GET_ALL_FILES: GET_ALL_FILES,
	GET_ALL_SUS_ATTRIBUTES: GET_ALL_SUS_ATTRIBUTES,
};
