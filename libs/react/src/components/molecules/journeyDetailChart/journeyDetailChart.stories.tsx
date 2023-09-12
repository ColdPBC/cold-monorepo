import { getCategoriesHandler, StoryMockProvider } from '@coldpbc/mocks';
import { HexColors } from '@coldpbc/themes';
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

const getColorsFromScheme = (scheme: {[key: string]: string}) => {
  return [
    scheme['100'],
    scheme['200'],
    scheme['300'],
    scheme['400'],
    scheme['500'],
    scheme['600'],
    scheme['700'],
    scheme['800'],
    scheme['900'],
    scheme['1000'],
  ]
}

export const Default: Story = {
  render: (args) => {
    return <JourneyDetailChart colors={getColorsFromScheme(HexColors.lightblue)} period={2022} subcategory_key='facilities' />;
  },
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.empty]}>
      <JourneyDetailChart colors={getColorsFromScheme(HexColors.lightblue)} />
    </StoryMockProvider>
  );
};
