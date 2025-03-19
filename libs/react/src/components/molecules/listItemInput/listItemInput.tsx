import React from 'react';
import { IconNames, InputTypes } from '@coldpbc/enums';
import { BaseButton, Input } from '@coldpbc/components';
import { IButtonProps } from '@coldpbc/interfaces';

export interface ListItemInputProps {
  id: string;
  value: string | null;
  removeItem: (id: string) => void;
  onChange: (id: string, value: string | null) => void;
  input_props?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: IButtonProps;
  'data-testid'?: string;
  forwardRef: React.RefObject<HTMLDivElement>;
  showRemove: boolean;
}

export const ListItemInput = (props: ListItemInputProps) => {
  const { id, value, removeItem, onChange, input_props, buttonProps, forwardRef, showRemove } = props;

  const updateValue = (newValue: string) => {
    const valueOrNull = newValue.length > 0 ? newValue : null;
    onChange(id, valueOrNull);
  };

  return (
    <div className={'flex flex-row w-full'} data-testid={props['data-testid']} ref={forwardRef}>
      <Input
        type={InputTypes.Text}
        input_props={{
          name: 'listInput',
          value: value || '',
          onChange: e => updateValue(e.target.value),
          onValueChange: e => updateValue(e.target.value),
          'aria-label': 'listInput',
          className: 'w-full',
          ...input_props,
        }}
        container_classname={'w-full'}
      />
      {
        showRemove && (
          <BaseButton
            onClick={() => removeItem(id)}
            iconRight={IconNames.CloseModalIcon}
            className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent w-[72px]'}
            {...buttonProps}
            data-testid={'removeListItem'}
          />
        )
      }
    </div>
  );
};
