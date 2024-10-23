import React from 'react';
import { FormInputProps } from '../../../interfaces/form/form';
import { Input } from '../../atoms/input/input';
import { NumericInputProps } from '../../../interfaces/input';

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
	function getNumericInputProps(): NumericInputProps {
		switch (type) {
			case 'currency':
				return {
					id: `${name}_${idx}`,
					name: name,
					value: value,
					prefix: '$',
					onValueChange: values => onFieldUpdated(name, values.formattedValue),
					thousandSeparator: ',',
				};
			case 'number':
				return {
					id: name,
					name: name,
					value: value,
					onValueChange: values => onFieldUpdated(name, values.formattedValue),
					thousandSeparator: ',',
				};
			default:
				return {};
		}
	}

	return (
		<Input
			container_classname={container_classname || 'col-span-full'}
			type={type}
			input_props={{
				name: name,
				value: value,
				defaultValue: default_value,
				onChange: e => onFieldUpdated(name, e.target.value),
				placeholder: placeholder,
				autoComplete: auto_complete || name,
				onValueChange: value => {
					onFieldUpdated(name, value);
				},
				options: options,
			}}
			input_label={input_label}
			input_label_props={{
				className: label_classname,
			}}
			numeric_input_props={getNumericInputProps()}
		/>
	);
};
