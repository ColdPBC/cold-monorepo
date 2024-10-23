import React, { ReactElement } from 'react';
import { Modal as FBModal, ModalProps } from 'flowbite-react';
import { BaseButton } from '../../atoms/button/button';
import { IButtonProps } from '../../../interfaces/buttons/baseButton';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Card, CardProps } from '../card';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export interface ModalHeader {
	title: string;
	cardProps?: CardProps;
}

export interface ModalFooter {
	rejectButton?: IButtonProps;
	resolveButton?: IButtonProps;
}

export interface IModalProps {
	show: boolean;
	setShowModal: (show: boolean) => void;
	header: ModalHeader;
	body: ReactElement;
	footer?: ModalFooter;
	modalProps?: ModalProps;
}

export const Modal = (props: IModalProps) => {
	const { show, setShowModal, header, body, footer, modalProps } = props;

	const getModelBody = () => {
		return body ? body : <></>;
	};

	const getModalFooter = () => {
		return (
			<div className="flex justify-end mt-11">
				{footer?.rejectButton && (
					<span className={clsx({ 'mr-6': footer?.resolveButton })}>
						<BaseButton {...footer.rejectButton} />
					</span>
				)}
				{footer?.resolveButton && <BaseButton {...footer.resolveButton} />}
			</div>
		);
	};

	return (
		<FBModal
			dismissible
			show={show}
			onClose={() => props.setShowModal(false)}
			theme={flowbiteThemeOverride.modal}
			style={{
				boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
			}}
			{...modalProps}>
			<Card title={header.title} className="relative p-6 overflow-visible" {...header.cardProps}>
				<div className="flex flex-col w-full">
					<div className="">{getModelBody()}</div>
					{footer && getModalFooter()}
				</div>
				<button
					className="w-[20px] h-[20px] absolute right-[24px] top-[24px]"
					onClick={e => {
						props.setShowModal(false);
					}}>
					<XMarkIcon />
				</button>
			</Card>
		</FBModal>
	);
};
