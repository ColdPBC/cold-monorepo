import React, { useState } from 'react';
import { DataGridPopover } from '../../datagridPopover/dataGridPopover';
import { TableActionButton } from './tableActionButton';
import { TableActionType } from '../../../../interfaces/tableAction';
import { TableAction } from './tableAction';

export interface TableActionsProps {
  actions: TableActionType[];
}

// TODO: Add story for this component

export const TableActions = (props: TableActionsProps) => {
  const { actions } = props;
  const [shown, setShown] = useState(false);

  const content = () => {
    return (
      <div
        className={
          'absolute z-10 flex flex-col w-36 border border-cold-gray rounded-lg shadow w-[200px]'
        }
      >
        {actions.map((action, index, array) => {
          return (
            <TableAction
              key={`${index}`}
              action={action}
              setActionsShown={setShown}
            />
          );
        })}
      </div>
    );
  };
  return (
    <>
      {actions.length > 0 && (
        <DataGridPopover content={content()} shown={shown} setShown={setShown}>
          <TableActionButton
            onClick={() => {
              setShown(!shown);
            }}
          />
        </DataGridPopover>
      )}
    </>
  );
};
