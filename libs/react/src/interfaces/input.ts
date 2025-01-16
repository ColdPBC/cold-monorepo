import { InputTypes } from '../enums/inputs';
import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { NumericFormatProps } from 'react-number-format';

export interface IInputProps {
  idx?: number;
  input_props?: BaseInputProps;
  input_label?: string;
  input_label_props?: LabelProps;
  type?: InputTypes;
  container_classname?: string;
  numeric_input_props?: NumericInputProps;
  textarea_props?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options?: Array<InputOption>;
  onValueChange: (value: any) => void;
  value?: any;
  error?: string;
  /**
   * Controls showing the new layout for the input to ensure backward compatibility as this is uses in multiple places
   */
  showError?: boolean;
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
