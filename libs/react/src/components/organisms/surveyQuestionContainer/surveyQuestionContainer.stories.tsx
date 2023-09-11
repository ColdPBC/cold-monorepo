import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {SurveyQuestionContainer, SurveyQuestionContainerProps} from '@coldpbc/components';
import {getTestingSurveyData} from '@coldpbc/mocks';

const meta = {
  title: "Organisms/SurveyQuestionContainer",
  component: SurveyQuestionContainer,
  tags: ["autodocs"],
  decorators: [withKnobs],
  argTypes: {

  },
} satisfies Meta<typeof SurveyQuestionContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyQuestionContainerStory = (args: SurveyQuestionContainerProps) => {

  const [activeKey, setActiveKey] = React.useState(args.activeKey);
  const [surveyFormDefinition, setSurveyFormDefinition] = React.useState(args.surveyFormDefinition);

  return <SurveyQuestionContainer
    {...args}
    surveyFormDefinition={surveyFormDefinition}
    setSurveyFormDefinition={setSurveyFormDefinition}
    activeKey={activeKey}
    setActiveKey={setActiveKey}
  />
}

export const Default: Story = {
  render: (args) => <SurveyQuestionContainerStory {...args} />,
  args: {
    activeKey: "product",
    surveyFormDefinition: getTestingSurveyData().definition,
    surveyName: "qaalib_test",
  },
};

