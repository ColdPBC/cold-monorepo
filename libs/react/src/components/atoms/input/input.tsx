import React, {Fragment} from "react";
import { NumericFormat } from "react-number-format";
import { Select } from './select/select';
import { IInputProps } from '../../../interfaces/input';

export const Input = (props: IInputProps) => {
  const {
    input_props,
    input_label,
    input_label_props,
    numeric_input_props,
    container_classname,
    idx,
    type,
  } = props

  function renderCurrency(): JSX.Element {
    const key = `${numeric_input_props?.name}_${idx}`;
    return (
      <div className={container_classname || "col-span-full"}>
        {
            input_label && (
                <label
                    {...input_label_props}
                    htmlFor={numeric_input_props?.name}
                    className={input_label_props?.className || "block text-sm font-medium leading-6 text-gray-900"}
                >
                  {input_label}
                </label>
            )
        }
          <NumericFormat
              {...numeric_input_props}
              className={ numeric_input_props?.className || "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
              id={numeric_input_props?.name}
              key={`input_${key}`}
              name={numeric_input_props?.name}
              value={numeric_input_props?.value}
              prefix="$"
              thousandSeparator={numeric_input_props?.thousandSeparator || ","}
          />
      </div>
    );
  }

  function renderNumber(): JSX.Element {
    const key = `${input_props.name}_${idx}`;
    return (
      <div className={container_classname || "col-span-full"}>
        {
          input_label && (
                <label
                    {...input_label_props}
                    htmlFor={numeric_input_props?.name}
                    className={input_label_props?.className || "block text-sm font-medium leading-6 text-gray-900"}
                >
                  {input_label}
                </label>
            )
        }
          <NumericFormat
              {...numeric_input_props}
            className={numeric_input_props?.className || "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
            id={numeric_input_props?.name}
            key={`input_${key}`}
            name={numeric_input_props?.name}
            value={numeric_input_props?.value}
            thousandSeparator={numeric_input_props?.thousandSeparator || ","}
          />
        </div>
    );
  }

  function renderText(): JSX.Element {
    // eslint-disable-next-line no-restricted-globals
    const key = `${name}_${idx}`;
    return (
      <div key={key} className={container_classname || "col-span-full"}>
        {input_label && (
          <label
              {...input_label_props}
              key={`lbl_${key}`}
              htmlFor={input_props.name}
              className={
                input_label_props?.className ||
                "block text-sm font-medium leading-6 text-gray-900"
              }
          >
            {input_label}
          </label>
        )}
        <input
          {...input_props}
          type={type || "text"}
          key={`input_txt_${key}`}
          autoComplete={input_props.autoComplete || input_props.name}
          className={
              input_props?.className ||
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          }
        />
      </div>
    );
  }

  function renderSelect(): JSX.Element {
    return <Select
        options={input_props.options}
        name={input_props.name}
        label={input_label}
        value={input_props.value}
        onChange={(value) => {
          input_props.onValueChange(value.name)
        }}
    />
  }


  switch (type) {
    case "currency":
      return renderCurrency();
    case "number":
      return renderNumber();
    case "select":
        return renderSelect();
    default:
    case "text":
      return renderText();
  }
};
