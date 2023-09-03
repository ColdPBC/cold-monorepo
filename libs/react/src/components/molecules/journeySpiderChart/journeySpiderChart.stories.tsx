import {withKnobs} from '@storybook/addon-knobs';
import {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {JourneySpiderChart} from '@coldpbc/components';


const meta = {
    title: "Molecules/JourneySpiderChart",
    component: JourneySpiderChart,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof JourneySpiderChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <JourneySpiderChart />
        );
    },
};
