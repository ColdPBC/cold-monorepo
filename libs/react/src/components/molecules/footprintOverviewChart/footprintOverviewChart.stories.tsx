import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {
  FootprintOverviewChart,
  FootprintOverviewVariants,
} from './footprintOverviewChart';
import { getFootprintHandler, StoryMockProvider } from '../../../';

const meta = {
  title: 'Molecules/FootprintOverviewChart',
  component: FootprintOverviewChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof FootprintOverviewChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    period: 2022,
  },
};

export const Vertical: Story = {
  args: {
    period: 2022,
    variant: FootprintOverviewVariants.vertical,
  },
};

export const TwoSubCats = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.twoSubCats]}>
      <FootprintOverviewChart period={2022} />
    </StoryMockProvider>
  );
};

export const ThreeSubCats = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.threeSubCats]}>
      <FootprintOverviewChart period={2022} />
    </StoryMockProvider>
  );
};

export const FiveSubCats = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.fiveSubCats]}>
      <FootprintOverviewChart period={2022} />
    </StoryMockProvider>
  );
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.empty]}>
      <FootprintOverviewChart period={2022} />
    </StoryMockProvider>
  );
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.handle404]}>
      <FootprintOverviewChart period={2022} />
    </StoryMockProvider>
  );
};
