import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {Home} from '@coldpbc/components';

const meta = {
    title: "Pages/Home",
    component: Home,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};
