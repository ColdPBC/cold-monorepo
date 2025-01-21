import React from 'react';
import { Input } from '@coldpbc/components';

interface TextInputForEntityEditProps<T> {
  fieldName: keyof T;
  label: string;
  setEntityState: (state: T) => void;
  entityState: T;
  setError: (error?: string) => void;
  error?: string;
  preexistingValues?: string[];
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
  setError,
  error,
  preexistingValues,
  required = false,
  placeholder = '',
  containerClassName = 'w-full text-tc-primary',
  inputClassName = 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
  labelClassName = 'text-eyebrow'
}: TextInputForEntityEditProps<T>) => {
  const validate = (newValue: string) => {
    if (setError) {
      if (required && newValue.trim() === '') {
        setError(`${label} is required`);
      } else if (preexistingValues && preexistingValues.includes(newValue)) {
        setError(`${label} already exists`);
      } else {
        setError(undefined);
      }
    }
  }

  const onChange = (value: string) => {
    validate(value);
    setEntityState({
      ...entityState,
      [fieldName]: value,
    });
  }

  return (
    <Input
      input_props={{
        name: String(fieldName),
        value: entityState[fieldName],
        onChange: e => {
          onChange(e.target.value);
        },
        onValueChange: e => {
          onChange(e);
        },
        className: inputClassName,
        placeholder,
        error: error,
        showError: true,
        autoComplete: "off",
      }}
      container_classname={containerClassName}
      input_label_props={{
        className: labelClassName,
      }}
      input_label={`${label}${required ? ' *' : ''}`}
    />
  );
};
