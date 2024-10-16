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
      brandProductId: '123456789',
      supplierProductId: '123456789',
      description: 'Description 1',
      productCategory: 'Product Category 1',
      productSubcategory: 'Product Subcategory 1',
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
      brandProductId: '123456789',
      supplierProductId: '123456789',
      description: 'pneumonoultramicroscopicsilicovolcanoconiosis Odio quis eum non ullam voluptatem quas. Aut hic laboriosam nesciunt nisi omnis voluptas expedita. Quos iusto totam doloribus molestiae eum dolores sint ipsam. Maxime fuga neque qui ipsam tempore. Quisquam quia exercitationem voluptatum et earum enim beatae exercitationem quas. Nihil voluptatem maiores vel hic necessitatibus cumque.',
      productCategory: null,
      productSubcategory: 'Product Subcategory 1',
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
      brandProductId: '123456789',
      supplierProductId: '123456789',
      description: 'Description 1',
      productCategory: 'Product Category 1',
      productSubcategory: null,
    },
  ]
}
