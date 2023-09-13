import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { JourneyDetailCard } from './journeyDetailCard';
import { BrowserRouter } from 'react-router-dom';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { render } from 'react-dom';

const meta = {
  title: 'Molecules/JourneyDetailCard',
  component: JourneyDetailCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof JourneyDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <JourneyDetailCard colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key='facilities' />
        </div>
      </BrowserRouter>
    );
  },
};

export const GreenProduct: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <JourneyDetailCard colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key='product' />
        </div>
      </BrowserRouter>
    );
  },
};

export const EmptySubcategory: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <JourneyDetailCard colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key='no_data_for_this_key' />
        </div>
      </BrowserRouter>
    );
  },
};

