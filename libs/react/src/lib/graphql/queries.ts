import { DocumentNode, gql } from '@apollo/client';
import {
  CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE,
  CREATE_ATTRIBUTE_ASSURANCES,
  CREATE_MATERIAL,
  CREATE_PRODUCT_MATERIAL,
  CREATE_SUPPLIER,
  DELETE_ATTRIBUTE_ASSURANCE,
  DELETE_ATTRIBUTE_ASSURANCES,
  DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE,
  UPDATE_DOCUMENT_ASSURANCE,
  UPDATE_DOCUMENT_FIELDS,
  UPDATE_MATERIAL,
  UPDATE_PRODUCT,
  UPDATE_SUPPLIER,
  DELETE_MATERIAL,
  DELETE_PRODUCT,
  DELETE_SUPPLIER,
  UPDATE_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT_MATERIALS,
  UPDATE_PRODUCT_MATERIAL
} from './mutateQueries';

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
      processingStatus
      metadata
      effectiveStartDate
      effectiveEndDate
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
          materials {
            id
            name
          }
        }
        material {
          id
          name
          organizationFacility {
            id
            name
            supplierTier
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
      organizationFacility {
        id
        name
      }
    }
  }
`;

export const GET_PAGINATED_MATERIALS_FOR_ORG = gql`
query GET_PAGINATED_MATERIALS_FOR_ORG($filter: MaterialsListFilter!, $pagination: MaterialsPaginationInput!) {
  materials(filter: $filter, pagination: $pagination) {
    id
    name
    materialCategory
    materialSubcategory
    organizationFacility {
      id
      name
      supplierTier
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
      }
    }
  }
  materials_aggregate(filter: $filter) {
    count
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
      materials {
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
      products {
        id
        name
      }
    }
  }
`;

export const GET_PAGINATED_PRODUCTS_FOR_ORG= gql`
  query Products($filter: ProductsListFilter, $pagination: ProductsPaginationInput){
    products(filter: $filter, pagination: $pagination){
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
          materialClassification {
            id
            name
            category
            weightFactor
          }
          emissionsFactor
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
          weightFactor
          weightFactorUnitOfMeasure
          width
          widthUnitOfMeasure
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
    products_aggregate(filter: $filter) {
      count
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
      brandFacilityId
      category
      subcategory
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
      materials {
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
      products {
        id
        name
        productCategory
        productSubcategory
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
          organizationFacility {
            id
            name
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
          materialClassification {
            id
            name
            category
            weightFactor
          }
          weightFactor
          weightFactorUnitOfMeasure
          width
          widthUnitOfMeasure
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
      description
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
      organizationFacility {
        id
        name
        country
      }
      materialClassification {
        id
        name
        weightFactor
      }
      width
      widthUnitOfMeasure
      weightFactor
      weightFactorUnitOfMeasure
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

export const GET_ALL_MATERIALS_FOR_ORG_AS_BASE_ENTITY = gql`
  query Materials($organizationId: ID!) {
    materials(filter: { organization: { id: $organizationId } }) {
      id
      name
      materialCategory
      materialSubcategory
      materialClassification {
        id
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_FOR_ORG_AS_BASE_ENTITY = gql`
  query Products($organizationId: ID!) {
    products(filter: { organization: { id: $organizationId } }) {
      id
      name
      productCategory
      productSubcategory
    }
  }
`;

export const GET_ALL_PRODUCTS_FOR_MATERIAL_LEVEL_SUSTAINABILITY_REPORT = gql`
  query Products($organizationId: ID!) {
    products(filter: { organization: { id: $organizationId } }) {
      id
      name
      productCategory
      productSubcategory
      seasonCode
      organizationFacility {
        id
        name
      }
      productMaterials {
        id
        yield
        unitOfMeasure
        weight
        material {
          id
          name
          materialClassification {
            id
            weightFactor
          }
          weightFactor
          weightFactorUnitOfMeasure
          width
          widthUnitOfMeasure
        }
      }
    }
  }
`;

export const GET_ALL_SUPPLIERS_FOR_ORG_AS_BASE_ENTITY = gql`
  query OrganizationFacilities($organizationId: ID!) {
    organizationFacilities(filter: { organization: { id: $organizationId }, supplier: true }) {
      id
      name
      country
    }
  }
`;

export const GET_PRODUCT_CARBON_FOOTPRINT_DATA = gql`
  query Products($organizationId: ID!) {
    products(filter: { organization: { id: $organizationId } }) {
      id
      name
      productCategory
      productMaterials {
        id
        weight
        material {
          id
          name
          emissionsFactor
        }
      }
    }
  }
`;

export const GET_ALL_SUSTAINABILITY_ATTRIBUTES_WITHOUT_ASSURANCES = gql`
  query SustainabilityAttributes($filter: SustainabilityAttributesListFilter) {
    sustainabilityAttributes(filter: $filter) {
      id
      level
      logoUrl
      name
    }
  }
`;

export const GET_ALL_MATERIAL_CLASSIFICATIONS = gql`
    query MaterialClassifications {
      materialClassifications {
        id
        name
      }
    }
`;

export const GET_ALL_UPLOADS = gql`
  query GetAllUploads($filter: OrganizationFilesListFilter) {
    organizationFiles(filter: $filter) {
      id
      originalName
      createdAt
      type
      processingStatus
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
  GET_PAGINATED_MATERIALS_FOR_ORG: GET_PAGINATED_MATERIALS_FOR_ORG,
  GET_ALL_SCHEMA_ENUMS: GET_ALL_SCHEMA_ENUMS,
  GET_ALL_SUPPLIERS_FOR_ORG: GET_ALL_SUPPLIERS_FOR_ORG,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS: GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS,
  CREATE_MATERIAL: CREATE_MATERIAL,
  GET_PAGINATED_PRODUCTS_FOR_ORG: GET_PAGINATED_PRODUCTS_FOR_ORG,
  CREATE_PRODUCT_MATERIAL: CREATE_PRODUCT_MATERIAL,
  CREATE_SUPPLIER: CREATE_SUPPLIER,
  UPDATE_PRODUCT: UPDATE_PRODUCT,
  GET_SUPPLIER: GET_SUPPLIER,
  GET_PRODUCT: GET_PRODUCT,
  GET_MATERIAL: GET_MATERIAL,
  GET_SUSTAINABILITY_ATTRIBUTE: GET_SUSTAINABILITY_ATTRIBUTE,
  GET_ALL_MATERIALS_FOR_ORG_AS_BASE_ENTITY: GET_ALL_MATERIALS_FOR_ORG_AS_BASE_ENTITY,
  GET_ALL_PRODUCTS_FOR_ORG_AS_BASE_ENTITY: GET_ALL_PRODUCTS_FOR_ORG_AS_BASE_ENTITY,
  GET_ALL_SUPPLIERS_FOR_ORG_AS_BASE_ENTITY: GET_ALL_SUPPLIERS_FOR_ORG_AS_BASE_ENTITY,
  GET_ALL_PRODUCTS_FOR_MATERIAL_LEVEL_SUSTAINABILITY_REPORT: GET_ALL_PRODUCTS_FOR_MATERIAL_LEVEL_SUSTAINABILITY_REPORT,
  DELETE_ATTRIBUTE_ASSURANCES: DELETE_ATTRIBUTE_ASSURANCES,
  CREATE_ATTRIBUTE_ASSURANCES: CREATE_ATTRIBUTE_ASSURANCES,
  GET_PRODUCT_CARBON_FOOTPRINT_DATA: GET_PRODUCT_CARBON_FOOTPRINT_DATA,
  GET_ALL_SUSTAINABILITY_ATTRIBUTES_WITHOUT_ASSURANCES: GET_ALL_SUSTAINABILITY_ATTRIBUTES_WITHOUT_ASSURANCES,
  GET_ALL_MATERIAL_CLASSIFICATIONS: GET_ALL_MATERIAL_CLASSIFICATIONS,
  UPDATE_MATERIAL: UPDATE_MATERIAL,
  UPDATE_SUPPLIER: UPDATE_SUPPLIER,
  DELETE_MATERIAL: DELETE_MATERIAL,
  DELETE_PRODUCT: DELETE_PRODUCT,
  DELETE_SUPPLIER: DELETE_SUPPLIER,
  UPDATE_PRODUCTS: UPDATE_PRODUCTS,
  CREATE_PRODUCT: CREATE_PRODUCT,
  DELETE_PRODUCT_MATERIALS: DELETE_PRODUCT_MATERIALS,
  UPDATE_PRODUCT_MATERIAL: UPDATE_PRODUCT_MATERIAL,
  GET_ALL_UPLOADS: GET_ALL_UPLOADS,
};
