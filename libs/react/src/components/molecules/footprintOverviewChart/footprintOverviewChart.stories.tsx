import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getFootprintHandler, StoryMockProvider } from '../../../';
import { EmissionsDonutChartVariants, FootprintOverviewChart } from '@coldpbc/components';

const meta: Meta<typeof FootprintOverviewChart> = {
	title: 'Molecules/FootprintOverviewChart',
	component: FootprintOverviewChart,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		period: 2022,
	},
};

export const Vertical: Story = {
	args: {
		period: 2022,
		variant: EmissionsDonutChartVariants.vertical,
	},
};

export const TwoSubCats = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.twoSubCats]}>
			<FootprintOverviewChart period={2022} />
		</StoryMockProvider>
	);
};

export const ThreeSubCats = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.threeSubCats]}>
			<FootprintOverviewChart period={2022} />
		</StoryMockProvider>
	);
};

export const FiveSubCats = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.fiveSubCats]}>
			<FootprintOverviewChart period={2022} />
		</StoryMockProvider>
	);
};

export const EmptyData = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.empty]}>
			<FootprintOverviewChart period={2022} />
		</StoryMockProvider>
	);
};

export const Handle404 = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.handle404]}>
			<FootprintOverviewChart period={2022} />
		</StoryMockProvider>
	);
};
