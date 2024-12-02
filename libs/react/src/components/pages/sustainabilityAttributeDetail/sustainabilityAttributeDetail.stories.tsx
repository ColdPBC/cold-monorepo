import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityAttributeDetail } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import {
  productLevelSustainabilityAttributeMocks,
  StoryMockProvider, supplierLevelSustainabilityAttributeMocks,
  sustainabilityAttributesMocks,
} from '@coldpbc/mocks';
import { fireEvent, within } from '@storybook/testing-library';

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
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks()}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
};

export const ByMaterialTab: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks()}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const byMaterialTabLabel = await within(canvasElement).findByText('By Material');
    fireEvent.click(byMaterialTabLabel);
  },
};

export const MaterialLevelWithoutProducts: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks({includeProducts: false})}>
        <SustainabilityAttributeDetail />
      </StoryMockProvider>
    );
  },
};

export const MaterialLevelWithoutWeights: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesMocks({includeWeights: false})}>
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

