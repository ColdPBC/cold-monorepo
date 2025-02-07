import { Meta, StoryObj } from '@storybook/react';

import { SustainabilityAttributeTab } from '@coldpbc/components';
import { AttributeAssuranceMock, StoryMockProvider } from '@coldpbc/mocks';
import {AttributeAssuranceStatus, EntityLevel, MainDocumentCategory} from '@coldpbc/enums';
import {UploadModal} from "./uploadModal";
import {NetworkStatus} from "@apollo/client";
import {within} from "@storybook/testing-library";

const meta: Meta<typeof UploadModal> = {
  title: 'Organisms/UploadModal',
  component: UploadModal,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    types: [
      MainDocumentCategory.BillOfMaterial,
      MainDocumentCategory.Assurance,
      MainDocumentCategory.InternalSustainabilityPolicy,
      MainDocumentCategory.SustainabilityData,
    ],
    refreshData: async () => ({ data: { organizationFiles: [] }, loading: false, networkStatus: NetworkStatus.ready })
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <UploadModal {...args} />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement }) => {
    if(!canvasElement.parentElement) return;

    const canvas = within(canvasElement.parentElement);
    // click the upload button
    const uploadButton = canvas.getByTestId('upload-button');
    uploadButton.click();
    await canvas.findByText('What are you uploading?');
  }
};

