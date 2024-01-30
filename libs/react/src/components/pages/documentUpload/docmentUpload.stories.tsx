import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentUpload } from '@coldpbc/components';
import { getDocumentListHandler, StoryMockProvider } from '@coldpbc/mocks';
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);
    await step('Check Document Upload Screen Default', async () => {
      // check if the Document Upload title is displayed
      await canvas.findByText('Documents');
      await canvas.findByText('Documents List');
      // find document-list-card
      const documentListCard = await canvas.findByTestId('documents-list-card');
      // find document-list-card-table in document-list-card
      const documentListCardTable = await within(documentListCard).findByTestId('documents-list-table');
      // wait for role status in table to be removed
      await within(documentListCardTable).queryByRole('status');
      await canvas.findByText('Document Name');
      await canvas.findByText('Document Type');
      // find file input with label Document Upload
      const fileInput = (await canvas.findByLabelText('Document Upload')) as HTMLInputElement;
      const file = new File(['test file content'], 'fakeFile.txt', {
        type: 'text/plain',
      });
      await userEvent.upload(fileInput, file);
      await expect(fileInput.files).toHaveLength(1);
      // find fakeFile and txt in document-list-card-table
      await canvas.findByText('fakeFile');
      await canvas.findByText('txt');
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);
    await step('Check Document Upload Screen No Documents', async () => {
      // check if the Document Upload title is displayed
      await canvas.findByText('Documents');
      await canvas.findByText('Documents List');
      // find document-list-card
      const documentListCard = await canvas.findByTestId('documents-list-card');
      // find documents-list-card-no-documents in document-list-card
      await within(documentListCard).findByTestId('documents-list-card-no-documents');
      // upload a file
      const fileInput = (await canvas.findByLabelText('Document Upload')) as HTMLInputElement;
      const file = new File(['test file content'], 'fakeFile.txt', {
        type: 'text/plain',
      });
      await userEvent.upload(fileInput, file);
      // verify that the file is in the documents-list-table
      await within(documentListCard).findByText('fakeFile');
      await within(documentListCard).findByText('txt');
      await within(documentListCard).findByTestId('documents-list-table');
    });
  },
};
