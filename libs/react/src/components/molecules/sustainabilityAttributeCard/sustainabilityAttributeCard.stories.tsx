import { Meta, StoryObj } from "@storybook/react";

import {SustainabilityAttributeCard} from '@coldpbc/components';

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
      level: 'PRODUCT',
    }
  }
};

export const MaterialAttributeWithLogoAndOneAssurance: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Global Recycled Standard',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
      attributeAssurances: [{ id: 'a'}],
      level: 'MATERIAL',
    }
  }
};

export const SupplierAttributeWithLogoAndManyAssurances: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Fair Wear',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
      attributeAssurances: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      level: 'SUPPLIER',
    }
  }
};
