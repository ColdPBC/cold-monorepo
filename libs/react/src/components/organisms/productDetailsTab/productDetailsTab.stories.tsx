import { Meta, StoryObj } from "@storybook/react";

import { ProductDetailsTab } from '@coldpbc/components';
import { getProductsMockById, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ProductDetailsTab> = {
  title: "Molecules/ProductDetailsTab",
  component: ProductDetailsTab,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: getProductsMockById('op_wvjr8v3tdzk6j3wl2x8a26bw')!,
  },
  render: (args) => (
    <StoryMockProvider>
      <ProductDetailsTab {...args} />
    </StoryMockProvider>
  )
};
