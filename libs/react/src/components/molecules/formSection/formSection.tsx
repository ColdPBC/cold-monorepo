import React, { useState } from 'react';
import { ISectionProps } from '../../../interfaces/form/form';
import { BaseButton } from '../../atoms/button/button';
import { ColorNames } from '../../../enums/colors';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { FormInput } from '../formInput/formInput';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

function _FormSection(props: ISectionProps) {
	const [sectionData, setSectionData] = useState<Record<string, any>>(props.fields.reduce((obj, item) => Object.assign(obj, { [item.name]: item.default_value || '' }), {}));

	const handleFieldUpdated = async (name: string, value: any) => {
		setSectionData({
			...sectionData,
			[name]: value,
		});
	};

	const saveSectionData = async (event: any) => {
		event.preventDefault(); // 👈️ prevent page refresh

		await axiosFetcher([`/resources/${props.resource_name}`, 'POST', JSON.stringify(sectionData)]);
	};

	return (
		<div data-testid={`form_container_${props.idx}`} className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
			<div data-testid={`form_container_title_${props.idx}`} className="px-4 sm:px-0">
				<h2 className={props.title_classname || 'text-base font-semibold leading-7 text-gray-900'}>{props.title}</h2>
				<p data-testid={`form_container_description_${props.idx}`} className={props.description_classname || 'mt-1 text-sm leading-6 text-gray-600'}>
					{props.description}
				</p>
			</div>
			<form data-testid={`form_${props.idx}`} className="border border-bgc-accent bg-transparent shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
				<div key={`form_container_field_group_${props.idx}`} className="px-4 py-6 sm:p-8">
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{props.fields.map((field, idx) => {
							const _field = Object.assign({ idx }, field);
							return <FormInput key={`field_${field.name}_${idx}`} onFieldUpdated={handleFieldUpdated} value={sectionData[field.name]} {..._field} />;
						})}
					</div>
				</div>
				<div key={`form_container_button_group_${props.idx}`} className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
					<BaseButton key={`save_${props.idx}`} type="submit" onSubmit={saveSectionData} onClick={saveSectionData} color={ColorNames.skyBlue} label={'Save'} />
				</div>
			</form>
		</div>
	);
}

export const FormSection = withErrorBoundary(_FormSection, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in FormSection: ', error);
	},
});
