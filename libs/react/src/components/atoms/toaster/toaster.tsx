import React from 'react';
import { Toast } from 'flowbite-react';
import { ToastMessageType } from '@coldpbc/interfaces';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export interface ToasterProps {
  toastMessage: ToastMessageType;
}

export const Toaster = (props: ToasterProps) => {
  const { toastMessage } = props;
  const { message, type } = toastMessage;
  const getToastIcon = () => {
    let icon = null;
    const className = 'inline-flex min-w-4 rounded-lg items-center justify-center';

    switch (type) {
      default:
      case 'success':
        icon = <CheckIcon className="h-5 w-5" aria-hidden="true" />;
        break;
      case 'failure':
        icon = <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />;
        break;
      case 'info':
        break;
    }

    return <div className={className}>{icon}</div>;
  };

  return (
    <div className="fixed w-full bottom-0 flex justify-center pb-6 z-30">
      <Toast className={'max-w-md bg-bgc-accent text-tc-primary'}>
        {getToastIcon()}
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle className={'bg-bgc-accent'} />
      </Toast>
    </div>
  );
};
