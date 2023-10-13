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

// const SubcategoryActionsOverviewCardTemplate = (
//   args: SubcategoryActionDetailsCardProps,
// ) => (
//   <StoryMockProvider handlers={[getActionHandler.default]}>
//     <SubcategoryActionDetailsCard {...args} />
//   </StoryMockProvider>
// );

export const SurveysNotComplete: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[getActionHandler.surveysNotComplete]}>
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionId: '1',
    actionPayload: {
      ...getActionMock(),
      action: {
        ...getActionMock().action,
        dependent_surveys: [
          {
            ...getActionMock().action.dependent_surveys[0],
            completed: true,
          },
          {
            ...getActionMock().action.dependent_surveys[1],
            completed: false,
          },
        ],
      },
    },
    assignees: getOrganizationMembersMock().members,
  },
};

export const NotReadyToExecute: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[getActionHandler.notReadyToExecute]}>
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionId: '1',
    assignees: getOrganizationMembersMock().members,
  },
};

export const ReadyToExecute: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[getActionHandler.readyToExecute]}>
        <SubcategoryActionDetailsCard {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    actionId: '1',
    assignees: getOrganizationMembersMock().members,
  },
};
