import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmissionsFactorDetailedExpandedView } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof EmissionsFactorDetailedExpandedView> = {
  title: 'Molecules/EmissionsFactorDetailedExpandedView',
  component: EmissionsFactorDetailedExpandedView,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEmissions: Story = {
  args: {
    emissionsFactor: {
      name: 'Sheep Wool Insulation',
      description: 'The emissions factor for ethical wool insulation measures the greenhouse gas emissions produced throughout its lifecycle, including sheep farming, shearing, processing, and transportation. Ethical wool typically emphasizes sustainable grazing practices, animal welfare, and eco-friendly processing, which can help reduce its carbon footprint compared to conventional wool. The emissions factor serves as a critical metric for assessing the environmental impact of the fabric and guiding sustainable  choices.',
      emissions_factor: 3.2,
    },
    weight: 0.176,
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorDetailedExpandedView {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};

export const WithOutEmissions: Story = {
  args: {
    emissionsFactor: null,
    weight: 0.176,
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorDetailedExpandedView {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};

export const WithOutWeight: Story = {
  args: {
    emissionsFactor: {
      name: 'Sheep Wool Insulation',
      description: 'The emissions factor for ethical wool insulation measures the greenhouse gas emissions produced throughout its lifecycle, including sheep farming, shearing, processing, and transportation. Ethical wool typically emphasizes sustainable grazing practices, animal welfare, and eco-friendly processing, which can help reduce its carbon footprint compared to conventional wool. The emissions factor serves as a critical metric for assessing the environmental impact of the fabric and guiding sustainable  choices.',
      emissions_factor: 3.2,
    },
    weight: null,
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorDetailedExpandedView {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};
