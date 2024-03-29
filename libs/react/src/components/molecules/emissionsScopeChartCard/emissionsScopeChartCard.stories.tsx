import { ColdEmissionsContext } from '@coldpbc/context';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmissionsScopeChartCard } from '@coldpbc/components';
import { getDefaultEmissionMock } from '@coldpbc/mocks';

const meta: Meta<typeof EmissionsScopeChartCard> = {
  title: 'Molecules/EmissionsScopeChartCard',
  component: EmissionsScopeChartCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <ColdEmissionsContext.Provider
      value={{
        data: getDefaultEmissionMock(),
        selectedFacility: 'all',
        selectedYear: 2020,
      }}>
      <EmissionsScopeChartCard scope_category={1} />;
    </ColdEmissionsContext.Provider>
  );
};
