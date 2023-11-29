import React from 'react';
import { BaseButton } from '../../atoms/button/button';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ToastMessage } from '../../../interfaces/toastMessage';
import { ApplicationToaster } from './applicationToaster';
import { useAddToastMessage } from '../../../hooks/useToastMessage';
import { SWRConfig } from 'swr';

const meta: Meta<typeof ApplicationToaster> = {
  title: 'Molecules/Application Toaster',
  component: ApplicationToaster,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = (args: any) => {
  const { addToastMessage } = useAddToastMessage();
  const addNewToasterMessage = (type: ToastMessage) => {
    addToastMessage({
      message: 'New toaster message',
      type: type,
      timeout: 3000,
    });
  };
  return (
    <div className={'relative w-full h-screen'}>
      <SWRConfig
        value={{
          provider: (cache) => {
            cache.delete('messages');
            return cache;
          },
        }}
      >
        <div className="space-x-2">
          <BaseButton
            onClick={() => {
              addNewToasterMessage(ToastMessage.SUCCESS);
            }}
            label={'Add New Success Message'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage(ToastMessage.FAILURE);
            }}
            label={'Add New Warning Message'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage(ToastMessage.INFO);
            }}
            label={'Add New Informational Message'}
          />
        </div>
        <ApplicationToaster />
      </SWRConfig>
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    return <DefaultComponent {...args} />;
  },
};
