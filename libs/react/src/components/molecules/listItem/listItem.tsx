import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconNames } from '@coldpbc/enums';
import { BaseButton, ListItemInput } from '@coldpbc/components';
import { forEach } from 'lodash';

export interface ListItemProps {
  value: string[] | null | undefined;
  onChange: (value: string[] | null) => void;
  input_props?: React.InputHTMLAttributes<HTMLInputElement>;
  'data-testid'?: string;
}

export const ListItem = (props: ListItemProps) => {
  const { value, onChange, input_props } = props;
  const [list, setList] = useState<Array<string | null>>(value || [null]);

  const addToList = () => {
    const newList = [...list, null];
    setList(newList);
  };

  const onListInputChange = (value: Array<string | null>) => {
    setList(value);
    // strip the nulls
    const newList = Array<string>();
    forEach(value, (item, idx) => {
      if (item !== null) {
        newList.push(item);
      }
    });
    onChange(newList.length > 0 ? newList : null);
  };

  const listWithTransition = () => {
    return (
      <TransitionGroup>
        {list.map((item, idx, list) => {
          return (
            <CSSTransition
              key={idx}
              timeout={200}
              classNames={{
                enter: 'opacity-0',
                enterDone: 'transition-opacity opacity-1 ease-in duration-200',
                exit: 'opacity-1',
                exitActive: 'transition-opacity opacity-0 ease-in duration-200',
              }}>
              <ListItemInput key={idx} index={idx} list={list} onChange={onListInputChange} input_props={input_props} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  };

  return (
    <div className={'flex flex-col w-full'}>
      <div className={'flex flex-col w-full'}>{listWithTransition()}</div>
      <BaseButton
        className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent h-[72px] w-full'}
        onClick={() => addToList()}
        iconRight={IconNames.PlusIcon}
      />
    </div>
  );
};
