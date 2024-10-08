import { Meta, StoryObj } from "@storybook/react";

import {SustainabilityAttributeTab} from './sustainabilityAttributeTab';

const meta: Meta<typeof SustainabilityAttributeTab> = {
  title: "Molecules/SustainabilityAttributeCard",
  component: SustainabilityAttributeTab,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tab: 'My Attributes',
    sustainabilityAttributes: [
      {
        id: 'a',
        name: 'Default Product Attribute',
        attributeAssurances: [{ id: 'a'}],
        level: 'PRODUCT',
      },
      {
        id: 'a',
        name: 'Global Recycled Standard',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
        attributeAssurances: [{ id: 'a'}],
        level: 'MATERIAL',
      },
      {
        id: 'a',
        name: 'Fair Wear',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
        attributeAssurances: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        level: 'SUPPLIER',
      }
    ]
  }
};

export const OtherAttributes: Story = {
  args: {
    tab: 'Other Attributes',
    sustainabilityAttributes: [
      {
        id: 'a',
        name: 'Default Product Attribute',
        attributeAssurances: [],
        level: 'PRODUCT',
      },
      {
        id: 'a',
        name: 'Global Recycled Standard',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
        attributeAssurances: [],
        level: 'MATERIAL',
      },
      {
        id: 'a',
        name: 'Fair Wear',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
        attributeAssurances: [],
        level: 'SUPPLIER',
      }
    ]
  }
};

