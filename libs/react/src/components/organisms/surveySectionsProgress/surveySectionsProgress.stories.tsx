

import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { SurveySectionsProgress } from './surveySectionsProgress';
import { BaseButton } from '../../atoms/button/button';
import { getSurveySectionMock, getSurveySectionScrollableMock } from '../../../__mocks__/surveyMock';
import { SurveySectionType } from '../../../interfaces/survey/survey';

const meta = {
    title: "Organisms/SurveySectionsProgress",
    component: SurveySectionsProgress,
    tags: ["autodocs"],
    decorators: [withKnobs],
    argTypes: {},
} satisfies Meta<typeof SurveySectionsProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

const SurveySectionsStory = (args: {sections: SurveySectionType[], activeKey: string}) => {

    const [activeKey, setActiveKey] = React.useState(args.activeKey);

    return <SurveySectionsProgress {...args} setActiveKey={setActiveKey} activeKey={activeKey} />
}

export const Default: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        sections: getSurveySectionMock(),
        activeKey: "product",
    },
};


export const SectionCompleted: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        ...Default.args,
        activeKey: "facilities",
    }
}

export const SectionWithFollowUp: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        ...Default.args,
        activeKey: "facilities:0",
    }
}

export const SurveyComplete: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        ...Default.args,
        activeKey: "general:2",
    }
}

export const LastSection: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        ...Default.args,
        activeKey: "general",
    }
}

export const LargerThanScrollBar: Story = {
    render: (args) => <SurveySectionsStory {...args} />,
    args: {
        sections: getSurveySectionScrollableMock(),
        activeKey: "product1",
    }
}
