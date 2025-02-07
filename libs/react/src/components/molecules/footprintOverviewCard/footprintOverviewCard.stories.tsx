import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { EmissionsDonutChartVariants, FootprintOverviewCard } from '@coldpbc/components';

const meta: Meta<typeof FootprintOverviewCard> = {
  title: 'Molecules/FootprintOverviewCard',
  component: FootprintOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
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
  render: args => {
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
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <div className="w-[437px]">
          <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.vertical} />
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
  );
};
