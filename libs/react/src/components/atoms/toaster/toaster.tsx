import React, { useEffect } from 'react';
import { ToastMessageType } from '@coldpbc/interfaces';
import { KeyedMutator } from 'swr';

export interface ToasterProps {
  toastMessage: ToastMessageType;
}

export const Toaster = (props: ToasterProps) => {
  const { toastMessage } = props;
  const { message, type } = toastMessage;

  const getHighlightClassName = () => {
    let className = '';
    switch (type) {
      default:
      case 'success':
        className = 'border-[1px] border-tc-success';
        break;
      case 'failure':
        className = 'border-[1px] border-red-500';
        break;
      case 'info':
        className = 'border-[1px] border-blue-500';
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
