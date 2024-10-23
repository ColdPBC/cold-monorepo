import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsYearlyCarbonFootprintChart } from '@coldpbc/components';
import { getDefaultEmissionMock, StoryMockProvider } from '@coldpbc/mocks';
import { ColdEmissionsContext } from '@coldpbc/context';
import { InputOption } from '@coldpbc/interfaces';

const meta = {
	title: 'Organisms/EmissionsYearlyCarbonFootprintChart',
	component: EmissionsYearlyCarbonFootprintChart,
	tags: ['autodocs'],
	decorators: [withKnobs],
} satisfies Meta<typeof EmissionsYearlyCarbonFootprintChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [selectedYear, setSelectedYear] = React.useState<InputOption>({
			id: 0,
			name: 'All Years',
			value: 'all',
		});

		return (
			<StoryMockProvider>
				<ColdEmissionsContext.Provider
					value={{
						data: {
							emissions: getDefaultEmissionMock(),
							uniqueScopes: [1, 2, 3],
							yearOptions: [
								{
									id: 0,
									name: 'All Years',
									value: 'all',
								},
								{
									id: 1,
									name: '2022',
									value: '2022',
								},
								{
									id: 2,
									name: '2023',
									value: '2023',
								},
							],
							facilityOptions: [
								{
									id: 0,
									name: 'All Facilities',
									value: 'all',
								},
							],
						},
						selectedFacility: {
							id: 0,
							name: 'All Facilities',
							value: 'all',
						},
						setSelectedYear: setSelectedYear,
						selectedYear: selectedYear,
						setSelectedFacility: option => {},
						isSingleYear: false,
					}}>
					<EmissionsYearlyCarbonFootprintChart />;
				</ColdEmissionsContext.Provider>
			</StoryMockProvider>
		);
	},
};

export const YearSelected: Story = {
	render: () => {
		const [selectedYear, setSelectedYear] = React.useState<InputOption>({
			id: 1,
			name: '2022',
			value: '2022',
		});

		return (
			<StoryMockProvider>
				<ColdEmissionsContext.Provider
					value={{
						data: {
							emissions: getDefaultEmissionMock(),
							uniqueScopes: [1, 2, 3],
							yearOptions: [
								{
									id: 0,
									name: 'All Years',
									value: 'all',
								},
								{
									id: 1,
									name: '2022',
									value: '2022',
								},
								{
									id: 2,
									name: '2023',
									value: '2023',
								},
							],
							facilityOptions: [
								{
									id: 0,
									name: 'All Facilities',
									value: 'all',
								},
							],
						},
						selectedFacility: {
							id: 0,
							name: 'All Facilities',
							value: 'all',
						},
						setSelectedYear: setSelectedYear,
						selectedYear: selectedYear,
						setSelectedFacility: option => {},
						isSingleYear: false,
					}}>
					<EmissionsYearlyCarbonFootprintChart />;
				</ColdEmissionsContext.Provider>
			</StoryMockProvider>
		);
	},
};
