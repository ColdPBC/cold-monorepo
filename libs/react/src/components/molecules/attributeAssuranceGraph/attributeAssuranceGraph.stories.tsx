import { Meta, StoryObj } from '@storybook/react';

import { AttributeAssuranceGraph } from '@coldpbc/components';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import { AttributeAssuranceMock } from '@coldpbc/mocks';

const meta: Meta<typeof AttributeAssuranceGraph> = {
	title: 'Molecules/AttributeAssuranceGraph',
	component: AttributeAssuranceGraph,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Material Attribute',
      attributeAssurances: [
        ...Array(7).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: AttributeAssuranceStatus.ACTIVE, index })),
        ...Array(8).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: AttributeAssuranceStatus.EXPIRED, index })),
        ...Array(12).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: AttributeAssuranceStatus.NOT_DOCUMENTED, index }))
      ],
      level: EntityLevel.MATERIAL,
    },
  }
};

export const NoAssurances: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Product Attribute',
      attributeAssurances: [],
      level: EntityLevel.PRODUCT,
    },
  }
};

export const OnlyActive: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Organization Attribute',
      attributeAssurances: Array(10).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.ORGANIZATION, status: AttributeAssuranceStatus.ACTIVE, index })),
      level: EntityLevel.ORGANIZATION,
    },
  }
};

export const OnlyNotDocumented: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Supplier Attribute',
      attributeAssurances: Array(10).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: AttributeAssuranceStatus.NOT_DOCUMENTED, index })),
      level: EntityLevel.SUPPLIER,
    },
  }
};
