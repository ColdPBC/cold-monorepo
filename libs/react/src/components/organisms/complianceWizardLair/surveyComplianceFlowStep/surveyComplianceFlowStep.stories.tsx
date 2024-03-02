import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ApplicationToaster, SurveyComplianceFlowStep } from '@coldpbc/components';
import { getSurveyFormDataByName, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SurveyComplianceFlowStep> = {
  title: 'Organisms/SurveyComplianceFlowStep',
  component: SurveyComplianceFlowStep,
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
                id: 'cmp-4',
                name: 'rei2',
                logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/rei-logo-1.svg',
                surveys: ['rei_consolidated_survey'],
                created_at: '2024-02-21T21:24:24.574Z',
                updated_at: '2024-02-21T15:24:14.000Z',
                title: 'REI Consolidated',
              },
            ],
            name: 'rei2',
            surveyData: getSurveyFormDataByName('rei_consolidated_survey'),
          },
          navigateToStep: () => {},
        }}>
        <SurveyComplianceFlowStep {...args} />
        <ApplicationToaster />
      </StoryMockProvider>
    );
  },
};
