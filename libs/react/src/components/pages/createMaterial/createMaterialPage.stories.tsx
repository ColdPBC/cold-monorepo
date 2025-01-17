import { Meta, StoryObj } from '@storybook/react';
import { CreateMaterialPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CreateMaterialPage> = {
  title: 'Pages/CreateMaterialPage',
  component: CreateMaterialPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateMaterialPage />
      </StoryMockProvider>
    );
  },
};

export const ShowInputErrorValidation: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateMaterialPage />
      </StoryMockProvider>
    );
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    await step('Show name input error', async () => {
      const input = canvas.getByTestId('input_name');
      await userEvent.type(input, 'Material 6');
      const saveButton = canvas.getByTestId('save_button');
      await expect(saveButton).toBeDisabled();
      const error = canvas.getByTestId('input_error_name');
      await expect(error).toHaveTextContent('Material name already exists');
    });

  }
};
