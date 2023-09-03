import {ToastMessageTypes} from '@coldpbc/components';


export interface TableActionType {
    name: string;
    label: string;
    url: string;
    urls?: string[];
    method: string;
    data: Object;
    type: string;
    toastMessage: TableActionToastMessageType;
}

export interface TableActionToastMessageType {
    success: string;
    fail: string;
}
