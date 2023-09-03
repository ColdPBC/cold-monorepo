import { ToastMessageTypes } from './toastMessage';


export interface TableActionType {
    name: string;
    label: string;
    url: string;
    urls?: string[];
    method: string;
    data: object;
    type: string;
    toastMessage: TableActionToastMessageType;
}

export interface TableActionToastMessageType {
    success: string;
    fail: string;
}
