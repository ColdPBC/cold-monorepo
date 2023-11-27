export interface ToastMessageType {
  message: string;
  type?: ToastMessage;
  timeout?: number;
}

export enum ToastMessage {
  SUCCESS = 'success',
  FAILURE = 'failure',
  INFO = 'info',
}
