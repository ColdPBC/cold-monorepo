import {withKnobs} from '@storybook/addon-knobs';
import {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {FootprintOverviewChart} from './footprintOverviewChart';

const meta = {
  title: "Molecules/FootprintOverviewChart",
  component: FootprintOverviewChart,
  tags: ["autodocs"],
  decorators: [withKnobs],
} satisfies Meta<typeof FootprintOverviewChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    period: 2022,
  }
};
