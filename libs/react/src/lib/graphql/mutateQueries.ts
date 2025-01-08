import {gql} from "@apollo/client";


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

export const CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE = gql`
  mutation CreateAttributeAssurance($input: AttributeAssuranceInsertInput!) {
    createAttributeAssurance(input: $input) {
      effectiveStartDate
      effectiveEndDate
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

export const DELETE_ATTRIBUTE_ASSURANCES = gql`
  mutation DeleteAttributeAssurances($filter: AttributeAssurancesListFilter!) {
    deleteAttributeAssurances(filter: $filter)
  }
`;

export const CREATE_ATTRIBUTE_ASSURANCES = gql`
  mutation CreateAttributeAssurances($input: [AttributeAssuranceInsertInput!]!) {
    createAttributeAssurances(input: $input) {
      id
    }
  }
`;

export const UPDATE_MATERIAL_CLASSIFICATION = gql`
  mutation UpdateMaterial($input: MaterialUpdateInput!) {
    updateMaterial(input: $input) {
      id
      materialClassification {
        id
        name
      }
    }
  }
`;

export const DELETE_MATERIAL = gql`
  mutation DeleteMaterial($filter: DeleteOneFilterInput!) {
    deleteMaterial(filter: $filter)
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($filter: DeleteOneFilterInput!) {
    deleteProduct(filter: $filter)
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation DeleteOrganizationFacility($filter: DeleteOneFilterInput!) {
    deleteOrganizationFacility(filter: $filter)
  }
`;

export const DELETE_MATERIAL_SUPPLIER = gql`
  mutation DeleteMaterialSupplier($filter: DeleteOneFilterInput!) {
    deleteMaterialSupplier(filter: $filter)
  }
`;

export const DELETE_MATERIAL_SUPPLIERS = gql`
  mutation DeleteMaterialSuppliers($filter: MaterialSuppliersListFilter!) {
    deleteMaterialSuppliers(filter: $filter)
  }
`;

export const UPDATE_PRODUCTS = gql`
  mutation UpdateProducts($input: [ProductUpdateInput!]!) {
    updateProducts(input: $input) {
      id
    }
  }
`;
