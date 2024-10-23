import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { EmissionsDonutChartVariants, SubcategoryFootprintCard } from '@coldpbc/components';

const meta: Meta<typeof SubcategoryFootprintCard> = {
	title: 'Molecules/SubcategoryFootprintCard',
	component: SubcategoryFootprintCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={[]}>
				<SubcategoryFootprintCard subcategory_key="facilities" period={2022} variant={EmissionsDonutChartVariants.vertical} />
			</StoryMockProvider>
		);
	},
};

export const Product: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={[]}>
				<SubcategoryFootprintCard subcategory_key="product" period={2022} variant={EmissionsDonutChartVariants.vertical} />
			</StoryMockProvider>
		);
	},
};
