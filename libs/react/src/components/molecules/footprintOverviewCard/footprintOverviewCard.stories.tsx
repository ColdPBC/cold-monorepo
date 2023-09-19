import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {FootprintOverviewCard} from './footprintOverviewCard';
import { FootprintOverviewVariants } from "../footprintOverviewChart/footprintOverviewChart";
import { StoryMockProvider, getFootprintHandler } from '../../../';

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
            <StoryMockProvider handlers={[]}>
                <div className="w-[668px]">
                    <FootprintOverviewCard />
                </div>
            </StoryMockProvider>
        );
    },
};

export const Headerless: Story = {
    render: (args) => {
        return (
            <StoryMockProvider handlers={[]}>
                <div className="w-[668px]">
                    <FootprintOverviewCard headerless />
                </div>
            </StoryMockProvider>
        );
    },
};

export const Vertical: Story = {
    render: (args) => {
        return (
            <StoryMockProvider handlers={[]}>
                <div className="w-[437px]">
                    <FootprintOverviewCard chartVariant={FootprintOverviewVariants.vertical} />
                </div>
            </StoryMockProvider>
        );
    },
};

export const EmptyData = () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.empty]}>
            <div className="w-[668px]">
                <FootprintOverviewCard />
            </div>
      </StoryMockProvider>
    )
}
