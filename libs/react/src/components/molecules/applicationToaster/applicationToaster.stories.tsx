import React from 'react';
import { BaseButton } from '../../atoms/button/button';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ToastMessage, ToastMessageType } from '../../../interfaces/toastMessage';
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
  const addNewToasterMessage = (toast: Partial<ToastMessageType>) => {
    addToastMessage({
      message: 'This is a toast message',
      type: ToastMessage.INFO,
      timeout: 3000,
      position: 'top',
      ...toast,
    });
  };
  return (
    <div className={'relative w-full h-screen'}>
      <SWRConfig
        value={{
          provider: cache => {
            cache.delete('messages');
            return cache;
          },
        }}>
        <div className="space-x-2">
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                type: ToastMessage.SUCCESS,
              });
            }}
            label={'Add New Success Message'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                type: ToastMessage.FAILURE,
              });
            }}
            label={'Add New Warning Message'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                type: ToastMessage.INFO,
              });
            }}
            label={'Add New Informational Message'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                position: 'bottomRight',
              });
            }}
            label={'Add New Informational Message Bottom Right'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                position: 'top',
              });
            }}
            label={'Add New Informational Message Top'}
          />
          <BaseButton
            onClick={() => {
              addNewToasterMessage({
                message: (
                  <div className={'flex flex-col gap-[10px]'}>
                    <div className={'font-bold'}>New Message</div>
                  </div>
                ),
              });
            }}
            label={'New Custom HTML Message'}
          />
        </div>
        <ApplicationToaster />
      </SWRConfig>
    </div>
  );
};

export const Default: Story = {
  render: args => {
    return <DefaultComponent {...args} />;
  },
};
