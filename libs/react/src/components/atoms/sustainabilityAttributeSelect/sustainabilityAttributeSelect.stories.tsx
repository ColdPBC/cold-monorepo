import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityAttributeSelect } from '@coldpbc/components';
import { getClaimsMock } from '@coldpbc/mocks';
import React from 'react';

const meta: Meta<typeof SustainabilityAttributeSelect> = {
  title: 'Atoms/SustainabilityAttributeSelect',
  component: SustainabilityAttributeSelect,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SelectWrapper = () => {
  const [selectedValueId, setSelectedValueId] = React.useState<string | null>(null);

  return (
    <SustainabilityAttributeSelect
      sustainabilityAttributes={getClaimsMock()}
      selectedValueId={selectedValueId}
      setSelectedValueId={setSelectedValueId}
    />
  );
};

export const Default: Story = {
  render: () => <SelectWrapper />
};
