import { Meta, StoryObj } from "@storybook/react";

import { SustainabilityAttributeColumnList } from '@coldpbc/components';
import { AttributeAssuranceMock, StoryMockProvider } from '@coldpbc/mocks';
import React from 'react';

const meta: Meta<typeof SustainabilityAttributeColumnList> = {
  title: "Molecules/SustainabilityAttributeListColumn",
  component: SustainabilityAttributeColumnList,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sustainabilityAttributes: [
      // Active Assurance
      {
        id: 'a',
        name: 'Default Product Attribute',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'PRODUCT', status: 'ACTIVE', index: 1}),
          AttributeAssuranceMock({ entity: 'MATERIAL', status: 'EXPIRING', index: 2}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 3}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'NOT DOCUMENTED', index: 4}),
        ],
        level: 'PRODUCT',
      },
      // Expiring Assurance
      {
        id: 'a',
        name: 'Global Recycled Standard',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'MATERIAL', status: 'EXPIRING', index: 1}),
        ],
        level: 'MATERIAL',
      },
      // Expired Assurance
      {
        id: 'a',
        name: 'Fair Wear',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 1}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 2}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'NOT DOCUMENTED', index: 3}),
        ],
        level: 'SUPPLIER',
      },
      // Not documented
      {
        id: 'a',
        name: 'Another Default Product Attribute',
        attributeAssurances: [],
        level: 'SUPPLIER',
      }
    ]
  }
};

export const FixedWidthToFit2ItemsPlusOverflow: Story = {
  args: {
    sustainabilityAttributes: [
      // Not documented
      {
        id: 'a',
        name: 'Another Default Product Attribute',
        attributeAssurances: [],
        level: 'SUPPLIER',
      },
      // Expiring Assurance
      {
        id: 'a',
        name: 'Global Recycled Standard',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'MATERIAL', status: 'EXPIRING', index: 1}),
        ],
        level: 'MATERIAL',
      },
      // Expired Assurance
      {
        id: 'a',
        name: 'Fair Wear',
        logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 1}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 2}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'NOT DOCUMENTED', index: 3}),
        ],
        level: 'SUPPLIER',
      },
      // Active Assurance
      {
        id: 'a',
        name: 'Default Product Attribute',
        attributeAssurances: [
          AttributeAssuranceMock({ entity: 'PRODUCT', status: 'ACTIVE', index: 1}),
          AttributeAssuranceMock({ entity: 'MATERIAL', status: 'EXPIRING', index: 2}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'EXPIRED', index: 3}),
          AttributeAssuranceMock({ entity: 'SUPPLIER', status: 'NOT DOCUMENTED', index: 4}),
        ],
        level: 'PRODUCT',
      },
    ]
  },
  render: args => {
    return (
      <StoryMockProvider>
        <div className="max-w-[300px]">
          <SustainabilityAttributeColumnList {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};

export const Empty: Story = {
  args: {
    sustainabilityAttributes: []
  }
};
