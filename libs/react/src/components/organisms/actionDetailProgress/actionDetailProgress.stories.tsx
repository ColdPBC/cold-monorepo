import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {
  getActionMock,
  getOrganizationMembersMock,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { Action, ActionPayload, Assignee, Step } from '@coldpbc/interfaces';
import { StepDetailsVariants } from '@coldpbc/enums';
import {
  ActionDetailProgress,
  ActionDetailProgressProps,
} from '@coldpbc/components';

const meta = {
  title: 'Organisms/ActionDetailProgress',
  component: ActionDetailProgress,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof ActionDetailProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

const ActionDetailProgressComponent = (args: ActionDetailProgressProps) => {
  const [actionPayload, setActionPayload] = useState<ActionPayload>(
    args.actionPayload,
  );

  return (
    <StoryMockProvider handlers={[]}>
      <ActionDetailProgress
        {...args}
        actionPayload={actionPayload}
        setActionPayload={setActionPayload}
      />
    </StoryMockProvider>
  );
};

export const NeedSurveys: Story = {
  render: (args) => {
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
    assignees: getOrganizationMembersMock().members,
  },
};

export const NotReady: Story = {
  render: (args) => {
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
    assignees: getOrganizationMembersMock().members,
  },
};

export const ReadyToExecute: Story = {
  render: (args) => {
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
    assignees: getOrganizationMembersMock().members,
  },
};
