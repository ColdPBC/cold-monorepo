import { Spinner } from './spinner';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { GlobalSizes } from '../../../enums/sizes';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(GlobalSizes),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: GlobalSizes.medium,
  },
};
