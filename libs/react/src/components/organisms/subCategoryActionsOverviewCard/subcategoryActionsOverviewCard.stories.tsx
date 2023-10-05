import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getActionsMockBySubCategoryName } from '@coldpbc/mocks';
import { SubcategoryActionsOverviewCard } from '@coldpbc/components';

const meta = {
  title: 'Organisms/SubCategoryActionsOverviewCard',
  component: SubcategoryActionsOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
} satisfies Meta<typeof SubcategoryActionsOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: getActionsMockBySubCategoryName('facilities'),
    category: 'Facilities',
  },
};
