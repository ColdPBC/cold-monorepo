import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryJourneyPreview } from './subcategoryJourneyPreview';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SubcategoryJourneyPreview> = {
	title: 'Molecules/SubcategoryJourneyPreview',
	component: SubcategoryJourneyPreview,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={[]}>
				<SubcategoryJourneyPreview section_type={'Products'} score={85} />
			</StoryMockProvider>
		);
	},
};
