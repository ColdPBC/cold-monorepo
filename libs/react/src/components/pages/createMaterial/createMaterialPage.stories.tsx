import { Meta, StoryObj } from '@storybook/react';
import { CreateMaterialPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { expect, userEvent, within } from '@storybook/test';

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
    await step('Show name input error', async () => {
      const input = await canvas.findByTestId('input_name');
      await userEvent.type(input, 'Material 6');
      const saveButton = await canvas.findByTestId('save_button');
      await expect(saveButton).toBeDisabled();
      const error = await canvas.findByTestId('input_error_name');
      await expect(error).toHaveTextContent('Material name already exists');
    });

  }
};
