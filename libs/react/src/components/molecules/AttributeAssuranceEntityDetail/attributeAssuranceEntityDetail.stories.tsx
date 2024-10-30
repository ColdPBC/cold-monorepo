import { Meta, StoryObj } from '@storybook/react';

import { AttributeAssuranceEntityDetail } from '@coldpbc/components';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import { AttributeAssuranceMock } from '@coldpbc/mocks';

const meta: Meta<typeof AttributeAssuranceEntityDetail> = {
  title: 'Molecules/AttributeAssuranceEntityDetail',
  component: AttributeAssuranceEntityDetail,
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
        ...Array(8).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: AttributeAssuranceStatus.EXPIRED, index: (index + 7) })),
        ...Array(12).fill(null).map((_, index) => AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: AttributeAssuranceStatus.NOT_DOCUMENTED, index: (index + 15) }))
      ],
      level: EntityLevel.MATERIAL,
    },
    expanded: false,
    onClick: () => {},
  }
};

export const EmptyList: Story = {
  args: {
    sustainabilityAttribute: {
      id: 'a',
      name: 'Default Material Attribute',
      attributeAssurances: [],
      level: EntityLevel.MATERIAL,
    },
    expanded: false,
    onClick: () => {},
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
    expanded: false,
    onClick: () => {},
  }
};
