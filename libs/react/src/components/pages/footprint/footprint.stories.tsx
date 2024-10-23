import { getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Footprint } from './footprint';

const meta: Meta<typeof Footprint> = {
	title: 'Pages/Footprint',
	component: Footprint,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => (
		<StoryMockProvider {...args} handlers={[getFootprintHandler.default]}>
			<Footprint />
		</StoryMockProvider>
	),
};

export const EmptyData: Story = {
	render: args => (
		<StoryMockProvider {...args} handlers={[getFootprintHandler.empty]}>
			<Footprint />
		</StoryMockProvider>
	),
};

export const ThreeFootprintSubcats: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.threeSubCats]}>
				<Footprint />
			</StoryMockProvider>
		);
	},
};

export const TwoFootprintSubcats: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.twoSubCats]}>
				<Footprint />
			</StoryMockProvider>
		);
	},
};

export const AllNullFootprintValues: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[getFootprintHandler.allNullFootprintValues]}>
				<Footprint />
			</StoryMockProvider>
		);
	},
};
