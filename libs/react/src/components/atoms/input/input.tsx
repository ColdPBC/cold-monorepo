import React from 'react';
import { NumericFormat } from 'react-number-format';
import { Select } from './select/select';
import { IInputProps } from '../../../interfaces/input';
import { twMerge } from 'tailwind-merge';

export const Input = (props: IInputProps) => {
  const { input_props, input_label, input_label_props, numeric_input_props, container_classname, idx, type, textarea_props } = props;

  function renderCurrency(): JSX.Element {
    const key = `${numeric_input_props?.name}_${idx}`;
    return (
      <div className={twMerge('col-span-full', container_classname)}>
        {input_label && (
          <label
            {...input_label_props}
            htmlFor={numeric_input_props?.name}
            className={twMerge('block text-eyebrow font-medium leading-6 text-tc-primary text-nowrap', input_label_props?.className)}>
            {input_label}
          </label>
        )}
        <NumericFormat
          {...numeric_input_props}
          className={twMerge(
            'text-body not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
            numeric_input_props?.className,
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
    const key = `${numeric_input_props?.name}_${idx}`;
    return (
      <div className={twMerge('col-span-full', container_classname)}>
        {input_label && (
          <label
            {...input_label_props}
            htmlFor={numeric_input_props?.name}
            className={twMerge('block text-eyebrow font-medium leading-6 text-tc-primary text-nowrap', input_label_props?.className)}>
            {input_label}
          </label>
        )}
        <NumericFormat
          {...numeric_input_props}
          className={twMerge(
            'text-body not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
            numeric_input_props?.className,
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
    const key = `${input_props?.name}_${idx}`;
    return (
      <div
        key={key}
        className={twMerge('col-span-full', container_classname)}
        data-testid={`input_container_${input_props?.name}`}
      >
        {input_label && (
          <label
            {...input_label_props}
            key={`lbl_${key}`}
            htmlFor={input_props?.name}
            className={twMerge('block text-eyebrow font-medium leading-6 text-tc-primary text-nowrap', input_label_props?.className)}
            data-testid={`input_label_${input_props?.name}`}
          >
            {input_label}
          </label>
        )}
        <input
          {...input_props}
          type={type || 'text'}
          key={`input_${key}`}
          autoComplete={input_props?.autoComplete || input_props?.name}
          className={twMerge(
            'text-body not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
            input_props?.className,
            input_props?.showError ? (input_props?.error ? 'border-red-100 focus:border-red-100' : 'border-gray-90 focus:border-gray-90') : '',
          )}
          id={input_props?.name}
          data-testid={`input_${input_props?.name}`}
        />
        {
          input_props && input_props.showError && (input_props.error ? (
            <div className="text-red-100 text-eyebrow mt-[8px]" key={`error_${key}`} data-testid={`input_error_${input_props.name}`}>
              {input_props.error}
            </div>
          ) : (
            <div className={'h-5'} key={`error_${key}`} data-testid={`input_error_space_${input_props.name}`}>
            </div>
          ))
        }
      </div>
    );
  }

  function renderSelect(): JSX.Element {
    return (
      <Select
        {...input_props}
        name={input_props?.name || ''}
        value={input_props?.value.name || ''}
        label={input_label}
        onChange={value => {
          input_props?.onValueChange(value);
        }}
      />
    );
  }

  function renderTextArea(): JSX.Element {
    // eslint-disable-next-line no-restricted-globals
    const key = `${name}_${idx}`;
    return (
      <div key={key} className={twMerge('col-span-full', container_classname)}>
        {input_label && (
          <label
            {...input_label_props}
            key={`lbl_${key}`}
            htmlFor={input_label_props?.htmlFor}
            className={twMerge('block text-eyebrow font-medium leading-6 text-tc-primary text-nowrap', input_label_props?.className)}
            data-testid={`input_label_${input_props?.name}`}
          >
            {input_label}
          </label>
        )}
        <textarea
          rows={4}
          draggable={false}
          {...textarea_props}
          key={`input_${key}`}
          className={twMerge('block text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 resize-none', textarea_props?.className)}
          data-testid={`input_error_${textarea_props?.name}`}
        />
        {
          textarea_props && textarea_props.showError && (textarea_props.error ? (
            <div className="text-red-100 text-eyebrow mt-[8px]" key={`error_${key}`} data-testid={`input_error_${textarea_props.name}`}>
              {textarea_props.error}
            </div>
          ) : (
            <div className={'h-5'} key={`error_${key}`} data-testid={`input_error_space_${textarea_props.name}`}>
            </div>
          ))
        }
      </div>
    );
  }

  function renderCheckbox(): JSX.Element {
    // eslint-disable-next-line no-restricted-globals
    const key = `${input_props?.name}_${idx}`;
    return (
      <div key={key} className={twMerge('col-span-full', container_classname)}>
        {input_label && (
          <label
            {...input_label_props}
            key={`lbl_${key}`}
            htmlFor={input_props?.name}
            className={twMerge('block text-eyebrow font-medium leading-6 text-tc-primary text-nowrap', input_label_props?.className)}>
            {input_label}
          </label>
        )}
        <input
          {...input_props}
          type={'checkbox'}
          key={`input_${key}`}
          autoComplete={input_props?.autoComplete || input_props?.name}
          className={twMerge('w-6 h-6 rounded border border-bgc-accent bg-transparent focus:ring-0 focus:ring-offset-0', input_props?.className)}
          id={input_props?.name}
        />
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
    case 'checkbox':
      return renderCheckbox();
    default:
    case 'text':
      return renderText();
  }
};
