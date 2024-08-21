import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getActionHandler, getActionMock, StoryMockProvider } from '@coldpbc/mocks';
import { SubcategoryActionDetailsCard } from './subcategoryActionDetailsCard';

const meta: Meta<typeof SubcategoryActionDetailsCard> = {
  title: 'Organisms/SubcategoryActionDetailsCard',
  component: SubcategoryActionDetailsCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SurveysNotComplete: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getActionHandler.subcategoryActionDetailsCard}>
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
  render: args => {
    return (
      <StoryMockProvider handlers={getActionHandler.subcategoryActionDetailsCard}>
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
  render: args => {
    return (
      <StoryMockProvider handlers={getActionHandler.subcategoryActionDetailsCard}>
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
