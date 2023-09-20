import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getSurveyFormDataPayload } from '@coldpbc/mocks';
import { SurveyRightNav, SurveyRightNavProps } from './surveyRightNav';

const meta = {
  title: 'Organisms/SurveyRightNav',
  component: SurveyRightNav,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
} satisfies Meta<typeof SurveyRightNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyRightNavStory = (args: SurveyRightNavProps) => {
  const [activeKey, setActiveKey] = React.useState(args.activeKey);
  const [surveyData, setSurveyData] = React.useState(args.surveyData);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submitSurvey = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const startSurvey = () => {
    setActiveKey({
      value: Object.keys(surveyData.definition.sections)[0],
      isFollowUp: false,
    });
  };

  return (
    <SurveyRightNav
      {...args}
      activeKey={activeKey}
      setActiveKey={setActiveKey}
      surveyData={surveyData}
      setSurveyData={setSurveyData}
      submitSurvey={submitSurvey}
      startSurvey={startSurvey}
    />
  );
};

export const Default: Story = {
  render: (args) => <SurveyRightNavStory {...args} />,
  args: {
    activeKey: {
      value: '',
      isFollowUp: false,
    },
    surveyData: getSurveyFormDataPayload(),
  },
};
