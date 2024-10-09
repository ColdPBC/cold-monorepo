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

export const GET_ALL_SCHEMA_ENUMS = gql`
  query QueryTypes {
    _graphweaver {
      enums {
        values {
          name
          value
        }
        name
      }
    }
  }
`;

export const GET_ALL_SUPPLIERS_FOR_ORG = gql`
  query OrganizationFacilities($filter: OrganizationFacilitiesListFilter!) {
    organizationFacilities(filter: $filter) {
      id
      name
      supplierTier
      country
      attributeAssurances {
        id
        sustainabilityAttribute {
          id
          name
        }
      }
      materialSuppliers {
        material {
          name
        }
      }
      products {
        id
        name
      }
    }
  }
`;

export const CREATE_MATERIAL = gql`
  mutation CreateMaterial($input: MaterialInsertInput!) {
    createMaterial(input: $input) {
      id
    }
  }
`;

export const CREATE_MATERIAL_SUPPLIER = gql`
  mutation CreateMaterialSupplier($input: MaterialSupplierInsertInput!) {
    createMaterialSupplier(input: $input) {
      id
    }
  }
`

export const GET_ALL_PRODUCTS= gql`
  query Products($filter: ProductsListFilter){
    products(filter: $filter){
      id
      name
    }
  }
`;

export const CREATE_PRODUCT_MATERIAL = gql`
  mutation CreateProductMaterial($input: ProductMaterialInsertInput!){
    createProductMaterial(input: $input){
      id
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation CreateOrganizationFacility($input: OrganizationFacilityInsertInput!) {
    createOrganizationFacility(input: $input) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductUpdateInput!){
    updateProduct(input: $input){
      id
    }
  }
`;

export const GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG = gql`
  query SustainabilityAttributes($organizationId: ID!, $filter: SustainabilityAttributesListFilter) {
    sustainabilityAttributes(filter: $filter) {
      id
      attributeAssurances(filter: { organization: { id: $organizationId } }) {
        id
      }
      level
      logoUrl
      name
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
  GET_ALL_SCHEMA_ENUMS: GET_ALL_SCHEMA_ENUMS,
  GET_ALL_SUPPLIERS_FOR_ORG: GET_ALL_SUPPLIERS_FOR_ORG,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
  CREATE_MATERIAL: CREATE_MATERIAL,
  CREATE_MATERIAL_SUPPLIER: CREATE_MATERIAL_SUPPLIER,
  GET_ALL_PRODUCTS: GET_ALL_PRODUCTS,
  CREATE_PRODUCT_MATERIAL: CREATE_PRODUCT_MATERIAL,
  CREATE_SUPPLIER: CREATE_SUPPLIER,
  UPDATE_PRODUCT: UPDATE_PRODUCT,
};
