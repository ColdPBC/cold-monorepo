import Autocomplete from "@mui/material/Autocomplete";
import {ColdIcon, Input} from "@coldpbc/components";
import {IconNames} from "@coldpbc/enums";
import * as React from "react";


export const AutoComplete = (
  props: {
    options: any[],
    selectedValue: any | null,
    setSelectedValue: (value: { id: string, level: string } | null) => void,
    renderOption: (props: any, option: any) => JSX.Element,
    renderInput: (params: any) => JSX.Element,
  }
) => {
  const { options, selectedValue, setSelectedValue, renderOption, renderInput } = props;
  const [inputValue, setInputValue] = React.useState('');
  const selectedOption = React.useMemo(() => options.find(option => option.id === selectedValue?.id), [options, selectedValue?.id]);

  return (
    <Autocomplete
      id="auto-complete"
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'transparent',
        },
        '& .MuiAutocomplete-input': {
          paddingLeft: '40px !important',
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
        setSelectedValue(newValue);
        setInputValue(newValue ? newValue.name : '');
      }}
      popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
      autoHighlight
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={renderOption}
      renderInput={renderInput}
    />
  )
}
