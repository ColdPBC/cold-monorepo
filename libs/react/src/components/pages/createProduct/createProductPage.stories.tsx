import { Meta, StoryObj } from '@storybook/react';
import {CreateProductPage} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CreateProductPage> = {
  title: 'Pages/CreateProductPage',
  component: CreateProductPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateProductPage />
      </StoryMockProvider>
    );
  },
};

export const ShowError: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateProductPage />
      </StoryMockProvider>
    );
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const input = canvas.getByTestId('input_name');
    // type in Product 1. This should trigger an error
    await userEvent.type(input, 'Product 1');
    // check for the save_button to be disabled
    const saveButton = canvas.getByTestId('save_button');
    await expect(saveButton).toBeDisabled();
    // find the input error
    const error = canvas.getByTestId('input_error_name');
    await expect(error).toHaveTextContent('Product name already exists');
  }
};
