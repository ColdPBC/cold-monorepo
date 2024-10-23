import { ButtonTypes } from '../enums/buttons';
import { KeyedMutator } from 'swr';
import { IModalProps } from '@coldpbc/components';
import { IButtonProps } from './buttons';

export interface TableActionType {
	name: string;
	label: string;
	type: string;
	toastMessage: TableActionToastMessageType;

	// for modal
	modalProps?: {
		header: IModalProps['header'];
		body: IModalProps['body'];
		footer: IModalProps['footer'];
	};

	apiRequests: {
		url: string;
		method: string;
		data?: object;
	}[];

	mutate: KeyedMutator<any>;
	actionObject: any;
}

export interface TableActionToastMessageType {
	success: string;
	fail: string;
}
