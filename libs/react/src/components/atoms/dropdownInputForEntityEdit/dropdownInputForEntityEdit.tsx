import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { ReactNode, useMemo } from 'react';
import { use } from 'dd-trace';
import { get } from 'lodash';

interface DropdownInputForEntityEditProps<T> {
	fieldName: keyof T;
	label: string | ReactNode;
	options: { id: string; name: string }[];
	setEntityState: (state: T) => void;
	entityState: T;
  allowNone?: boolean;
	required?: boolean;
}

export const DropdownInputForEntityEdit = <T,>({
	fieldName,
	label,
	options,
	setEntityState,
	entityState,
  allowNone = false,
	required = false
}: DropdownInputForEntityEditProps<T>) => {
  const noneOption = { value: '', label: 'None' };
  const defaultValue = allowNone ? noneOption : undefined;
  const dropdownOptions = useMemo(() => {
    const formattedOptions = options
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(classification => ({
        value: classification.id,
        label: classification.name,
      }));

    if (allowNone) {
      return [noneOption, ...formattedOptions];
    } else {
      return formattedOptions;
    }

  }, [options]);



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
				<Autocomplete
					fullWidth
					disableClearable
					id={`${String(fieldName)}-select`}
					sx={{
						'& .MuiInputBase-root': {
							backgroundColor: 'transparent',
						},
						'& .MuiAutocomplete-popupIndicator': {
							padding: '8px',
						},
					}}
					options={dropdownOptions}
					value={
						entityState[fieldName]
							? {
									value: entityState[fieldName]['id'],
									label: entityState[fieldName]['name'],
							  }
							: defaultValue
					}
					onChange={(_event, newValue) => {
						if (entityState && newValue) {
							setEntityState({
								...entityState,
								[fieldName]: { id: newValue.value, name: newValue.label },
							});
						}
					}}
					popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
					autoHighlight
					getOptionLabel={option => option.label}
					isOptionEqualToValue={(option, value) => option.value === value.value}
					renderOption={(props, option) => {
						const { key, ...optionProps } = props;
						return (
							<Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px' }} {...optionProps}>
								<span className="text-body text-tc-primary">{option.label}</span>
							</Box>
						);
					}}
					renderInput={params => (
						<TextField
							{...params}
							sx={{
								'& .MuiInputBase-input': {
									backgroundColor: 'transparent',
									fontFamily: 'Inter',
									fontSize: '14px',
									padding: '16px',
									borderBottomLeftRadius: '8px',
									borderTopLeftRadius: '8px',
								},
								'& .MuiOutlinedInput-notchedOutline': {
									borderRadius: '8px',
									borderColor: HexColors.gray['90'],
									borderWidth: '1.5px',
								},
								'&  .MuiOutlinedInput-root': {
									borderRadius: '8px',
									'&:hover fieldset': {
										borderColor: HexColors.gray['90'],
										borderWidth: '1.5px',
									},
									'&:focus-within fieldset': {
										borderColor: HexColors.gray['90'],
										borderWidth: '1.5px',
									},
								},
								'& .MuiOutlinedInput-input:focus': {
									outline: 'none',
									boxShadow: 'none',
								},
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};
