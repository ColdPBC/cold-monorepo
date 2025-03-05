import { Meta, StoryObj } from '@storybook/react';
import { UploadsPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import {within} from "@storybook/test";

const meta: Meta<typeof UploadsPage> = {
  title: 'Pages/UploadsPage',
  component: UploadsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <UploadsPage />
      </StoryMockProvider>
    );
  },
};

export const OpenUploadModal: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <UploadsPage />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.parentElement) return;

    const canvas = within(canvasElement.parentElement);
    const uploadButton = canvas.getByTestId('upload-button');
    uploadButton.click();
    await canvas.findByText('What are you uploading?');
  },
};
