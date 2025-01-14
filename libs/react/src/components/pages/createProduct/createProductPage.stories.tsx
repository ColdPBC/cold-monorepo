import { Meta, StoryObj } from '@storybook/react';
import {CreateProductPage} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof CreateProductPage> = {
  title: 'Pages/CreateProductPage',
  component: CreateProductPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateProductPage />
      </StoryMockProvider>
    );
  },
};
