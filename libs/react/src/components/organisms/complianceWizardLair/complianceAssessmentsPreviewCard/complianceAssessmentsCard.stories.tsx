import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceAssessmentsCard } from '@coldpbc/components';
import { getSurveyAllOtherQuestionsAnsweredSurveyMock, getSurveyComplianceFlowSomeCompleteSurveyMock, getSurveyFormDataByName, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';

const meta: Meta<typeof ComplianceAssessmentsCard> = {
  title: 'Organisms/ComplianceAssessmentsCard',
  component: ComplianceAssessmentsCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ComplianceAssessmentsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    surveyData: getSurveyFormDataByName('rei_consolidated_survey') as ComplianceSurveyPayloadType,
  },
};

export const SomeComplete: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ComplianceAssessmentsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    surveyData: getSurveyComplianceFlowSomeCompleteSurveyMock('rei_consolidated_survey'),
  },
};

export const AllOtherQuestionsComplete: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ComplianceAssessmentsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    surveyData: getSurveyAllOtherQuestionsAnsweredSurveyMock('rei_consolidated_survey'),
  },
};
