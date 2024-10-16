import {ProductsQuery} from "@coldpbc/interfaces";

export const getProductsMock = (): ProductsQuery[] => {
  return [
    {
      id: '1',
      name: 'Product 1',
      productMaterials: [
        {
          id: '1',
          material: {
            id: '1',
            name: 'Material 1',
          }
        },
        {
          id: '2',
          material: {
            id: '2',
            name: 'Material 2',
          }
        }
      ],
      attributeAssurances: [
        {
          id: '1',
          sustainabilityAttribute: {
            id: '1',
            name: 'Sustainability Attribute 1',
          }
        },
        {
          id: '2',
          sustainabilityAttribute: {
            id: '2',
            name: 'Sustainability Attribute 2',
          }
        }
      ],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: '123456789',
      upcCode: '123456789',
      styleCode: '123456789',
    },
    {
      id: '2',
      name: 'Product 2',
      productMaterials: [
        {
          id: '1',
          material: {
            id: '1',
            name: 'Material 1',
          }
        }
      ],
      attributeAssurances: [
        {
          id: '1',
          sustainabilityAttribute: {
            id: '1',
            name: 'Sustainability Attribute 1',
          }
        }
      ],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: '123456789',
      upcCode: '123456789',
      styleCode: '123456789',
    },
    {
      id: '3',
      name: 'Product 3',
      productMaterials: [
        {
          id: '1',
          material: {
            id: '1',
            name: 'Material 1',
          }
        }
      ],
      attributeAssurances: [
        {
          id: '1',
          sustainabilityAttribute: {
            id: '1',
            name: 'Sustainability Attribute 1',
          }
        }
      ],
      organizationFacility: {
        id: '1',
        name: 'Facility 1',
      },
      metadata: null,
      seasonCode: '123456789',
      upcCode: '123456789',
      styleCode: '123456789',
    },
  ]
}
