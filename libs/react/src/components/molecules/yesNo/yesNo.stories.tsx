import React from "react";
import { SideBar } from '@coldpbc/components';
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {BrowserRouter} from 'react-router-dom';
import {YesNo} from '@coldpbc/components';

const meta = {
    title: "Molecules/YesNo",
    component: YesNo,
    tags: ["autodocs"],
    decorators: [withKnobs]
} satisfies Meta<typeof YesNo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = React.useState(args.value);

        const onChange = (value: any) => {
            setValue(value)
        }

        return (
            <YesNo value={value} onChange={onChange}/>
        )
    },
    args: {
        value: null,
    },
};
