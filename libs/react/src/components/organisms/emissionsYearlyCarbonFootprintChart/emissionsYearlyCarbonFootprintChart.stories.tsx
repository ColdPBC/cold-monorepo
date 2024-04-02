import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsYearlyCarbonFootprintChart } from '@coldpbc/components';
import { getDefaultEmissionMock } from '@coldpbc/mocks';
import { ColdEmissionsContext } from '@coldpbc/context';

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
    return (
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
        }}>
        <EmissionsYearlyCarbonFootprintChart />;
      </ColdEmissionsContext.Provider>
    );
  },
};
