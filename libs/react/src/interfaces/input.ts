import { InputTypes } from '@coldpbc/enums';
import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { NumericFormatProps } from 'react-number-format';
import { TextareaProps } from 'flowbite-react';

export interface IInputProps {
  idx?: number;
  input_props: BaseInputProps;
  input_label?: string;
  input_label_props?: LabelProps;
  type?: InputTypes;
  container_classname?: string;
  numeric_input_props?: NumericInputProps;
  textarea_props?: TextareaProps;
}

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options?: Array<InputOption>;
  onValueChange: (value: any) => void;
  value?: any;
  error?: string;
}

export type NumericInputProps = NumericFormatProps;

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  key?: string;
}

export interface InputOption {
  id: number;
  value: string;
  name: string;
}
