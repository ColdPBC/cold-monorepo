import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getSurveyHandler, StoryMockProvider } from "@coldpbc/mocks";
import { NextSteps } from "./nextSteps";
import { expect, within } from "@storybook/test";
import { forEach } from "lodash";

const meta = {
  title: 'Organisms/NextSteps',
  component: NextSteps,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof NextSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={getSurveyHandler.nextSteps}>
        <NextSteps />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('NextSteps', async () => {
      await canvas.findByTestId('next-steps-card');
      const nextStepCards = await canvas.findAllByTestId('next-step-card');
      await expect(nextStepCards.length).toEqual(3);
      await canvas.findByText('Next Steps');
      forEach(nextStepCards, async (nextStepCard) => {
        const button = await within(nextStepCard).findByRole('button');
        await button.click();
        const progressBar = await within(nextStepCard).queryByTestId('next-step-card-progress');
        if (progressBar) {
          await within(nextStepCard).findByText('Continue Survey');
        } else {
          await within(nextStepCard).findByText('Start Survey');
        }
      });
    });
  },
};

