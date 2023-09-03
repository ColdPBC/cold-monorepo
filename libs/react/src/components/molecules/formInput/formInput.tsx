import React from "react";
import {NumericFormat} from "react-number-format";
import {FormInputProps} from '@coldpbc/components';
import {Select} from '@coldpbc/components';
import {InputTypes} from '@coldpbc/components';
import {Input} from '@coldpbc/components';
import {NumericInputProps} from '@coldpbc/components';

export const FormInput = ({
    onFieldUpdated,
    name,
    value,
    idx,
    input_label,
    type,
    placeholder,
    options,
    default_value,
    input_classname,
    label_classname,
    container_classname,
    auto_complete,
}: FormInputProps) => {

    function getNumericInputProps(): NumericInputProps{
        switch (type) {
            case "currency":
                return {
                    className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                    id: `${name}_${idx}`,
                    name: name,
                    value: value,
                    prefix: "$",
                    onValueChange: (values) =>
                        onFieldUpdated(name, values.formattedValue),
                    thousandSeparator: ",",
                };
            case "number":
                return {
                    className:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                    id:name,
                    name:name,
                    value:value,
                    onValueChange:(values) =>
                        onFieldUpdated(name, values.formattedValue),
                    thousandSeparator:",",
                };
            default:
                return {};
        }
    }

    return (
        <Input
            container_classname={container_classname || "col-span-full"}
            type={type}
            input_props={{
                name:name,
                value:value,
                defaultValue:default_value,
                onChange: (e) => onFieldUpdated(name, e.target.value),
                placeholder: placeholder,
                autoComplete: auto_complete || name,
                onValueChange: (value) => {
                    onFieldUpdated(name, value)
                },
                options: options,
            }}
            input_label={input_label}
            input_label_props={{
                className: label_classname
            }}
            numeric_input_props={getNumericInputProps()}
        />
    )

};
