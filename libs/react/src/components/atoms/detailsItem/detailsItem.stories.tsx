import { Meta, StoryObj } from "@storybook/react";

import { DetailsItem } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import React from 'react';

const meta: Meta<typeof DetailsItem> = {
  title: "Atoms/DetailsItem",
  component: DetailsItem,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: 'Name',
    value: 'Men’s Helium Rain Jacket',
  }
};

export const Description: Story = {
  args: {
    category: 'Description',
    value: 'The Helium Rain Jacket is an ultra-packable, lightweight, breathable, multi-use award winner, offering durable weather protection when the forecast calls for on-and-off-again sun, showers, clouds, and cool breezes.',
  },
  render: args => {
    return (
      <StoryMockProvider>
        <div className="w-[308px] p-6">
          <DetailsItem {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};

export const NoValue: Story = {
  args: {
    category: 'Brand Product ID',
    value: null,
  }
};
