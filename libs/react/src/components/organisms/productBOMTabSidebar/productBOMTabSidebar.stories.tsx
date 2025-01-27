import { Meta, StoryObj } from "@storybook/react";
import { ProductBOMTabSidebar } from '@coldpbc/components';
import { useState } from 'react';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ProductBOMTabSidebar> = {
  title: "Organisms/ProductBOMTabSidebar",
  component: ProductBOMTabSidebar,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SidebarStory {...args} />,
  args: {
    productId: 'op_wvjr8v3tdzk6j3wl2x8a26bw',
    closeSidebar: () => {},
    refresh: () => {}
  }
};


const SidebarStory = (args: any) => {
  const [materialId, setMaterialId] = useState<string | undefined>("mat_1234");

  return (
    <StoryMockProvider>
      <ProductBOMTabSidebar
      {...args}
      closeSidebar={() => {
        setMaterialId(undefined);
      }}
      selectedMaterialId={materialId}
    />
    </StoryMockProvider>
  );
}
