import { Meta, StoryObj } from "@storybook/react";

import {SustainabilityAttributeCard} from './sustainabilityAttributeCard';
import { SustainabilityAttributesLevel, SustainabilityAttributesType } from '../../../../../../apps/cold-graphql/src/types.generated';

const meta: Meta<typeof SustainabilityAttributeCard> = {
  title: "Molecules/SustainabilityAttributeCard",
  component: SustainabilityAttributeCard,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Product Attribute',
      attributeAssurances: [],
      attributeAssurances_aggregate: { count: 0 },
      deleted: false,
      level: SustainabilityAttributesLevel.Product,
      type: SustainabilityAttributesType.ThirdParty
    }
  }
};

export const MaterialAttributeWithLogoAndOneAssurance: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Global Recycled Standard',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
      attributeAssurances: [],
      attributeAssurances_aggregate: { count: 1 },
      deleted: false,
      level: SustainabilityAttributesLevel.Material,
      type: SustainabilityAttributesType.ThirdParty
    }
  }
};

export const SupplierAttributeWithLogoAndManyAssurances: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Fair Wear',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
      attributeAssurances: [],
      attributeAssurances_aggregate: { count: 3 },
      deleted: false,
      level: SustainabilityAttributesLevel.Supplier,
      type: SustainabilityAttributesType.ThirdParty
    }
  }
};
