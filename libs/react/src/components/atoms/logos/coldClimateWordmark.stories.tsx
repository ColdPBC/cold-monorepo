import React from "react";
import { ColdClimateWordmark } from '@coldpbc/components';
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {HexColors} from '@coldpbc/components';

const meta = {
  title: "Atoms/Logos/ColdClimateWordmark",
  component: ColdClimateWordmark,
  tags: ["autodocs"],
  decorators: [withKnobs],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: HexColors.white,
  },
};
