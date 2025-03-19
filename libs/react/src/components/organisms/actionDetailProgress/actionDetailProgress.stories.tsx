import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getActionMock, getOrganizationMembersMock, StoryMockProvider } from '@coldpbc/mocks';
import { Action, ActionPayload, Assignee, Step } from '@coldpbc/interfaces';
import { StepDetailsVariants } from '@coldpbc/enums';
import { ActionDetailProgress, ActionDetailProgressProps, SurveySectionsProgress } from '@coldpbc/components';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof ActionDetailProgress> = {
  title: 'Organisms/ActionDetailProgress',
  component: ActionDetailProgress,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ActionDetailProgressComponent = (args: ActionDetailProgressProps) => {
  const [actionPayload, setActionPayload] = useState<ActionPayload>(args.actionPayload);

  return (
    <StoryMockProvider handlers={[]}>
      <ActionDetailProgress {...args} actionPayload={actionPayload} setActionPayload={setActionPayload} />
    </StoryMockProvider>
  );
};

export const NeedSurveys: Story = {
  render: args => {
    return <ActionDetailProgressComponent {...args} />;
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            title: 'Survey 1',
            name: 'survey_1',
            submitted: true,
          },
          {
            title: 'Survey 2',
            name: 'survey_2',
            submitted: false,
          },
        ],
      },
    },
  },
  play: async ({ canvasElement, args, step }) => {
    await step('Check Survey Buttons', async () => {
      const dependentSurveys = args.actionPayload.action.dependent_surveys;
      const canvas = within(canvasElement);
      dependentSurveys.forEach(survey => {
        const button = canvas.getByText(survey.title).closest('button');
        if (survey.submitted) {
          expect(button).toBeDisabled();
        } else {
          expect(button).toBeEnabled();
        }
      });
    });
  },
};

export const NotReady: Story = {
  render: args => {
    return <ActionDetailProgressComponent {...args} />;
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            title: 'Survey 1',
            name: 'survey_1',
            submitted: true,
          },
          {
            title: 'Survey 2',
            name: 'survey_2',
            submitted: true,
          },
        ],
        ready_to_execute: false,
      },
    },
  },
};

export const ReadyToExecute: Story = {
  render: args => {
    return <ActionDetailProgressComponent {...args} />;
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            title: 'Survey 1',
            name: 'survey_1',
            submitted: true,
          },
          {
            title: 'Survey 2',
            name: 'survey_2',
            submitted: true,
          },
        ],
        ready_to_execute: true,
      },
    },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    // find an element with Add Steward text
    // click on it
    await step('Click on Add Steward', async () => {
      const stewardButtonsInitial = canvas.getAllByText('Add Steward');

      await userEvent.click(stewardButtonsInitial[0]);
      const steward = await canvas.findByText('Qaalib Farah');
      await userEvent.click(steward);
      const stewardButtonsAfter = canvas.getAllByText('Add Steward');
      // make sure that it is less than before
      await expect(stewardButtonsAfter.length).toBeLessThan(stewardButtonsInitial.length);
    });

    // click complete button
    await step('Click on Complete', async () => {
      // check args for steps that have not been completed. record the index
      // get the svg element in closest to that step detail
      const steps = args.actionPayload.action.steps;
      const stepIndex = steps.findIndex(step => step.complete === null);
      const stepDetails = canvas.getAllByTestId(`step-detail`);
      const step = stepDetails[stepIndex];
      const checkbox = within(step).getByTestId('step-detail-empty-checkbox');
      const checkboxesInitial = canvas.getAllByTestId('step-detail-checkbox');
      await expect(checkbox).not.toBeNull();
      if (checkbox === null) return;
      await userEvent.click(checkbox);
      // get all the checkboxes that are checked and compare with initial
      const checkboxesAfter = canvas.getAllByTestId('step-detail-checkbox');
      // expect the length to be more than initial
      await expect(checkboxesAfter.length).toBeGreaterThan(checkboxesInitial.length);
      // check canvas for 'number of steps that are completed/total steps completed' text
      await canvas.getByText(`${checkboxesAfter.length}/${steps.length} Completed`);
    });

    // click on steward to remove
    await step('Click on steward to remove', async () => {
      const steward = await canvas.findByText('Qaalib Farah');
      await userEvent.click(steward);
      const stewardButtons = canvas.getAllByText('Add Steward');
      await expect(stewardButtons.length).toBeGreaterThan(0);
    });
  },
};
