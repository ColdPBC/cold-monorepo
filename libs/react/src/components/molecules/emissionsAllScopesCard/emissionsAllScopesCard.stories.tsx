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
        data: getDefaultEmissionMock(),
        selectedFacility: 'all',
        selectedYear: 2020,
      }}>
      <EmissionsAllScopesCard />;
    </ColdEmissionsContext.Provider>
  );
};
