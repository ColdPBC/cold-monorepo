import React, { useState } from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import {SurveyIntro} from "./surveyIntro";
import {getTestingSurveyFormDefinition} from "@coldpbc/mocks";

const meta = {
  title: "Molecules/SurveyIntro",
  component: SurveyIntro,
  tags: ["autodocs"],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <SurveyIntro {...args} />
  },
  args: {
    surveyFormDefinition: getTestingSurveyFormDefinition().definition,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSurveyStart: () => {},
  },
};

// const SurveyIntroStory = (props: SurveyIntroProps) => {  return (
//     <SurveyIntro
//       {...props}
//     />
//   );
// }
