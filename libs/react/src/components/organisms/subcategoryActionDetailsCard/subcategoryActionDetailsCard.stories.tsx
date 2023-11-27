import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import {
  getActionHandler,
  getActionMock,
  getActionsMockBySubCategoryName,
  getOrganizationMembersMock,
  StoryMockProvider,
} from '@coldpbc/mocks';
import {
  SubcategoryActionDetailsCard,
  SubcategoryActionDetailsCardProps,
} from './subcategoryActionDetailsCard';
import { getCustomHasher } from 'nx/src/tasks-runner/utils';

const meta = {
  title: 'Organisms/SubcategoryActionDetailsCard',
  component: SubcategoryActionDetailsCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {
    variant: {
      control: 'select',
      options: SubcategoryActionDetailsCard,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SurveysNotComplete: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        handlers={getActionHandler.subcategoryActionDetailsCard}
      >
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            ...getActionMock().action.dependent_surveys[0],
            submitted: true,
          },
          {
            ...getActionMock().action.dependent_surveys[1],
            submitted: false,
          },
        ],
      },
    },
  },
};

export const NotReadyToExecute: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        handlers={getActionHandler.subcategoryActionDetailsCard}
      >
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            ...getActionMock().action.dependent_surveys[0],
            submitted: true,
          },
          {
            ...getActionMock().action.dependent_surveys[1],
            submitted: true,
          },
        ],
        ready_to_execute: false,
      },
    },
  },
};

export const ReadyToExecute: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        handlers={getActionHandler.subcategoryActionDetailsCard}
      >
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            ...getActionMock().action.dependent_surveys[0],
            submitted: true,
          },
          {
            ...getActionMock().action.dependent_surveys[1],
            submitted: true,
          },
        ],
        ready_to_execute: true,
      },
    },
  },
};
