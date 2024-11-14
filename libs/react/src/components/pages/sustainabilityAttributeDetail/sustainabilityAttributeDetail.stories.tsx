import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityAttributeDetail } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import {
  defaultGraphqlMocks,
  productLevelSustainabilityAttributeMocks,
  StoryMockProvider, supplierLevelSustainabilityAttributeMocks,
  sustainabilityAttributesMocks,
} from '@coldpbc/mocks';

const meta: Meta<typeof SustainabilityAttributeDetail> = {
  title: 'Pages/SustainabilityAttributeDetail',
  component: SustainabilityAttributeDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
};

export const ProductLevel: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={productLevelSustainabilityAttributeMocks}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
};

export const SupplierLevel: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={supplierLevelSustainabilityAttributeMocks}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
};

