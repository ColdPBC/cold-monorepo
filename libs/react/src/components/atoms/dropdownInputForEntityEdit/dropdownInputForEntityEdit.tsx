import { ComboBox } from '@coldpbc/components';
import React, { ReactNode, useMemo } from 'react';

interface DropdownInputForEntityEditProps<T> {
	fieldName: keyof T;
	label: string | ReactNode;
	options: { id: string; name: string }[];
	setEntityState: (state: T) => void;
	entityState: T;
  originalEntity: T;
  allowNone?: boolean;
	required?: boolean;
}

export const DropdownInputForEntityEdit = <T,>({
	fieldName,
	label,
	options,
	setEntityState,
	entityState,
  originalEntity,
  allowNone = false,
	required = false
}: DropdownInputForEntityEditProps<T>) => {
  const dropdownOptions = useMemo(() => {
    const noneOption = { id: -1, value: '', name: 'None' };
    const defaultOption = { id: -1, value: '', name: 'Select an option' };

    const formattedOptions = options
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(((option, index) => ({
        id: index,
        value: option.id,
        name: option.name,
      })));

    if (allowNone) {
      return [noneOption, ...formattedOptions];
    } else if (!originalEntity[fieldName]) {
      return [defaultOption, ...formattedOptions];
    } else {
      return formattedOptions;
    }
  }, [allowNone, originalEntity, fieldName, options]);

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
            value={dropdownOptions.find(option => {
              const fieldValue = entityState[fieldName] as { id: string };
              return option.value === fieldValue?.id;
            }) ?? dropdownOptions[0]}
            name={`${String(fieldName)}-select`}
            onChange={(selectedOption) => {
              if (entityState) {
                setEntityState({
                  ...entityState,
                  [fieldName]: selectedOption.value ? { id: selectedOption.value, name: selectedOption.name } : null,
                });
              }
            }}
          />
        </div>
			</div>
		</div>
	);
};
