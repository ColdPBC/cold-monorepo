import { useState } from 'react';
import { TableActionButton } from './tableActionButton';
import { TableActionType } from '../../../../interfaces/tableAction';
import { TableAction } from './tableAction';
import { Dropdown } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Modal } from '../../modal';
import { useAddToastMessage, useExecuteAction } from '@coldpbc/hooks';
import { ToastMessage } from '@coldpbc/interfaces';

export interface TableActionsProps {
  actions: TableActionType[];
}

// TODO: Add story for this component

export const TableActions = (props: TableActionsProps) => {
  const { actions } = props;
  const [shown, setShown] = useState(false);
  const [actionModal, setActionModal] = useState<any | null>(null);
  const { addToastMessage } = useAddToastMessage();
  const { executeAction } = useExecuteAction();

  const onActionModalConfirm = () => {
    // todo: fix this type issue
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    executeAction(actionModal)
      .then(() => {
        addToastMessage({
          message: actionModal.toastMessage.success,
          type: ToastMessage.SUCCESS,
        });
        setActionModal(null);
      })
      .catch(() => {
        addToastMessage({
          message: actionModal.toastMessage.fail,
          type: ToastMessage.FAILURE,
        });
        setActionModal(null);
      });
  };

  if (!actions.length) return null;

  return (
    <>
      <Dropdown
        inline={true}
        label={
          <TableActionButton
            onClick={() => {
              setShown(!shown);
            }}
          />
        }
        arrowIcon={false}
        theme={flowbiteThemeOverride.dropdown}
      >
        {actions.map((action, index, array) => {
          return (
            <>
              <Dropdown.Item
                theme={flowbiteThemeOverride.dropdown.floating.item}
                className="p-0 w-full"
              >
                <TableAction
                  key={`${index}`}
                  action={action}
                  setActionsShown={setShown}
                  openActionModal={setActionModal}
                />
              </Dropdown.Item>
              {index + 1 < actions.length && (
                <div className="bg-bgc-accent h-[1px] w-full" />
              )}
            </>
          );
        })}
      </Dropdown>
      <Modal
        show={actionModal !== null}
        setShowModal={() => setActionModal(null)}
        header={{
          title: actionModal?.title,
        }}
        body={<div className="text-sm font-medium">{actionModal?.body}</div>}
        footer={{
          rejectButton: {
            ...actionModal?.footer?.rejectButton,
            onClick: () => {
              setActionModal(null);
            },
          },
          resolveButton: {
            ...actionModal?.footer?.resolveButton,
            onClick: () => {
              onActionModalConfirm();
            },
          },
        }}
      />
    </>
  );
};
