import React, { useState } from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { StoryObj } from "@storybook/react";
import {SurveyInput, SurveyInputProps} from '@coldpbc/components';

const meta = {
    title: "Molecules/SurveyInput",
    component: SurveyInput,
    tags: ["autodocs"],
    decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args: {
        "input_key": "general:1",
        "prompt": "What is your company's name?",
        "options": [],
        "tooltip": "Enter your company name",
        "component": "text",
        "placeholder": "Yourco",
        "value": null
    },
};

export const MultiSelect: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args: {
        "input_key": "general:0",
        "prompt": "Which regions do you sell your product into?",
        "options": [
            "North America United States",
            "South America, Central America, Mexico",
            "Europe",
            "Asia",
            "Australia",
            "Africa"
        ],
        "tooltip": "Select correct regions",
        "component": "multi_select",
        "placeholder": "",
        "value": null
    },
};

export const Select: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args: {
        "input_key": "general:2",
        "prompt": "What is your favorite color of the primary colors?",
        "options": [
            "Limited (0-5% Year-over-Year)",
            "Blue",
            "Yellow"
        ],
        "tooltip": "Pick the one you like the most",
        "component": "select",
        "placeholder": "",
        "value": null
    },
};

export const Currency: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args:{
        "input_key": "product:1",
        "prompt": "How much does your product cost, in dollars?",
        "options": [],
        "tooltip": "Enter the cost to your company to produce",
        "component": "currency",
        "placeholder": "45",
        "value": null
    }
};

export const PercentSlider: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args:{
        "input_key": "product:2",
        "prompt": "What percent of your product is leather?",
        "options": [],
        "tooltip": "Select the estimated percentage",
        "component": "percent_slider",
        "placeholder": "",
        "value": null
    }
};

export const Number: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args:{
        "input_key": "product:3",
        "prompt": "How many factories make your product?",
        "options": [],
        "tooltip": "Choose the number across all countries",
        "component": "number",
        "placeholder": "2",
        "value": null
    }
};

export const YesNo: Story = {
    render: (args) => {
        return <SurveyInputStory {...args} />
    },
    args:{
        "input_key": "product:0",
        "prompt": "Is your product made of metal?",
        "options": [],
        "tooltip": "Select yes or no",
        "component": "yes_no",
        "placeholder": "",
        "value": null
    }
};

const SurveyInputStory = (props: SurveyInputProps) => {
    const {
        input_key,
        prompt,
        options,
        tooltip,
        component,
        placeholder,
        value,
    } = props;
    const [stateValue, setStateValue] = useState<any>(value);
    return (
        <SurveyInput
            {...props}
            onFieldUpdated={(name, value) => {
                setStateValue(value);
            }}
            value={stateValue}
        />
    );
}
