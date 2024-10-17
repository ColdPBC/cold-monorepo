import { Meta, StoryObj } from "@storybook/react";

import { SustainabilityAttributeCard } from '@coldpbc/components';
import { AttributeAssuranceMock, StoryMockProvider } from '@coldpbc/mocks';
import React from 'react';
import { EntityLevel } from '@coldpbc/enums';

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
      level: EntityLevel.PRODUCT,
    }
  }
};

export const MaterialAttributeWithLogoAndOneAssurance: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Global Recycled Standard',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
      attributeAssurances: [
        AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'ACTIVE', index: 1}),
      ],
      level: EntityLevel.MATERIAL,
    }
  }
};

export const SupplierAttributeWithLogoAndManyAssurances: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Fair Wear',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
      attributeAssurances: [
        AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'ACTIVE', index: 1}),
        AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'ACTIVE', index: 2}),
        AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 3}),
        AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 4}),
        AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 5}),
      ],
      level: EntityLevel.SUPPLIER,
    }
  }
};

export const LongNameThatTruncatesInsideOfASmallBox: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/No+Image.png',
      attributeAssurances: [
        AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'ACTIVE', index: 1}),
        AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'ACTIVE', index: 2}),
        AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'EXPIRED', index: 3}),
        AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'EXPIRED', index: 4}),
        AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'NOT DOCUMENTED', index: 5}),
      ],
      level: EntityLevel.PRODUCT,
    }
  },
  render: args => {
    return (
      <StoryMockProvider>
        <div className="max-w-[475px]">
          <SustainabilityAttributeCard {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};
