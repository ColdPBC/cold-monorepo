import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { FootprintOverviewCard } from './footprintOverviewCard';
import { BrowserRouter } from 'react-router-dom';
import { FootprintOverviewVariants } from '../footprintOverviewChart/footprintOverviewChart';
import { getFootprintHandler, StoryMockProvider } from '../../../';

const meta = {
  title: 'Molecules/FootprintOverviewCard',
  component: FootprintOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof FootprintOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <FootprintOverviewCard />
        </div>
      </BrowserRouter>
    );
  },
};

export const Headerless: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <FootprintOverviewCard headerless />
        </div>
      </BrowserRouter>
    );
  },
};

export const Vertical: Story = {
  render: (args) => {
    return (
      <BrowserRouter>
        <div className="w-[668px]">
          <FootprintOverviewCard
            chartVariant={FootprintOverviewVariants.vertical}
          />
        </div>
      </BrowserRouter>
    );
  },
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.empty]}>
      <BrowserRouter>
        <div className="w-[668px]">
          <FootprintOverviewCard />
        </div>
      </BrowserRouter>
    </StoryMockProvider>
  );
};
