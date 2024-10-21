import { Meta, StoryObj } from '@storybook/react';
import {ProductDetail} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ProductDetail> = {
  title: 'Pages/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <ProductDetail />
      </StoryMockProvider>
    );
  },
};
