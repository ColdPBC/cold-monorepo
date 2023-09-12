import React from 'react';
import { BaseButton } from '../../../atoms/button/button';
import { ModalAction } from '../../../organisms/teamMemberDataGrid/actions/modalAction';
import { useAddToastMessage } from '../../../../hooks/useToastMessage';
import { useExecuteAction } from '../../../../hooks/useExecuteAction';
import { TableActionType } from '../../../../interfaces/tableAction';

export interface TableActionProps {
  action: TableActionType;
  setActionsShown: (val: boolean) => void;
}

export const TableAction = (props: TableActionProps) => {
  const { action, setActionsShown } = props;
  const { executeAction } = useExecuteAction();
  const { addToastMessage } = useAddToastMessage();

  switch (action.type) {
    case 'button':
      return (
        <BaseButton
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            executeAction(action as TableActionType)
              .then(() => {
                addToastMessage({
                  message: action.toastMessage.success,
                  type: 'success',
                });
                setActionsShown(false);
              })
              .catch(() => {
                addToastMessage({
                  message: action.toastMessage.fail,
                  type: 'failure',
                });
                setActionsShown(false);
              });
          }}
          label={action.label}
          className={
            'px-3 py-3.5 text-md bg-cold-starkWhite text-cold-starkWhite-a11y text-left'
          }
        />
      );
    case 'modal':
      return <ModalAction action={action} />;
    default:
      return <></>;
  }
};
