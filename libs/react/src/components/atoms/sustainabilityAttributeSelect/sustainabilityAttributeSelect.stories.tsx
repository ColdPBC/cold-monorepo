import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityAttributeSelect } from '@coldpbc/components';
import { getClaimsMock } from '@coldpbc/mocks';
import React from 'react';
import { EntityLevel } from '@coldpbc/enums';

const meta: Meta<typeof SustainabilityAttributeSelect> = {
  title: 'Atoms/SustainabilityAttributeSelect',
  component: SustainabilityAttributeSelect,
  tags: ['autodocs'],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SelectWrapper = () => {
  const [selectedValue, setSelectedValue] = React.useState<{ id: string, level: EntityLevel } | null>(null);

  return (
    <SustainabilityAttributeSelect
      sustainabilityAttributes={getClaimsMock()}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  );
};

export const Default: Story = {
  render: () => <SelectWrapper />
};
