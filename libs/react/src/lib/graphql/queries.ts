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
          logoUrl
        }
        organization {
          id
          name
        }
        organizationFacility {
          id
          name
          country
          supplierTier
          materialSuppliers {
            id
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
            id
            organizationFacility {
              id
              name
              supplierTier
            }
          }
        }
        product {
          id
          name
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
      logoUrl
      type
    }
  }
`;

export const GET_ALL_PRODUCTS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
  query Products($organizationId: ID!) {
    products(filter: { organization: { id: $organizationId } }) {
      id
      name
    }
  }
`;

export const GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
  query OrganizationFacilities($organizationId: ID!) {
    organizationFacilities(filter: { organization: { id: $organizationId } }) {
      id
      name
    }
  }
`;

export const GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT = gql`
  query Materials($organizationId: ID!) {
    materials(filter: { organization: { id: $organizationId } }) {
      id
      name
      materialSuppliers {
        organizationFacility {
          id
          name
        }
      }
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

export const DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE = gql`
  mutation DeleteAttributeAssurancesByEntity(
    $materialId: ID,
    $productId: ID,
    $supplierId: ID,
    $sustainabilityAttributeId: ID!,
    $organizationId: ID!
  ) {
    deleteAttributeAssurances(
      filter: {
        product: { id: $productId },
        material: { id: $materialId },
        organizationFacility: { id: $supplierId },
        sustainabilityAttribute: { id: $sustainabilityAttributeId },
        organization: { id: $organizationId }
      }
    )
  }
`;

export const GET_ALL_MATERIALS_FOR_ORG = gql`
  query Materials($filter: MaterialsListFilter!) {
    materials(filter: $filter) {
      id
      name
      materialCategory
      materialSubcategory
      materialSuppliers {
        id
        organizationFacility {
          id
          name
          supplierTier
          attributeAssurances {
            id
            effectiveEndDate
            sustainabilityAttribute {
              id
              name
              level
              logoUrl
            }
            organizationFile {
              id
            }
          }
        }
      }
      attributeAssurances {
        id
        effectiveEndDate
        sustainabilityAttribute {
          id
          name
          level
          logoUrl
        }
        organizationFile {
          id
        }
      }
      productMaterials {
        id
        product {
          id
          organizationFacility {
            id
            name
          }
          attributeAssurances {
            id
            effectiveEndDate
            sustainabilityAttribute {
              id
              name
              level
              logoUrl
            }
            organizationFile {
              id
            }
          }
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
        effectiveEndDate
        organizationFile {
          id
        }
        sustainabilityAttribute {
          id
          level
          logoUrl
          name
        }
      }
      materialSuppliers {
        material {
          id
          name
          attributeAssurances {
            id
            effectiveEndDate
            organizationFile {
              id
            }
            sustainabilityAttribute {
              id
              level
              logoUrl
              name
            }
          }
        }
      }
      products {
        id
        name
        attributeAssurances {
          id
          effectiveEndDate
          organizationFile {
            id
          }
          sustainabilityAttribute {
            id
            level
            logoUrl
            name
          }
        }
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
      productCategory
      productSubcategory
      description
      metadata
      seasonCode
      upcCode
      brandProductId
      supplierProductId
      productMaterials {
        id
        yield
        unitOfMeasure
        weight
        material {
          id
          name
          materialCategory
          materialSubcategory
          emissionsFactor
          materialSuppliers {
            id
            organizationFacility {
              id
              name
              attributeAssurances {
                id
                effectiveEndDate
                organizationFile {
                  id
                }
                sustainabilityAttribute {
                  id
                  level
                  logoUrl
                  name
                }
              }
            }
          }
          attributeAssurances {
            id
            effectiveEndDate
            organizationFile {
              id
            }
            sustainabilityAttribute {
              id
              level
              logoUrl
              name
            }
          }
        }
      }
      attributeAssurances {
        id
        effectiveEndDate
        organizationFile {
          id
        }
        sustainabilityAttribute {
          id
          level
          logoUrl
          name
        }
      }
      organizationFacility {
        id
        name
        attributeAssurances {
          id
          effectiveEndDate
          organizationFile {
            id
          }
          sustainabilityAttribute {
            id
            level
            logoUrl
            name
          }
        }
      }
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
        effectiveEndDate
        material {
          id
          name
        }
        organizationFile {
          id
        }
        organization {
          id
          name
        }
        organizationFacility {
          id
          name
        }
        product {
          id
          name
        }
      }
      level
      logoUrl
      name
    }
  }
`;

export const GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS = gql`
  query SustainabilityAttributes($organizationId: ID!) {
    sustainabilityAttributes(filter: { level: PRODUCT }) {
      id
      attributeAssurances(
        filter: {
          organization: { id: $organizationId },
        }
      ) {
        id
        effectiveEndDate
        organizationFile {
          id
        }
        product {
          id
        }
      }
      level
      logoUrl
      name
    }
  }
`;

export const GET_SUPPLIER = gql`
  query GetOrganizationFacility($id: ID!) {
    organizationFacility(id: $id) {
      id
      name
      supplierTier
      addressLine1
      addressLine2
      city
      stateProvince
      postalCode
      country
      attributeAssurances {
        id
        effectiveEndDate
        organizationFile {
          id
        }
        sustainabilityAttribute {
          id
          level
          logoUrl
          name
        }
      }
      materialSuppliers {
        id
        material {
          id
          name
          materialCategory
          materialSubcategory
          attributeAssurances {
            id
            effectiveEndDate
            organizationFile {
              id
            }
            sustainabilityAttribute {
              id
              level
              logoUrl
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      productCategory
      productSubcategory
      description
      metadata
      seasonCode
      upcCode
      brandProductId
      supplierProductId
      productMaterials {
        id
        yield
        unitOfMeasure
        weight
        material {
          id
          name
          materialCategory
          materialSubcategory
          emissionsFactor
          materialSuppliers {
            id
            organizationFacility {
              id
              name
              attributeAssurances {
                id
                effectiveEndDate
                organizationFile {
                  id
                }
                sustainabilityAttribute {
                  id
                  level
                  logoUrl
                  name
                }
              }
            }
          }
          attributeAssurances {
            id
            effectiveEndDate
            organizationFile {
              id
            }
            sustainabilityAttribute {
              id
              level
              logoUrl
              name
            }
          }
        }
      }
      attributeAssurances {
        id
        effectiveEndDate
        organizationFile {
          id
        }
        sustainabilityAttribute {
          id
          level
          logoUrl
          name
        }
      }
      organizationFacility {
        id
        name
        attributeAssurances {
          id
          effectiveEndDate
          organizationFile {
            id
          }
          sustainabilityAttribute {
            id
            level
            logoUrl
            name
          }
        }
      }
    }
  }
`;

export const GET_MATERIAL = gql`
  query GetMaterial($id: ID!) {
    material(id: $id) {
      id
      brandMaterialId
      materialCategory
      materialSubcategory
      name
      supplierMaterialId
      attributeAssurances {
        id
        effectiveEndDate
        organizationFile {
          id
        }
        sustainabilityAttribute {
          id
          level
          logoUrl
          name
        }
      }
      materialSuppliers {
        id
        organizationFacility {
          id
          name
          country
        }
      }
    }
  }
`;

export const GET_SUSTAINABILITY_ATTRIBUTE = gql`
  query GetSustainabilityAttribute($id: ID!, $organizationId: ID!) {
    sustainabilityAttribute(id: $id) {
      id
      level
      logoUrl
      name
      attributeAssurances(filter: { organization: { id: $organizationId } }) {
        id
        effectiveEndDate
        material {
          id
          name
        }
        organizationFile {
          id
        }
        organization {
          id
          name
        }
        organizationFacility {
          id
          name
        }
        product {
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
  GET_ALL_PRODUCTS_TO_ADD_ASSURANCE_TO_DOCUMENT: GET_ALL_PRODUCTS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT: GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT,
  CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE: CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE,
  UPDATE_DOCUMENT_FIELDS: UPDATE_DOCUMENT_FIELDS,
  UPDATE_DOCUMENT_ASSURANCE: UPDATE_DOCUMENT_ASSURANCE,
  DELETE_ATTRIBUTE_ASSURANCE: DELETE_ATTRIBUTE_ASSURANCE,
  DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE: DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE,
  GET_ALL_MATERIALS_FOR_ORG: GET_ALL_MATERIALS_FOR_ORG,
  GET_ALL_SCHEMA_ENUMS: GET_ALL_SCHEMA_ENUMS,
  GET_ALL_SUPPLIERS_FOR_ORG: GET_ALL_SUPPLIERS_FOR_ORG,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS,
  CREATE_MATERIAL: CREATE_MATERIAL,
  CREATE_MATERIAL_SUPPLIER: CREATE_MATERIAL_SUPPLIER,
  GET_ALL_PRODUCTS: GET_ALL_PRODUCTS,
  CREATE_PRODUCT_MATERIAL: CREATE_PRODUCT_MATERIAL,
  CREATE_SUPPLIER: CREATE_SUPPLIER,
  UPDATE_PRODUCT: UPDATE_PRODUCT,
  GET_SUPPLIER: GET_SUPPLIER,
  GET_PRODUCT: GET_PRODUCT,
  GET_MATERIAL: GET_MATERIAL,
  GET_SUSTAINABILITY_ATTRIBUTE: GET_SUSTAINABILITY_ATTRIBUTE,
};
