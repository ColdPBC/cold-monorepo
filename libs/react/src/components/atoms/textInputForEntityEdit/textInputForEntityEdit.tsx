import React from 'react';
import { Input } from '@coldpbc/components';

interface TextInputForEntityEditProps<T> {
  fieldName: keyof T;
  label: string;
  setEntityState: (state: T) => void;
  entityState: T;
  required?: boolean;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const TextInputForEntityEdit = <T,>({
  fieldName,
  label,
  setEntityState,
  entityState,
  required = false,
  placeholder = '',
  containerClassName = 'w-full text-tc-primary',
  inputClassName = 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
  labelClassName = 'text-eyebrow'
}: TextInputForEntityEditProps<T>) => {
  return (
    <Input
      input_props={{
        name: String(fieldName),
        value: entityState[fieldName],
        onChange: e => {
          setEntityState({
            ...entityState,
            [fieldName]: e.target.value,
          });
        },
        onValueChange: e => {
          setEntityState({
            ...entityState,
            [fieldName]: e,
          });
        },
        className: inputClassName,
        placeholder,
      }}
      container_classname={containerClassName}
      input_label_props={{
        className: labelClassName,
      }}
      input_label={`${label}${required ? ' *' : ''}`}
    />
  );
};
