import React from "react";
import { BaseButton } from '../button/button';
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { Toaster } from './toaster';
import {mutate} from 'swr';
import { ToastMessageTypes } from '../../../interfaces/toastMessage';

const meta = {
    title: "Atoms/Toaster",
    component: Toaster,
    tags: ["autodocs"],
    decorators: [withKnobs],
    argTypes: {
        type: {
            control: "select",
            options: ToastMessageTypes
        }
    }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return(
            <div className={"relative w-full h-screen"}>
                <Toaster {...args}/>
            </div>
        )
    },
    args: {
        message: "New toaster message"
    }
};

