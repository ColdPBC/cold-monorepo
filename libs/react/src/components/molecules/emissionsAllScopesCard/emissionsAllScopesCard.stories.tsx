import { ColdEmissionsContext } from '@coldpbc/context';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { getDefaultEmissionMock } from '@coldpbc/mocks';
import { EmissionsAllScopesCard } from '@coldpbc/components';

const meta: Meta<typeof EmissionsAllScopesCard> = {
  title: 'Molecules/EmissionsAllScopesCard',
  component: EmissionsAllScopesCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <ColdEmissionsContext.Provider
      value={{
        data: {
          emissions: getDefaultEmissionMock(),
          uniqueScopes: [1, 2, 3],
          yearOptions: [
            {
              id: 0,
              name: 'All Year',
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
          name: 'All Year',
          value: 'all',
        },
        setSelectedFacility: option => {},
      }}>
      <EmissionsAllScopesCard />;
    </ColdEmissionsContext.Provider>
  );
};
