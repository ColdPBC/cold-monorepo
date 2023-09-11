import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { JourneyOverviewCard } from './journeyOverviewCard';
import {BrowserRouter} from 'react-router-dom';
import { StoryMockProvider, getFootprintHandler, getCategoriesHandler } from "@coldpbc/mocks";
import { render } from "react-dom";
import { FootprintOverviewChart } from "../footprintOverviewChart";

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

export const EmptyData = () => {
    return (
            <BrowserRouter>
                <StoryMockProvider handlers={[getCategoriesHandler.empty]}>
                    <div className="w-[668px]">
                        <JourneyOverviewCard />
                    </div>
                </StoryMockProvider>
            </BrowserRouter>
    )
}