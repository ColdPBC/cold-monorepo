import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Claims, SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { ColdIcon, DEFAULT_ICON_URL } from '@coldpbc/components';
import { EntityLevel, IconNames } from '@coldpbc/enums';
import { toSentenceCase } from '@coldpbc/lib';
import { HexColors } from '@coldpbc/themes';

const SustainabilityAttributeListItem = (option: SustainabilityAttributeGraphQL | Claims | NoneOption) => (
	<>
		<img className="rounded-lg" loading="lazy" width="48" src={option.logoUrl || DEFAULT_ICON_URL} alt="" />
		<div className="flex flex-col gap-1">
			<span className="text-body text-tc-primary">{option.name}</span>
			{'level' in option && <span className="text-body text-tc-disabled">{toSentenceCase(option.level || '')}</span>}
		</div>
	</>
);

type NoneOption = {
	id: string;
	name: 'None';
	logoUrl?: never;
	level?: never;
};

interface SustainabilityAttributeSelectProps {
	sustainabilityAttributes: Claims[] | SustainabilityAttributeGraphQL[];
	selectedValue: { id: string, level: EntityLevel } | null;
	setSelectedValue: (value: { id: string, level: EntityLevel } | null) => void;
}

export const SustainabilityAttributeSelect: React.FC<SustainabilityAttributeSelectProps> = ({ sustainabilityAttributes, selectedValue, setSelectedValue }) => {
	const [inputValue, setInputValue] = React.useState('');
	const noneOption: NoneOption = React.useMemo(() => ({ id: '', name: 'None' }), []);

	const options: (SustainabilityAttributeGraphQL | Claims | NoneOption)[] = React.useMemo(() => (
    [noneOption, ...sustainabilityAttributes.sort((a, b) => a.name.localeCompare(b.name))]
  ), [noneOption, sustainabilityAttributes]);

	const selectedOption = React.useMemo(() => options.find(option => option.id === selectedValue?.id) || noneOption, [options, selectedValue?.id, noneOption]);

	const showLogoInSelectedState = selectedOption?.logoUrl && inputValue === selectedOption.name;

	return (
		<Autocomplete
			id="sustainability-attribute-select"
			sx={{
				'& .MuiInputBase-root': {
					backgroundColor: 'transparent',
				},
				'& .MuiAutocomplete-input': {
					paddingLeft: showLogoInSelectedState ? '40px !important' : '14px',
				},
				'& .MuiAutocomplete-popupIndicator': {
					padding: '8px',
				},
			}}
			options={options}
			value={selectedOption}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			onChange={(event, newValue) => {
				if (newValue?.id && newValue?.level) {
          setSelectedValue({ id: newValue.id, level: newValue.level });
        } else {
          setSelectedValue(null);
        }
				setInputValue(newValue ? newValue.name : '');
			}}
			popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
			autoHighlight
			getOptionLabel={option => option.name}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px' }} {...optionProps}>
						{SustainabilityAttributeListItem(option)}
					</Box>
				);
			}}
			renderInput={params => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						startAdornment: showLogoInSelectedState && (
							<Box
								sx={{
									position: 'absolute',
									left: 10,
									top: '50%',
									transform: 'translateY(-50%)',
									pointerEvents: 'none',
									display: 'flex',
									alignItems: 'center',
								}}>
								<img className="rounded-sm" loading="lazy" width="32" src={selectedOption.logoUrl!} alt="" style={{ objectFit: 'contain' }} />
							</Box>
						),
					}}
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
	);
};
