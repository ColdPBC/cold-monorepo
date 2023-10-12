import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import {
  SubcategoryActionsOverviewCard,
  SubcategoryActionsOverviewCardProps,
} from './subcategoryActionsOverviewCard';
import {
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
    subcategory_key: 'facilities',
    category_key: 'company_decarbonization'
  },
};
