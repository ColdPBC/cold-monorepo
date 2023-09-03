import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { FootprintOverviewCard } from './footprintOverviewCard';
import {BrowserRouter} from 'react-router-dom';

const meta = {
    title: "Molecules/FootprintOverviewCard",
    component: FootprintOverviewCard,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof FootprintOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <BrowserRouter>
                <div className="w-[668px]">
                    <FootprintOverviewCard />
                </div>
            </BrowserRouter>
        );
    },
};
