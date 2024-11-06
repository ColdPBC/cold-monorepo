import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Claims, SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { DEFAULT_ICON_URL } from '@coldpbc/components';
import { toSentenceCase } from '@coldpbc/lib';
import { HexColors } from '@coldpbc/themes';

const SustainabilityAttributeListItem = (option: SustainabilityAttributeGraphQL | Claims | NoneOption) => (
	<>
		<img loading="lazy" width="48" src={option.logoUrl || DEFAULT_ICON_URL} alt="" />
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
	allowNone: boolean;
	selectedValueId: string | null; // This is the ID of the selected attribute
	setSelectedValueId: (value: string | null) => void; // Callback with the selected ID
}

export const SustainabilityAttributeSelect: React.FC<SustainabilityAttributeSelectProps> = ({ sustainabilityAttributes, allowNone, selectedValueId, setSelectedValueId }) => {
  const noneOption: NoneOption = { id: '', name: 'None' }
  const options: (SustainabilityAttributeGraphQL | Claims | NoneOption)[] = React.useMemo(() => {
		const allOptions: (SustainabilityAttributeGraphQL | Claims | NoneOption)[] = [...sustainabilityAttributes.sort((a,b) => a.name.localeCompare(b.name))];
		if (allowNone) {
			allOptions.unshift(noneOption);
		}
		return allOptions;
	}, [allowNone, sustainabilityAttributes]);

	// Find the currently selected option object based on the selectedValue ID
	const selectedOption = React.useMemo(() => options.find(option => option.id === selectedValueId) || noneOption, [options, selectedValueId]);

	return (
		<Autocomplete
			id="sustainability-attribute-select"
			sx={{
				'& .MuiInputBase-root': {
					backgroundColor: 'transparent',
				},
				'& .MuiAutocomplete-input': {
					paddingLeft: selectedOption?.logoUrl ? '40px !important' : '14px',
				},
			}}
			options={options}
			value={selectedOption}
			onChange={(event, newValue) => {
				setSelectedValueId(newValue ? newValue.id : null);
			}}
			autoHighlight
			getOptionLabel={option => option.name}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px', }} {...optionProps}>
						{SustainabilityAttributeListItem(option)}
					</Box>
				);
			}}
			renderInput={params => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						startAdornment: selectedOption?.logoUrl && (
							<Box
								sx={{
									position: 'absolute',
									left: 8,
									top: '50%',
									transform: 'translateY(-50%)',
									pointerEvents: 'none',
									display: 'flex',
									alignItems: 'center',
								}}>
								<img loading="lazy" width="32" src={selectedOption.logoUrl} alt="" style={{ objectFit: 'contain' }} />
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
