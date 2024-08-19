import React from 'react';
import { ToastMessage, ToastMessageType } from '@coldpbc/interfaces';

export interface ToasterProps {
  toastMessage: ToastMessageType;
}

export const Toaster = (props: ToasterProps) => {
  const { toastMessage } = props;
  const { message, type } = toastMessage;

  const getHighlightClassName = () => {
    let className = '';
    switch (type) {
      case ToastMessage.FAILURE:
        className = 'border-[1px] border-red-500';
        break;
      case ToastMessage.INFO:
        className = 'border-[1px] border-blue-500';
        break;
      case ToastMessage.FAILURE:
        className = 'border-[1px] border-red-500';
        break;
      case ToastMessage.INFO:
        className = 'border-[1px] border-blue-500';
        break;
      default:
        className = 'border-[1px] border-tc-success';
        break;
    }

    return className;
  };

  return (
    <div className={'fixed w-full top-[40px] flex justify-center pb-6 z-30'}>
      <div className={'w-auto rounded-[16px] p-[24px] bg-bgc-accent text-tc-primary ' + getHighlightClassName()}>
        <div className="ml-3 text-sm font-normal">{message}</div>
      </div>
    </div>
  );
};
