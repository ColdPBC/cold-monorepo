import { Meta, StoryObj } from '@storybook/react';
import { EditSustainabilityAttributesForEntity } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider, sustainabilityAttributesForProductMocks } from '@coldpbc/mocks';
import { EntityLevel } from '@coldpbc/enums';

const meta: Meta<typeof EditSustainabilityAttributesForEntity> = {
	title: 'Molecules/EditSustainabilityAttributesForEntity',
	component: EditSustainabilityAttributesForEntity,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider graphqlMocks={sustainabilityAttributesForProductMocks}>
        <EditSustainabilityAttributesForEntity
          entity={{ name: 'Product 1', id: 'product_1' }}
          entityLevel={EntityLevel.PRODUCT}
          isOpen={true}
          onClose={() => {}}
        />
      </StoryMockProvider>
    );
  },
};
