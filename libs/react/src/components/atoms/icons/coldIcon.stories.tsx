/* eslint-disable @nx/enforce-module-boundaries */
import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import { DefaultHexColors } from '@coldpbc/components';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/components';

const meta = {
    title: "Atoms/Icons/ColdIcon",
    component: ColdIcon,
    tags: ["autodocs"],
    decorators: [withKnobs],
    argTypes: {
        name: {
            control: "select",
            options: IconNames,
        },
        color: {
            control: "select",
            options: DefaultHexColors
        }
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: IconNames.ColdSettingsIcon
    },
};
