import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsYearlyCarbonFootprintChart } from '@coldpbc/components';
import { getDefaultEmissionMock } from '@coldpbc/mocks';

const meta = {
  title: 'Organisms/EmissionsYearlyCarbonFootprintChart',
  component: EmissionsYearlyCarbonFootprintChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof EmissionsYearlyCarbonFootprintChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    emissionFacilities: getDefaultEmissionMock().definition,
  },
};
