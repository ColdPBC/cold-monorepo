import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryObj } from '@storybook/react';
import { Toaster } from './toaster';
import { ToastMessageTypes } from '../../../interfaces/toastMessage';

const meta = {
  title: 'Atoms/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {
    type: {
      control: 'select',
      options: ToastMessageTypes,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className={'relative w-full h-screen'}>
        <Toaster {...args} />
      </div>
    );
  },
  args: {
    message: 'New toaster message',
  },
};
