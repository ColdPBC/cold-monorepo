import { Meta, StoryObj } from "@storybook/react";
import { ProductBOMTabSidebar } from '@coldpbc/components';
import { useState } from 'react';
import { getProductsMock, getProductsMockById, StoryMockProvider } from '@coldpbc/mocks';
import { userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ProductBOMTabSidebar> = {
  title: "Organisms/ProductBOMTabSidebar",
  component: ProductBOMTabSidebar,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarStory = (args: any) => {
  const productMaterialMock = getProductsMockById(args.productId)?.productMaterials[0];
  const materialMock = productMaterialMock?.material;
  const [material, setMaterial] = useState<{
      id: string;
      name: string;
      productMaterial: {
        id: string;
        yield: number | null;
        unitOfMeasure: string | null;
        weight: number | null;
      };
    }
    | undefined
  >({
    id: materialMock?.id || '',
    name: materialMock?.name || '',
    productMaterial: {
      id: productMaterialMock?.id || '',
      yield: productMaterialMock?.yield || null,
      unitOfMeasure: productMaterialMock?.unitOfMeasure || null,
      weight: productMaterialMock?.weight || null,
    },
  });
  return (
    <StoryMockProvider>
      <ProductBOMTabSidebar
      {...args}
      closeSidebar={() => {
        setMaterial(undefined);
      }}
      material={material}
    />
    </StoryMockProvider>
  );
}

export const Default: Story = {
  render: (args) => <SidebarStory {...args} />,
  args: {
    productId: getProductsMock()[0].id,
    closeSidebar: () => {},
    refresh: () => {}
  }
};

export const PiecesWholeNumberError: Story = {
  render: (args) => <SidebarStory {...args} />,
  args: {
    productId: getProductsMock()[0].id,
    closeSidebar: () => {},
    refresh: () => {},
},
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    await step('Show yield input error with pcs uom', async () => {
      const combobox = canvas.getByTestId('uom');
      const button = within(combobox).getByTestId('uom_input')
      await userEvent.click(button);
      // select the pcs option
      const pcsOption = within(combobox).getByTestId('option_6');
      await userEvent.click(pcsOption);
      const saveButton = canvas.getByTestId('save_button');
      await expect(saveButton).toBeEnabled();

      // enter non integer value into the yield input
      const input = canvas.getByTestId('input_yield');
      await userEvent.clear(input);
      await userEvent.type(input, '1.5');
      await expect(saveButton).toBeDisabled();

      // find the error
      const error = canvas.getByTestId('input_error_yield');
      await expect(error).toHaveTextContent('Yield must be a whole number');

      await userEvent.clear(input);
      await userEvent.type(input, '1');
      await expect(saveButton).toBeEnabled();
    });
  }
}
