import React from 'react';
import { ToastMessage, ToastMessageType } from '@coldpbc/interfaces';

export interface ToasterProps {
	toastMessage: ToastMessageType;
}

export const Toaster = (props: ToasterProps) => {
	const { toastMessage } = props;
	const { message, type, position = 'top' } = toastMessage;

	const getHighlightClassName = () => {
		let className = '';
		switch (type) {
			case ToastMessage.FAILURE:
				className = 'border-[2px] border-red-500';
				break;
			case ToastMessage.INFO:
				className = 'border-[2px] border-blue-500';
				break;
			default:
				className = 'border-[2px] border-tc-success';
				break;
		}

		return className;
	};

	const getToastPositionClassName = () => {
		let className = '';
		switch (position) {
			case 'bottomRight':
				className = ' fixed bottom-[40px] right-[40px]';
				break;
			default:
				className = ' fixed top-[40px] left-[50%]';
				break;
		}

		return className;
	};

	return <div className={'w-auto rounded-[16px] p-[24px] z-30 bg-bgc-accent text-tc-primary ' + getHighlightClassName() + getToastPositionClassName()}>{message}</div>;
};
