import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentsPage } from '@coldpbc/components';
import { filesProcessingMocks, filesWithAssurancesMocks, filesWithOutAssurancesMocks, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof DocumentsPage> = {
  title: 'Pages/DocumentsPage',
  component: DocumentsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FilesWithNoAssurances: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={filesWithOutAssurancesMocks}>
        <DocumentsPage />
      </StoryMockProvider>
    );
  },
};

export const FilesWithAssurances: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={filesWithAssurancesMocks}>
        <DocumentsPage />
      </StoryMockProvider>
    );
  },
};

export const FilesProcessing: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={filesProcessingMocks}>
        <DocumentsPage />
      </StoryMockProvider>
    );
  },
};
