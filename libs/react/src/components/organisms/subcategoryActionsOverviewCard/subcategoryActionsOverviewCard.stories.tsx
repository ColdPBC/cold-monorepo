import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryActionsOverviewCard, SubcategoryActionsOverviewCardProps } from './subcategoryActionsOverviewCard';
import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SubcategoryActionsOverviewCard> = {
	title: 'Organisms/SubcategoryActionsOverviewCard',
	component: SubcategoryActionsOverviewCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SubcategoryActionsOverviewCardTemplate = (args: SubcategoryActionsOverviewCardProps) => (
	<StoryMockProvider handlers={getActionHandler.subcategoryActionsOverviewCard}>
		<SubcategoryActionsOverviewCard {...args} />
	</StoryMockProvider>
);

export const Default: Story = {
	render: SubcategoryActionsOverviewCardTemplate,
	args: {
		subcategory_key: 'facilities',
		category_key: 'company_decarbonization',
	},
};
