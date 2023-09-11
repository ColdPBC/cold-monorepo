import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Home } from './home';

const meta = {
  title: 'Pages/Home',
  component: Home,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
