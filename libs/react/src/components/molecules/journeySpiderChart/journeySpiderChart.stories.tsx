import {getAssessmentsHandler, StoryMockProvider} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react';
import React from 'react';
import { JourneySpiderChart } from './journeySpiderChart';
import {ColdAssessmentsProvider} from "@coldpbc/providers";

const meta: Meta<typeof JourneySpiderChart> = {
  title: 'Molecules/JourneySpiderChart',
  component: JourneySpiderChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;

export const Default = () => {
  return (
    <StoryMockProvider handlers={getAssessmentsHandler.default}>
      <ColdAssessmentsProvider>
        <JourneySpiderChart />
      </ColdAssessmentsProvider>
    </StoryMockProvider>
  );
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={getAssessmentsHandler.empty}>
      <ColdAssessmentsProvider>
        <JourneySpiderChart />
      </ColdAssessmentsProvider>
    </StoryMockProvider>
  );
};
