import { InputTypes } from '../../enums/inputs';
import { InputOption } from '../input';

export interface IFormBuilderProps {
	sections: Array<ISectionProps>;
}

export interface ISectionProps {
	title: string;
	resource_name: string;
	idx?: number;
	description?: string;
	title_classname?: string;
	description_classname?: string;
	fields: Array<SectionFieldProps>;
	user?: any;
}

export interface SectionFieldProps {
	idx?: number;
	name: string;
	input_label?: string;
	type?: InputTypes;
	default_value?: any;
	placeholder?: string;
	input_classname?: string;
	label_classname?: string;
	container_classname?: string;
	options?: Array<InputOption>;
	auto_complete?: string;
}

export interface FormInputProps {
	idx?: number;
	onFieldUpdated: (name: string, value: string | number) => void;
	input_label?: string;
	type?: InputTypes;
	default_value?: any;
	placeholder?: string;
	input_classname?: string;
	label_classname?: string;
	container_classname?: string;
	options?: Array<InputOption>;
	name: string;
	value?: any;
	auto_complete?: string;
}
