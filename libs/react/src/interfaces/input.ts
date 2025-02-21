import { InputTypes } from '@coldpbc/enums';
import {InputHTMLAttributes, LabelHTMLAttributes, MutableRefObject, TextareaHTMLAttributes} from 'react';
import { NumericFormatProps } from 'react-number-format';

export interface IInputProps {
  idx?: number;
  input_props?: BaseInputProps;
  input_label?: string;
  input_label_props?: LabelProps;
  type?: InputTypes;
  container_classname?: string;
  numeric_input_props?: NumericProps;
  textarea_props?: TextAreaProps;
}

export interface NumericProps extends NumericInputProps {
  error?: string;
  showError?: boolean;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showError?: boolean;
  ref?: MutableRefObject<HTMLTextAreaElement | null>;
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
