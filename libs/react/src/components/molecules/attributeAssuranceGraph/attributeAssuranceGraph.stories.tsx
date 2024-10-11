import { Meta, StoryObj } from "@storybook/react";

import { AttributeAssuranceGraph } from '@coldpbc/components';

const meta: Meta<typeof AttributeAssuranceGraph> = {
  title: "Molecules/AttributeAssuranceGraph",
  component: AttributeAssuranceGraph,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: 'MATERIAL',
    activeCount: 7,
    expiredCount: 8,
    notDocumentedCount: 12,
  }
};

export const NoAssurances: Story = {
  args: {
    entity: 'PRODUCT',
    activeCount: 0,
    expiredCount: 0,
    notDocumentedCount: 0,
  }
};

export const OnlyActive: Story = {
  args: {
    entity: 'ORGANIZATION',
    activeCount: 10,
    expiredCount: 0,
    notDocumentedCount: 0,
  }
};

export const OnlyNotDocumented: Story = {
  args: {
    entity: 'SUPPLIER',
    activeCount: 0,
    expiredCount: 0,
    notDocumentedCount: 10,
  }
};
