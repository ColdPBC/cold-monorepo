import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Select } from './select/select';
import { IInputProps } from '../../../interfaces/input';
import { Textarea } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';

export const Input = (props: IInputProps) => {
  const { input_props, input_label, input_label_props, numeric_input_props, container_classname, idx, type, textarea_props } = props;

  function renderCurrency(): JSX.Element {
    const key = `${numeric_input_props?.name}_${idx}`;
    return (
      <div className={twMerge(container_classname, 'col-span-full')}>
        {input_label && (
          <label {...input_label_props} htmlFor={numeric_input_props?.name} className={twMerge(input_label_props?.className, 'block text-sm font-medium leading-6 text-gray-900')}>
            {input_label}
          </label>
        )}
        <NumericFormat
          {...numeric_input_props}
          className={twMerge(
            numeric_input_props?.className,
            'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
          )}
          id={numeric_input_props?.name}
          key={`input_${key}`}
          name={numeric_input_props?.name}
          value={numeric_input_props?.value}
          prefix="$"
          thousandSeparator={numeric_input_props?.thousandSeparator || ','}
        />
      </div>
    );
  }

  function renderNumber(): JSX.Element {
    const key = `${input_props.name}_${idx}`;
    return (
      <div className={twMerge(container_classname, 'col-span-full')}>
        {input_label && (
          <label {...input_label_props} htmlFor={numeric_input_props?.name} className={twMerge(input_label_props?.className, 'block text-sm font-medium leading-6 text-gray-900')}>
            {input_label}
          </label>
        )}
        <NumericFormat
          {...numeric_input_props}
          className={twMerge(
            numeric_input_props?.className,
            'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
          )}
          id={numeric_input_props?.name}
          key={`input_${key}`}
          name={numeric_input_props?.name}
          value={numeric_input_props?.value}
          thousandSeparator={numeric_input_props?.thousandSeparator || ','}
        />
      </div>
    );
  }

  function renderText(): JSX.Element {
    // eslint-disable-next-line no-restricted-globals
    const key = `${name}_${idx}`;
    return (
      <div key={key} className={twMerge(container_classname, 'col-span-full')}>
        {input_label && (
          <label
            {...input_label_props}
            key={`lbl_${key}`}
            htmlFor={input_props.name}
            className={twMerge(input_label_props?.className, 'block text-sm font-medium leading-6 text-tc-primary')}>
            {input_label}
          </label>
        )}
        <input
          {...input_props}
          type={type || 'text'}
          key={`input_${key}`}
          autoComplete={input_props.autoComplete || input_props.name}
          className={twMerge(
            input_props?.className,
            'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
          )}
          id={input_props.name}
        />
      </div>
    );
  }

  function renderSelect(): JSX.Element {
    return (
      <Select
        {...input_props}
        value={input_props.value.name}
        label={input_label}
        onChange={value => {
          input_props.onValueChange(value);
        }}
      />
    );
  }

  function renderTextArea(): JSX.Element {
    // eslint-disable-next-line no-restricted-globals
    const key = `${name}_${idx}`;
    return (
      <div key={key} className={twMerge(container_classname, 'col-span-full')}>
        {input_label && (
          <label
            {...input_label_props}
            key={`lbl_${key}`}
            htmlFor={input_props.name}
            className={twMerge(input_label_props?.className, 'block text-sm font-medium leading-6 text-gray-900')}>
            {input_label}
          </label>
        )}
        <Textarea {...textarea_props} key={`input_${key}`} autoComplete={input_props.autoComplete || input_props.name} className={textarea_props?.className} />
      </div>
    );
  }

  switch (type) {
    case 'currency':
      return renderCurrency();
    case 'number':
      return renderNumber();
    case 'select':
      return renderSelect();
    case 'textarea':
      return renderTextArea();
    default:
    case 'text':
      return renderText();
  }
};
