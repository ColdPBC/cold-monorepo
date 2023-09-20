import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryJourneyPreview } from './subcategoryJourneyPreview';
import { getCategoriesHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SubcategoryJourneyPreview> = {
  title: 'Molecules/SubcategoryJourneyPreview',
  component: SubcategoryJourneyPreview,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <SubcategoryJourneyPreview subcategory_key='facilities' category_key='company_decarbonization' />
      </StoryMockProvider>
    );
  },
};

export const Seeker: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <SubcategoryJourneyPreview subcategory_key='travel' category_key='company_decarbonization' />
      </StoryMockProvider>
    );
  },
};

export const Adventurer: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <SubcategoryJourneyPreview subcategory_key='product' category_key='company_decarbonization' />
      </StoryMockProvider>
    );
  },
};

export const Trailblazer: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <SubcategoryJourneyPreview
          subcategory_key="employee_footprint"
          category_key="employee_engagement"
        />
      </StoryMockProvider>
    );
  },
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.handle404]}>
      <SubcategoryJourneyPreview
        subcategory_key="employee_footprint"
        category_key="employee_engagement"
      />
    </StoryMockProvider>
  );
};
