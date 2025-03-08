import React, {createRef, useState} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconNames } from '@coldpbc/enums';
import { BaseButton, ListItemInput } from '@coldpbc/components';
import { forEach } from 'lodash';
import { IButtonProps } from '@coldpbc/interfaces';
import { twMerge } from 'tailwind-merge';

export interface ListItemProps {
  value: string[] | null | undefined;
  onChange: (value: Array<string | null> | null) => void;
  input_props?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: IButtonProps;
  listClassName?: string;
  className?: string;
  deleteButtonProps?: IButtonProps;
  'data-testid'?: string;
}

export interface ListItemType {
  id: string;
  value: string | null;
  nodeRef: React.RefObject<HTMLDivElement>;
}

// todo: fix delete item that is not the last bug
export const ListItem = (props: ListItemProps) => {
  const { value, onChange, input_props, buttonProps, className, listClassName, deleteButtonProps } = props;
  const [items, setItems] = useState<Array<ListItemType>>(() => {
    if (value) {
      return value.map(v => ({ id: crypto.randomUUID(), value: v, nodeRef: createRef<HTMLDivElement>() }));
    }
    return [{ id: crypto.randomUUID(), value: null, nodeRef: createRef<HTMLDivElement>() }];
  });

  const addToList = () => {
    const newItems = [...items, { id: crypto.randomUUID(), value: null, nodeRef: createRef<HTMLDivElement>() }];
    setItems(newItems);
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    const newValues = newItems.map(item => item.value);
    onChange(newValues.length > 0 ? newValues : null);
  };

  const onItemChange = (id: string, value: string | null) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, value } : item
    );
    setItems(newItems);
    const newValues = newItems.map(item => item.value);
    onChange(newValues.length > 0 ? newValues : null);
  };

  const listWithTransition = () => {
    return (
      <TransitionGroup className={listClassName}>
        {items.map((item, index) => (
          <CSSTransition
            key={item.id}
            nodeRef={item.nodeRef}
            timeout={200}
            classNames={{
              enter: 'opacity-0',
              enterActive: 'transition-opacity duration-200 ease-in opacity-100',
              exit: 'opacity-100',
              exitActive: 'transition-opacity duration-200 ease-in opacity-0'
            }}
          >
            <ListItemInput
              id={item.id}
              value={item.value}
              removeItem={removeItem}
              onChange={onItemChange}
              input_props={input_props}
              buttonProps={deleteButtonProps}
              data-testid={(props['data-testid'])}
              forwardRef={item.nodeRef}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  };

  return (
    <div className={twMerge('flex flex-col w-full', className)} data-testid={'wholeListItem'}>
      <div className={'flex flex-col w-full gap-[16px]'}>{listWithTransition()}</div>
      <BaseButton
        onClick={addToList}
        iconRight={IconNames.PlusIcon}
        className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent h-[72px] w-full'}
        disabled={items.length > 0 && items[items.length - 1].value === null}
        data-testid={'addListItemButton'}
        {...buttonProps}
      />
    </div>
  );
};
