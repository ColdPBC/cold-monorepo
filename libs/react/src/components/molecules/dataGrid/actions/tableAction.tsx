import React from "react";
import { BaseButton } from '@coldpbc/components';
import { ModalAction } from '@coldpbc/components';
import { useAddToastMessage } from '@coldpbc/components';
import { useExecuteAction } from '@coldpbc/components';
import {TableActionType} from '@coldpbc/components';

export interface TableActionProps {
  action: TableActionType;
  setActionsShown: (val: boolean) => void;
}

export const TableAction = (props: TableActionProps) => {
  const { action, setActionsShown } = props;
  const { executeAction } = useExecuteAction();
  const { addToastMessage } = useAddToastMessage();

  switch (action.type) {
    case "button":
      return (
        <BaseButton
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            executeAction(action as TableActionType)
              .then(() => {
                addToastMessage({
                  message: action.toastMessage.success,
                  type: "success",
                });
                setActionsShown(false);
              })
              .catch(() => {
                addToastMessage({
                  message: action.toastMessage.fail,
                  type: "failure",
                });
                setActionsShown(false);
              });
          }}
          label={action.label}
          className={
            "px-3 py-3.5 text-md bg-cold-starkWhite text-cold-starkWhite-a11y text-left"
          }
        />
      );
    case "modal":
      return <ModalAction action={action} />;
    default:
      return <></>;
  }
};
