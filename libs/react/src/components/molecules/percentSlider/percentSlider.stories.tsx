import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { PercentSlider } from './percentSlider';

const meta = {
    title: "Molecules/PercentSlider",
    component: PercentSlider,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof PercentSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = React.useState<number | null>(args.value);

        const onChange = (value: number | null) => {
            setValue(value);
        }

        return (
            <PercentSlider {...args} onChange={onChange} value={value} />
        );
    },
    args: {
        value: 50,
        tooltip: "Select estimated percentage",
    }
};
