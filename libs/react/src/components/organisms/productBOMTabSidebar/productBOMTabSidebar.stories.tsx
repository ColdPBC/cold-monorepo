import { Meta, StoryObj } from "@storybook/react";
import { ProductBOMTabSidebar } from '@coldpbc/components';
import { useState } from 'react';
import { StoryMockProvider } from '@coldpbc/mocks';
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

export const Default: Story = {
  render: (args) => <SidebarStory {...args} />,
  args: {
    productId: 'op_wvjr8v3tdzk6j3wl2x8a26bw',
    closeSidebar: () => {},
    refresh: () => {}
  }
};

export const PiecesWholeNumberError: Story = {
  render: (args) => <SidebarStory {...args} />,
  args: {
    productId: 'op_wvjr8v3tdzk6j3wl2x8a26bw',
    closeSidebar: () => {},
    refresh: () => {}
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
