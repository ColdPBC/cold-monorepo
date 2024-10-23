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
      productMaterials: [],
      organizationFacility: null,
    }
  }
};
