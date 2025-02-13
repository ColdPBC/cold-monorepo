import { Meta, StoryObj } from '@storybook/react';

import { ProductSustainabilityAttributesCard } from '@coldpbc/components';
import { getProductsMockById } from '@coldpbc/mocks';
import { EntityLevel } from '@coldpbc/enums';

const meta: Meta<typeof ProductSustainabilityAttributesCard> = {
	title: 'Molecules/ProductSustainabilityAttributesCard',
	component: ProductSustainabilityAttributesCard,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      ...getProductsMockById('op_wvjr8v3tdzk6j3wl2x8a26bw')!,
      attributeAssurances: [
        {
          id: '123',
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: 'abc',
            name: 'Bluesign Product',
            level: EntityLevel.PRODUCT,
            logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign+Product.png',
          }
        },
      ],
      productMaterials: [
        {
          id: 'xyz',
          yield: null,
          unitOfMeasure: null,
          weight: null,
          material: {
            id: 'qrs',
            name: 'Organic Wool',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
            organizationFacility: {
              id: 'ofac_123',
              name: 'Tier 2 Supplier',
            },
            attributeAssurances: [
              {
                id: 'aa_123',
                effectiveEndDate: null,
                organizationFile: null,
                sustainabilityAttribute: {
                  id: 'sa_abc',
                  name: 'Responsible Wool Standard',
                  level: EntityLevel.MATERIAL,
                  logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Responsible+Wool+Standard.png',
                }
              },
            ],
            materialClassification: null,
            weightFactor: null,
            weightFactorUnitOfMeasure: null,
            width: null,
            widthUnitOfMeasure: null,
          }
        }
      ],
      organizationFacility: {
        id: 'ofac_tier_1',
        name: 'Tier 1 Supplier',
        attributeAssurances: [
          {
            id: 'aa_tier_1',
            effectiveEndDate: null,
            organizationFile: null,
            sustainabilityAttribute: {
              id: 'ss_tier_1',
              name: 'Tier 1 Supplier Certification',
              level: EntityLevel.SUPPLIER,
            }
          }
        ]
      },
    }
  }
};

export const NoAssurances: Story = {
  args: {
    product: {
      ...getProductsMockById('op_wvjr8v3tdzk6j3wl2x8a26bw')!,
      attributeAssurances: [],
      productMaterials: [
        {
          id: 'xyz',
          yield: null,
          unitOfMeasure: null,
          weight: null,
          material: {
            id: 'qrs',
            name: 'Organic Wool',
            materialCategory: null,
            materialSubcategory: null,
            emissionsFactor: null,
            organizationFacility: {
              id: 'ofac_123',
              name: 'Tier 2 Supplier',
            },
            attributeAssurances: [],
            materialClassification: null,
            weightFactor: null,
            weightFactorUnitOfMeasure: null,
            width: null,
            widthUnitOfMeasure: null,
          },
        }
      ],
      organizationFacility: {
        id: 'ofac_tier_1',
        name: 'Tier 1 Supplier',
        attributeAssurances: [],
      },
    }
  }
};
