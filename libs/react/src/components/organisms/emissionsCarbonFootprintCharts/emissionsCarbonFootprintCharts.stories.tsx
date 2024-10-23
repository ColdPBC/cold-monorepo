import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsCarbonFootprintCharts } from '@coldpbc/components';
import { getDefaultEmissionMock, StoryMockProvider } from '@coldpbc/mocks';
import { ColdEmissionsContext } from '@coldpbc/context';

const meta: Meta<typeof EmissionsCarbonFootprintCharts> = {
	title: 'Organisms/EmissionsCarbonFootprintCharts',
	component: EmissionsCarbonFootprintCharts,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
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
						setSelectedYear: option => {},
						selectedYear: {
							id: 0,
							name: 'All Years',
							value: 'all',
						},
						setSelectedFacility: option => {},
						isSingleYear: false,
					}}>
					<EmissionsCarbonFootprintCharts />;
				</ColdEmissionsContext.Provider>
			</StoryMockProvider>
		);
	},
};
