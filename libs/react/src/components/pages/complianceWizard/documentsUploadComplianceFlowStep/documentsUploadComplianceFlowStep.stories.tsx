import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ApplicationToaster, DocumentsUploadComplianceFlowStep } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof DocumentsUploadComplianceFlowStep> = {
  title: 'Organisms/DocumentsUploadWizard',
  component: DocumentsUploadComplianceFlowStep,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider
        wizardContext={{
          nextStep: () => {},
          prevStep: () => {},
          setCurrentStep: () => {},
          currentStep: { title: '', name: '', route: '' },
          data: {
            compliances: [
              {
                id: 'cmp-1',
                name: 'rei',
                title: 'REI',
                logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/rei-logo-1.svg',
                surveys: ['rei_mfg_survey', 'rei_ghg_survey', 'rei_pkg_survey'],
                created_at: '2020-03-03T23:50:31.000Z',
                updated_at: '2020-03-03T23:50:31.000Z',
              },
            ],
            name: 'rei',
          },
          navigateToStep: () => {},
        }}>
        <DocumentsUploadComplianceFlowStep {...args} />
        <ApplicationToaster />
      </StoryMockProvider>
    );
  },
};
