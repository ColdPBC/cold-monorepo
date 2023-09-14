import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {
  SurveyQuestionContainer,
  SurveyQuestionContainerProps,
} from '@coldpbc/components';
import { getSurveyFormDataPayload } from '@coldpbc/mocks';

const meta = {
  title: 'Molecules/SurveyQuestionContainer',
  component: SurveyQuestionContainer,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
} satisfies Meta<typeof SurveyQuestionContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyQuestionContainerStory = (args: SurveyQuestionContainerProps) => {
  const [activeKey, setActiveKey] = React.useState(args.activeKey);
  const [surveyData, setSurveyData] = React.useState(args.surveyData);

  return (
    <SurveyQuestionContainer
      {...args}
      activeKey={activeKey}
      setActiveKey={setActiveKey}
      surveyData={surveyData}
      setSurveyData={setSurveyData}
    />
  );
};

export const Default: Story = {
  render: (args) => <SurveyQuestionContainerStory {...args} />,
  args: {
    activeKey: {
      value: 'product',
      isFollowUp: false,
    },
    surveyData: getSurveyFormDataPayload(),
  },
};
