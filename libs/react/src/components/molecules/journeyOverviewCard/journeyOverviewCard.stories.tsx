import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { JourneyOverviewCard } from './journeyOverviewCard';
import { getAssessmentsHandler, StoryMockProvider} from '@coldpbc/mocks';
import { ColdAssessmentsProvider } from "@coldpbc/providers";

const meta: Meta<typeof JourneyOverviewCard> = {
  title: 'Molecules/JourneyOverviewCard',
  component: JourneyOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.default}>
        <ColdAssessmentsProvider>
          <div className="w-[668px]">
            <JourneyOverviewCard />
          </div>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};

export const SingleCompliance: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.single}>
        <ColdAssessmentsProvider>
          <div className="w-[668px]">
            <JourneyOverviewCard />
          </div>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={getAssessmentsHandler.empty}>
      <ColdAssessmentsProvider>
        <div className="w-[668px]">
          <JourneyOverviewCard />
        </div>
      </ColdAssessmentsProvider>
    </StoryMockProvider>
  );
};
