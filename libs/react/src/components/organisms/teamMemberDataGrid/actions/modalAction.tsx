import React, { useState } from 'react';
import { Modal } from '../../../molecules/modal/modal';
import { BaseButton } from '../../../atoms/button/button';
import { useAddToastMessage } from '../../../../hooks/useToastMessage';
import { useExecuteAction } from '../../../../hooks/useExecuteAction';

export interface ModalActionProps {
  action: any;
}

export const ModalAction = (props: ModalActionProps) => {
  const { action } = props as ModalActionProps;
  const [showModal, setShowModal] = useState(false);
  const { executeAction } = useExecuteAction();
  const { addToastMessage } = useAddToastMessage();

  const body = () => {
    return (
      <div className="text-sm font-medium">
        {action.body}
      </div>
    );
  };

  const onOpenModalOpen = () => {
    setShowModal(true);
  };

  const onOpenModalClose = () => {
    setShowModal(false);
  };

  const onModalConfirm = () => {
    // todo: fix this type issue
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    executeAction(action)
      .then(() => {
        addToastMessage({
          message: action.toastMessage.success,
          type: 'success',
        });
        // addToastMessage({
        //   message: action.toastMessage.success,
        //   type: "success",
        // });
        setShowModal(false);
      })
      .catch(() => {
        addToastMessage({
          message: action.toastMessage.fail,
          type: 'failure',
        });
        setShowModal(false);
      });
  };

  return (
    <>
      <BaseButton
        onClick={() => {
          onOpenModalOpen();
        }}
        label={action.label}
        className={
          'px-3 py-3.5 text-md bg-cold-starkWhite text-cold-starkWhite-a11y text-left'
        }
      />
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        header={{
          title: action.title,
        }}
        body={body()}
        footer={{
          rejectButton: {
            ...action.footer?.rejectButton,
            onClick: () => {
              onOpenModalClose();
            },
          },
          resolveButton: {
            ...action.footer?.resolveButton,
            onClick: () => {
              onModalConfirm();
            },
          },
        }}
      />
    </>
  );
};
