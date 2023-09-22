import { getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { footprintSubcategoryColors, getSchemeForColor, HexColors } from '@coldpbc/themes';
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
  return <FootprintDetailChart colors={getSchemeForColor(HexColors[footprintSubcategoryColors['facilities']])} period={2022} subcategory_key='facilities' />;
};

export const GreenProduct = () => {
  return <FootprintDetailChart colors={getSchemeForColor(HexColors[footprintSubcategoryColors['product']])} period={2022} subcategory_key='product' />;
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.empty]}>
      <FootprintDetailChart colors={getSchemeForColor(HexColors[footprintSubcategoryColors['product']])} period={2022} subcategory_key='product' />
    </StoryMockProvider>
  );
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.handle404]}>
      <FootprintDetailChart colors={getSchemeForColor(HexColors[footprintSubcategoryColors['product']])} period={2022} subcategory_key='product' />
    </StoryMockProvider>
  );
};

