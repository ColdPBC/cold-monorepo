import { ButtonTypes } from "../enums/buttons";

export interface TableActionType {
  name: string;
  label: string;
  type: string;
  toastMessage: TableActionToastMessageType;

  // for modal
  title?: string;
  body?: JSX.Element;
  footer?: {
    resolveButton: {
        variant?: ButtonTypes;
        label: string;
    };
    rejectButton: {
        label: string;
        variant?: ButtonTypes;
    };
}

  apiRequests: {
    url: string;
    method: string;
    data?: object;
  }[];
}

export interface TableActionToastMessageType {
  success: string;
  fail: string;
}
