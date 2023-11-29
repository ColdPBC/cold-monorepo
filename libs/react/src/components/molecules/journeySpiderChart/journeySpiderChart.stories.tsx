import { getCategoriesHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { JourneySpiderChart } from './journeySpiderChart';

const meta: Meta<typeof JourneySpiderChart> = {
  title: 'Molecules/JourneySpiderChart',
  component: JourneySpiderChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <JourneySpiderChart />;
  },
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.empty]}>
      <JourneySpiderChart />
    </StoryMockProvider>
  );
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.handle404]}>
      <JourneySpiderChart />
    </StoryMockProvider>
  );
};
