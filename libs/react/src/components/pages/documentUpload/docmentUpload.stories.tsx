import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentUpload } from '@coldpbc/components';
import { getDocumentListHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof DocumentUpload> = {
  title: 'Pages/DocumentUpload',
  component: DocumentUpload,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={getDocumentListHandler.default}>
        <DocumentUpload />
      </StoryMockProvider>
    );
  },
};

export const NoFiles: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={getDocumentListHandler.noFiles}>
        <DocumentUpload />
      </StoryMockProvider>
    );
  },
};
