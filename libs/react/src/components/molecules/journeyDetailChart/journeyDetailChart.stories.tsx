import { getCategoriesHandler, StoryMockProvider } from '@coldpbc/mocks';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { JourneyDetailChart } from './journeyDetailChart';

const meta = {
  title: 'Molecules/JourneyDetailChart',
  component: JourneyDetailChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof JourneyDetailChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <JourneyDetailChart colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key='facilities' />;
  },
};

export const GreenProduct: Story = {
  render: (args) => {
    return <JourneyDetailChart colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key='product' />;
  },
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.empty]}>
      <JourneyDetailChart colors={getSchemeForColor(HexColors.lightblue)} />
    </StoryMockProvider>
  );
};
