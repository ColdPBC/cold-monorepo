import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {SurveyLeftNav, SurveyLeftNavProps} from "./surveyLeftNav";
import {getTestingSurveyData} from "@coldpbc/mocks";

const meta = {
  title: "Organisms/SurveyLeftNav",
  component: SurveyLeftNav,
  tags: ["autodocs"],
  decorators: [withKnobs],
  argTypes: {

  },
} satisfies Meta<typeof SurveyLeftNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyLeftNavStory = (args: SurveyLeftNavProps) => {

  const [activeKey, setActiveKey] = React.useState(args.activeKey);

  return <SurveyLeftNav
    {...args}
    activeKey={activeKey}
    setActiveKey={setActiveKey}
  />
}

export const Intro: Story = {
  render: (args) => <SurveyLeftNavStory {...args} />,
  args: {
    activeKey: "",
    surveyFormDefinition: getTestingSurveyData().definition,
  },
};

export const InSurvey: Story = {
  render: (args) => <SurveyLeftNavStory {...args} />,
  args: {
    activeKey: "product",
    surveyFormDefinition: getTestingSurveyData().definition,
  },
};
