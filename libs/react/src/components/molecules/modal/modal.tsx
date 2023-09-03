import React, { ReactElement } from "react";
import { Modal as FBModal } from "flowbite-react";
import { BaseButton } from '../../atoms/button/button';
import { IButtonProps } from '../../../interfaces/buttons/baseButton';

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
      <>
        {footer?.rejectButton && <BaseButton {...footer.rejectButton} />}
        {footer?.resolveButton && <BaseButton {...footer.resolveButton} />}
      </>
    );
  };

  return (
    <FBModal dismissible show={show} onClose={() => props.setShowModal(false)}>
      <FBModal.Header>{header.title}</FBModal.Header>
      <FBModal.Body>
        <div className="space-y-6">{getModelBody()}</div>
      </FBModal.Body>
      {footer && <FBModal.Footer>{getModalFooter()}</FBModal.Footer>}
    </FBModal>
  );
};
