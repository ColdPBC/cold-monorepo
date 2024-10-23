import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TemperatureCheckCard } from './temperatureCheckCard';
import { StoryMockProvider, getFootprintHandler, RightColumnContent } from '../../../';

const meta: Meta<typeof TemperatureCheckCard> = {
	title: 'Molecules/TemperatureCheckCard',
	component: TemperatureCheckCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<RightColumnContent>
					<TemperatureCheckCard cardTitle="Temperature Check" stats={['cold_score', 'footprint', 'emissions_avoided', 'actions_completed']} />
				</RightColumnContent>
			</StoryMockProvider>
		);
	},
};

export const TwoStats: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<RightColumnContent>
					<TemperatureCheckCard cardTitle="Temperature Check" stats={['cold_score', 'footprint']} />
				</RightColumnContent>
			</StoryMockProvider>
		);
	},
};

export const ThreeStats: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<RightColumnContent>
					<TemperatureCheckCard cardTitle="Temperature Check" stats={['cold_score', 'footprint', 'emissions_avoided']} />
				</RightColumnContent>
			</StoryMockProvider>
		);
	},
};
