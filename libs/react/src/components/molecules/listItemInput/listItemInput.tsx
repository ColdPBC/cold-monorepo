import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconNames, InputTypes } from '@coldpbc/enums';
import { BaseButton, Input } from '@coldpbc/components';

export interface ListItemInputProps {
  value: string[] | null | undefined;
  onChange: (value: string[]) => void;
  'data-testid'?: string;
}

export const ListItemInput = (props: ListItemInputProps) => {
  const { value, onChange } = props;
  const [list, setList] = useState(value || []);
  const [newListValue, setNewListValue] = useState('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addToList(newListValue);
    }
  };

  const addToList = (value: string) => {
    const newList = [...list, value];
    setList(newList);
    setNewListValue('');
    onChange(newList);
  };

  const removeFromList = (index: number) => {
    const newList = list.filter((_, idx) => idx !== index);
    setList(newList);
    onChange(newList);
  };

  const listWithTransition = () => {
    return (
      <TransitionGroup>
        {list.map((item, idx) => {
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
              <div key={idx} className={'flex flex-row w-full'}>
                <Input
                  input_props={{
                    name: 'listItem',
                    value: item,
                    onValueChange: e => {},
                    disabled: true,
                    'aria-label': 'listItem',
                    className: 'w-full',
                  }}
                  container_classname={'w-full'}
                />
                <BaseButton
                  className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent w-[72px]'}
                  onClick={() => removeFromList(idx)}
                  iconRight={IconNames.SubtractIcon}
                />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  };

  return (
    <div className={'flex flex-col w-full'}>
      <div className={'flex flex-row w-full'} data-testid={props['data-testid']}>
        <Input
          type={InputTypes.Text}
          input_props={{
            name: 'listInput',
            value: newListValue,
            onChange: e => setNewListValue(e.target.value),
            onValueChange: e => setNewListValue(e.target.value),
            'aria-label': 'listInput',
            className: 'w-full',
            onKeyDown: onKeyDown,
          }}
          container_classname={'w-full'}
        />
        <BaseButton
          className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent w-[72px]'}
          onClick={() => addToList(newListValue)}
          iconRight={IconNames.PlusIcon}
        />
      </div>
      <div className={'flex flex-col w-full'}>{listWithTransition()}</div>
    </div>
  );
};
