import { getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FootprintDetailChart } from './footprintDetailChart';

const meta = {
  title: 'Molecules/FootprintDetailChart',
  component: FootprintDetailChart,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof FootprintDetailChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
  return <FootprintDetailChart colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key='facilities' />;
};

export const GreenProduct = () => {
  return <FootprintDetailChart colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key='product' />;
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.empty]}>
      <FootprintDetailChart colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key='product' />
    </StoryMockProvider>
  );
};
