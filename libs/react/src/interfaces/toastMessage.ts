export type ToastMessageProps = {
  message: string;
  type?: ToastMessageTypes;
};

export enum ToastMessageTypes {
  SUCCESS = 'success',
  FAILURE = 'failure',
  INFO = 'info',
}
