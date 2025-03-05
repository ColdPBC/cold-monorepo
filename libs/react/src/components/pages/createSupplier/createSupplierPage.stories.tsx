import { Meta, StoryObj } from '@storybook/react';
import {CreateSupplierPage} from '@coldpbc/components';
import { withKnobs} from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { expect, userEvent, waitForElementToBeRemoved, within } from '@storybook/test';

const meta: Meta<typeof CreateSupplierPage> = {
  title: 'Pages/CreateSupplierPage',
  component: CreateSupplierPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateSupplierPage />
      </StoryMockProvider>
    );
  },
};

export const ShowInputErrorValidation: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateSupplierPage />
      </StoryMockProvider>
    );
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    await step('Show name input error', async () => {
      const input = canvas.getByTestId('input_name');
      // type in Product 1. This should trigger an error
      await userEvent.type(input, 'Supplier 6');
      // check for the save_button to be disabled
      const saveButton = canvas.getByTestId('save_button');
      await expect(saveButton).toBeDisabled();
      // find the input error
      const error = canvas.getByTestId('input_error_name');
      await expect(error).toHaveTextContent('Supplier name already exists');
    });

    await step('Show tier option error handling', async () => {
      // click on the hasProducts combobox
      const combobox = canvas.getByTestId('hasProducts');
      const button = within(combobox).getByTestId('hasProducts_input')
      await userEvent.click(button);
      // select the first option
      const yesOption = within(combobox).getByTestId('option_1');
      await userEvent.click(yesOption);
      // now deselect the option by clicking on the option_0
      await userEvent.click(button);
      const placeHolderOption = within(combobox).getByTestId('option_-1');
      await userEvent.click(placeHolderOption);
      // check for the save_button to be disabled
      const saveButton = canvas.getByTestId('save_button');
      await expect(saveButton).toBeDisabled();
      // expect Supplier tier is required error. fin test id error_supplierTier
      const error = canvas.getByTestId('error_supplierTier');
      await expect(error).toHaveTextContent('Supplier tier is required');
    });

  }
};
