import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { EmissionsCarbonFootprintCharts } from '@coldpbc/components';
import { getDefaultEmissionMock } from '@coldpbc/mocks';

const meta: Meta<typeof EmissionsCarbonFootprintCharts> = {
  title: 'Organisms/CarbonFootprintCharts',
  component: EmissionsCarbonFootprintCharts,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    emissionPayload: getDefaultEmissionMock(),
  },
};
