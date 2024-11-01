import { Meta, StoryObj } from '@storybook/react';
import { EditSustainabilityAttributesForProduct } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider, sustainabilityAttributesForProductMocks } from '@coldpbc/mocks';

const meta: Meta<typeof EditSustainabilityAttributesForProduct> = {
  title: 'Molecules/EditSustainabilityAttributesForProduct',
  component: EditSustainabilityAttributesForProduct,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesForProductMocks}>
        <EditSustainabilityAttributesForProduct
          product={{ name: 'Product 1', id: 'product_1' }}
          isOpen={true}
          onClose={() => {}}
        />
      </StoryMockProvider>
    );
  },
};
