import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { JourneyOverviewCard } from './journeyOverviewCard';
import {BrowserRouter} from 'react-router-dom';

const meta = {
    title: "Molecules/JourneyOverviewCard",
    component: JourneyOverviewCard,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof JourneyOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <BrowserRouter>
                <div className="w-[668px]">
                    <JourneyOverviewCard />
                </div>
            </BrowserRouter>
        );
    },
};
