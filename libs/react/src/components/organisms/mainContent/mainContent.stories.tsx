import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MainContent } from '@coldpbc/components';

const meta = {
  title: 'Molecules/MainContent',
  component: MainContent,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof MainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
