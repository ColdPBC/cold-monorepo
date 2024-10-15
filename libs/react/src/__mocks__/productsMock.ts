import {ProductsQuery} from "@coldpbc/interfaces";

export const getProductsMock = (): ProductsQuery[] => {
  return [
    {
      id: '1',
      name: 'Product 1',
      productMaterials: [],
      attributeAssurances: [],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: null,
      upcCode: '123456789',
      styleCode: null,
      productCategoryHeirarchy: null,
    },
    {
      id: '2',
      name: 'Product 2',
      productMaterials: [],
      attributeAssurances: [],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: null,
      upcCode: '123456789',
      styleCode: null,
      productCategoryHeirarchy: null,
    },
    {
      id: '3',
      name: 'Product 3',
      productMaterials: [],
      attributeAssurances: [],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: null,
      upcCode: '123456789',
      styleCode: null,
      productCategoryHeirarchy: null,
    },
  ]
}
