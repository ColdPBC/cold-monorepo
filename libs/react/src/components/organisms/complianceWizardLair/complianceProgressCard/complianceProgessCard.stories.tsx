import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceProgressCard } from '@coldpbc/components';
import { getSurveyAllOtherQuestionsAnsweredSurveyMock, getSurveyComplianceFlowSomeCompleteSurveyMock, getSurveyFormDataByName } from '@coldpbc/mocks';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';

const meta: Meta<typeof ComplianceProgressCard> = {
  title: 'Organisms/ComplianceProgressCard',
  component: ComplianceProgressCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    surveyData: getSurveyFormDataByName('rei_consolidated_survey') as ComplianceSurveyPayloadType,
  },
};

export const SomeComplete: Story = {
  args: {
    surveyData: getSurveyComplianceFlowSomeCompleteSurveyMock('rei_consolidated_survey'),
  },
};

export const AllOtherQuestionsComplete: Story = {
  args: {
    surveyData: getSurveyAllOtherQuestionsAnsweredSurveyMock('rei_consolidated_survey'),
  },
};
