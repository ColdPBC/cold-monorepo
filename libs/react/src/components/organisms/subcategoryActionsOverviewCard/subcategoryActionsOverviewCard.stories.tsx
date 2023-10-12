import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import {
  SubcategoryActionsOverviewCard,
  SubcategoryActionsOverviewCardProps,
} from './subcategoryActionsOverviewCard';
import {
  getActionsMockBySubCategoryName,
  StoryMockProvider,
} from '@coldpbc/mocks';

const meta = {
  title: 'Organisms/SubcategoryActionsOverviewCard',
  component: SubcategoryActionsOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {
    variant: {
      control: 'select',
      options: SubcategoryActionsOverviewCard,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SubcategoryActionsOverviewCardTemplate = (
  args: SubcategoryActionsOverviewCardProps,
) => (
  <StoryMockProvider handlers={[]}>
    <SubcategoryActionsOverviewCard {...args} />
  </StoryMockProvider>
);

export const Default: Story = {
  render: SubcategoryActionsOverviewCardTemplate,
  args: {
    actionPayloads: getActionsMockBySubCategoryName('facilities'),
    category: 'Facilities',
  },
};
