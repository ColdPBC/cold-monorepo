import { StoryMockProvider, getFootprintHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { FootprintOverviewChart } from '../../molecules';
import { Footprint } from './footprint';

const meta = {
  title: 'Pages/Footprint',
  component: Footprint,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof Footprint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.default]}>
      <Footprint />
    </StoryMockProvider>
  );
};


export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.empty]}>
      <Footprint />
    </StoryMockProvider>
  );
};
