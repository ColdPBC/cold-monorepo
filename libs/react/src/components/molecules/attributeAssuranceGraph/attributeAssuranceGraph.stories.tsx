import { Meta, StoryObj } from '@storybook/react';

import { AttributeAssuranceGraph } from '@coldpbc/components';
import { EntityLevel } from '@coldpbc/enums';

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
    entity: EntityLevel.MATERIAL,
    activeCount: 7,
    expiredCount: 8,
    notDocumentedCount: 12,
  }
};

export const NoAssurances: Story = {
  args: {
    entity: EntityLevel.PRODUCT,
    activeCount: 0,
    expiredCount: 0,
    notDocumentedCount: 0,
  }
};

export const OnlyActive: Story = {
  args: {
    entity: EntityLevel.ORGANIZATION,
    activeCount: 10,
    expiredCount: 0,
    notDocumentedCount: 0,
  }
};

export const OnlyNotDocumented: Story = {
  args: {
    entity: EntityLevel.SUPPLIER,
    activeCount: 0,
    expiredCount: 0,
    notDocumentedCount: 10,
  }
};
