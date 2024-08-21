import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getSurveyHandler, StoryMockProvider } from '@coldpbc/mocks';
import { NextSteps } from './nextSteps';

const meta = {
  title: 'Organisms/NextSteps',
  component: NextSteps,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof NextSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getSurveyHandler.nextSteps}>
        <NextSteps />
      </StoryMockProvider>
    );
  },
};
