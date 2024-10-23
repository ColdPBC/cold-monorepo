import React from 'react';
import { FormSection } from '../formSection/formSection';
import { IFormBuilderProps } from '../../../interfaces/form/form';

export function Form(props: IFormBuilderProps) {
	return (
		<div className="container mx-auto sm:px-6 lg:px-8">
			{props.sections.map((section, idx) => {
				const _section = Object.assign({ idx }, section);
				return <FormSection key={`section_${section.resource_name}_${idx}`} {...section} />;
			})}
		</div>
	);
}

export default Form;
