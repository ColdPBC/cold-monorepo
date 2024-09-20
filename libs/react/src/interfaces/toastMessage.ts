import { ReactNode } from 'react';

export interface ToastMessageType {
  message: string | ReactNode;
  type?: ToastMessage;
  timeout?: number;
  position?: 'top' | 'bottomRight';
}

export enum ToastMessage {
  SUCCESS = 'success',
  FAILURE = 'failure',
  INFO = 'info',
}
