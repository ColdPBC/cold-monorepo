import React from 'react';
import { isArray, isEqual } from 'lodash';

export interface SelectOptionProps {
	options: string[];
	onChange: (value: any) => void;
	value: string[] | null | undefined;
	isMultiSelect?: boolean;
	'data-testid'?: string;
}

export const SelectOption = (props: SelectOptionProps) => {
	const { options, onChange, value, isMultiSelect = false } = props;

	let vertical = true;

	if (options.length > 4) {
		vertical = false;
	}

	const onOptionClick = (index: number) => {
		if (isMultiSelect) {
			if (value === undefined || value === null) {
				onChange([options[index]]);
			} else {
				if (Array.isArray(value)) {
					if (value.includes(options[index])) {
						const newValues = value.filter(value => value !== options[index]);
						if (newValues.length === 0) {
							onChange(null);
						} else {
							onChange(newValues);
						}
					} else {
						onChange([...value, options[index]]);
					}
				} else {
					onChange([options[index]]);
				}
			}
		} else {
			if (value === undefined || value === null) {
				onChange([options[index]]);
			} else {
				if (isArray(value) && isEqual(value[0], options[index])) {
					onChange(null);
				} else {
					onChange([options[index]]);
				}
			}
		}
	};

	const getClassName = (index: number) => {
		let className = 'whitespace-normal text-sm not-italic font-semibold text-center text-tc-primary cursor-pointer';

		if (vertical) {
			className += ' p-2';
		} else {
			className += ' min-h-[104px] shortScreen:min-h-0 py-16 px-8 shortScreen:p-4 shortWideScreen:py-16 shortWideScreen:px-8';
		}

		if (isMultiSelect) {
			if (value !== null && value !== undefined && isArray(value) && value.includes(options[index])) {
				className += ' rounded-lg bg-primary-300 hover:bg-primary-200 grid grid-cols-1 place-content-center';
			} else {
				className += ' rounded-lg bg-bgc-accent hover:bg-gray-50 grid grid-cols-1 place-content-center';
			}
		} else {
			if (value !== null && value !== undefined && isArray(value) && isEqual(value[0], options[index])) {
				className += ' rounded-lg bg-primary-300 hover:bg-primary-200 grid grid-cols-1 place-content-center';
			} else {
				className += ' rounded-lg bg-bgc-accent hover:bg-gray-50 grid grid-cols-1 place-content-center';
			}
		}
		return className;
	};

	if (vertical) {
		return (
			<div className={'w-full'} data-testid={props['data-testid']}>
				{isMultiSelect && <div className={'text-left text-xs not-italic font-normal text-tc-primary mb-2'}>Select all that apply</div>}
				<div className={'w-full space-y-4'}>
					{options.map((option, index) => {
						return (
							<div key={`select_option_${index}`} className={getClassName(index)} id={index.toString()} onClick={() => onOptionClick(index)}>
								{option}
							</div>
						);
					})}
				</div>
			</div>
		);
	} else {
		return (
			<div className={'w-full'} data-testid={props['data-testid']}>
				{isMultiSelect && <div className={'text-left text-xs not-italic font-normal text-tc-primary mb-2'}>Select all that apply</div>}
				<div className={'w-full grid grid-cols-2 gap-4'}>
					{options.map((option, index) => {
						return (
							<div key={`select_option_${index}`} className={getClassName(index)} id={index.toString()} onClick={() => onOptionClick(index)}>
								{option}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
};
