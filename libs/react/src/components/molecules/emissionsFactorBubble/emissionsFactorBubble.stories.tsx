import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmissionsFactorBubble } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof EmissionsFactorBubble> = {
  title: 'Molecules/EmissionsFactorBubble',
  component: EmissionsFactorBubble,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    emissionFactor: {
      name: 'Sheep Wool Insulation',
      emissionsFactor: 3.2,
      id: '1',
      description: 'This is a long description that should wrap and show ellipsis if it is too long to fit in the bubble.',
    },
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorBubble {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};

export const WithoutEmissions: Story = {
  args: {
    emissionFactor: null,
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorBubble {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};


export const WithLongName: Story = {
  args: {
    emissionFactor: {
      name: 'Antimicrobial Nylon Thread',
      emissionsFactor: 3.2,
      id: '1',
      description: 'This is a long description that should wrap and show ellipsis if it is too long to fit in the bubble.',
    },
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <div className={'w-[1000px]'}>
          <EmissionsFactorBubble {...args} />
        </div>
      </StoryMockProvider>
    );
  },
};
