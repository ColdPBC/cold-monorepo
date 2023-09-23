import React, { ReactElement } from 'react';
import { Modal as FBModal } from 'flowbite-react';
import { BaseButton } from '../../atoms/button/button';
import { IButtonProps } from '../../../interfaces/buttons/baseButton';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Card } from '../card';

export interface ModalHeader {
  title: string;
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
}

export const Modal = (props: IModalProps) => {
  const { show, setShowModal, header, body, footer } = props;

  const getModelBody = () => {
    return body ? body : <></>;
  };

  const getModalFooter = () => {
    return (
      <div className='flex'>
        {footer?.rejectButton && <BaseButton {...footer.rejectButton} />}
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
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)'
      }}
    >
      <Card title={header.title}>
        <div className='flex flex-col'>
          <div className="space-y-6">{getModelBody()}</div>
          {footer && getModalFooter()}
        </div>
      </Card>
    </FBModal>
  );
};
