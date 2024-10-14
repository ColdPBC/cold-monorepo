import { Meta, StoryObj } from "@storybook/react";

import { SustainabilityAttributeLogoOverflow } from '@coldpbc/components';

const meta: Meta<typeof SustainabilityAttributeLogoOverflow> = {
  title: "Molecules/SustainabilityAttributeLogoOverflow",
  component: SustainabilityAttributeLogoOverflow,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    overflowItemCount: 3
  }
};
