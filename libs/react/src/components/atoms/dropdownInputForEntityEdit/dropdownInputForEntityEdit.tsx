import { ComboBox } from '@coldpbc/components';
import React, { ReactNode, useMemo } from 'react';

type EntityOption = { id: string; name: string };
type ValueOption = { value: number };

type BaseProps<T> = {
	fieldName: keyof T;
	fieldType?: 'object' | 'value';
	label: string | ReactNode;
	setEntityState: (state: T) => void;
	entityState: T;
	setError: (error?: string) => void;
	error?: string;
	originalEntity: T;
	allowNone?: boolean;
	required?: boolean;
	disabled?: boolean;
	disabledMessage?: string;
};

type ObjectProps<T> = BaseProps<T> & {
	fieldType: 'object';
	options: EntityOption[];
};

type ValueProps<T> = BaseProps<T> & {
	fieldType: 'value';
	options: ValueOption[];
};

type DropdownInputProps<T> = ObjectProps<T> | ValueProps<T>;

export const DropdownInputForEntityEdit = <T,>({
	fieldName,
	label,
	options,
	setEntityState,
	entityState,
	error,
	setError,
	originalEntity,
	allowNone = false,
	required = false,
	fieldType = 'object',
	disabled = false,
	disabledMessage = '',
}: DropdownInputProps<T>) => {
	const dropdownOptions = useMemo(() => {
		const noneOption = { id: -1, value: '', name: 'None' };
		const defaultOption = { id: -1, value: '', name: 'Select an option' };

		const formattedOptions = options
			.map((option, index) => ({
				id: index,
				value: fieldType === 'object' ? (option as EntityOption).id || (option as EntityOption).name : String((option as ValueOption).value),
				name: fieldType === 'object' ? (option as EntityOption).name : String((option as ValueOption).value),
			}))
			.sort((a, b) => a.name.localeCompare(b.name));

		if (allowNone) {
			return [noneOption, ...formattedOptions];
		} else if (!originalEntity[fieldName]) {
			return [defaultOption, ...formattedOptions];
		} else {
			return formattedOptions;
		}
	}, [allowNone, originalEntity, fieldName, options, fieldType]);

	return (
		<div className={'flex flex-col w-full h-full justify-between gap-4'}>
			<div className="w-full h-fit flex flex-col gap-2 items-start">
				<div className={'text-eyebrow text-tc-primary'}>
					<div className={'flex items-center justify-start gap-1'}>
						<span>
							{label}
							{required ? ' *' : ''}
						</span>
					</div>
				</div>
				<div className={'w-full'}>
					<ComboBox
						options={dropdownOptions}
						value={
							dropdownOptions.find(option => {
								if (fieldType === 'object') {
									const fieldValue = entityState[fieldName] as { id: string } | null;
									return option.value === fieldValue?.id;
								} else {
									return option.value === String(entityState[fieldName]);
								}
							}) ?? dropdownOptions[0]
						}
						name={`${String(fieldName)}-select`}
						onChange={selectedOption => {
							if (required && selectedOption.value === '') {
								setError(`${label} is required`);
							}
							if (entityState) {
								if (fieldType === 'object') {
									// e.g. MaterialClassification, Supplier
									setEntityState({
										...entityState,
										[fieldName]: selectedOption.value ? { id: selectedOption.value, name: selectedOption.name } : null,
									});
								} else {
									setEntityState({
										// e.g. Supplier Tier
										...entityState,
										[fieldName]: parseInt(selectedOption.value),
									});
								}
							}
						}}
						buttonClassName={error ? 'border-red-100' : ''}
						disabled={disabled}
					/>
					{required && error && <div className="text-red-100 text-eyebrow mt-[8px]">{error}</div>}
					{disabled && disabledMessage && <div className="text-tc-disabled text-eyebrow mt-[8px]">{disabledMessage}</div>}
				</div>
			</div>
		</div>
	);
};
