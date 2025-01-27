import {Combobox, Transition} from '@headlessui/react';
import {InputOption} from "@coldpbc/interfaces";
import {SelectProps} from "@coldpbc/components";
import React, {Fragment, useEffect, useState} from "react";
import {clsx} from "clsx";
import {ChevronUpDownIcon} from '@heroicons/react/20/solid';
import {isEqual} from "lodash";
import { twMerge } from 'tailwind-merge';

export interface ComboBoxProps extends SelectProps {
  options: Array<InputOption>;
  value: InputOption;
  dropdownDirection?: 'down' | 'up'; // undefined will implicitly default to down
  id?: string;
  buttonClassName?: string;
  disabled?: boolean;
  allowAddNewOption?: boolean;
  onAddNewOption?: (newOption: InputOption) => void;
}

export const ComboBox = (props: ComboBoxProps) => {
  const {
    options,
    name,
    label,
    value,
    onChange,
    className,
    buttonClassName = '',
    dropdownDirection,
    id,
    disabled = false,
    allowAddNewOption = false,
    onAddNewOption = (value: InputOption) => {},
  } = props;

  const [query, setQuery] = useState('')
  const [tempOption, setTempOption] = useState<InputOption>(value)
  const [selectedOption, setSelectedOption] = useState<InputOption | null>(value)
  const [newOption, setNewOption] = useState<InputOption | null>(null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option.name.toLowerCase().includes(query.toLowerCase())
      })

  const handleInputClick = () => {
    setTempOption(value)
    setSelectedOption(null)
  }

  const onValueChange = (value: InputOption | null) => {
    if(isEqual(value, selectedOption)) {
      return
    }

    if(value) {
      setSelectedOption(value)
      setTempOption(value)
      onChange(value)
      // call on add new option if the value is not in the options list. i.e. its new
      if (onAddNewOption && !options.some(option => option.value.toLowerCase() === value.value.toLowerCase())) {
        onAddNewOption(value);
      }
    } else {
      onChange(tempOption)
    }
  }

  useEffect(() => {
    if (query && !filteredOptions.some(option => option.name.toLowerCase() === query.toLowerCase())) {
      setNewOption({ id: options.length, name: query, value: query });
    } else {
      setNewOption(null);
    }
  }, [query]);


  const handleAddNewOption = (option: InputOption) => {
    if (onAddNewOption) {
      onAddNewOption(option);
    }
    setSelectedOption(option);
    setTempOption(option);
    onChange(option);
  };

  return (
		<Combobox
			value={selectedOption}
			onChange={onValueChange}
			name={name}
      nullable={true}
      disabled={disabled}
    >
			<div className="relative" data-testid={name}>
				<Combobox.Button
          className={
          twMerge(
            "relative w-full border-[1.5px] border-gray-90 rounded-[8px] cursor-pointer p-0 flex justify-between items-center",
            buttonClassName
          )} as={'div'}>
					<Combobox.Input
						className="w-full bg-transparent border-none text-tc-primary p-4 text-left text-body focus:border-none focus:ring-0"
						onChange={event => setQuery(event.target.value)}
						displayValue={(option: InputOption | null) => {
              return option ? option.name : ''
            }}
            onClick={handleInputClick}
            data-testid={name + '_input'}
					/>
					<div className={'pr-2'}>
						<ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
					</div>
				</Combobox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => {
						setQuery('');
            setSelectedOption(tempOption)
					}}>
					<Combobox.Options
						className={`
              ${dropdownDirection === 'up' ? 'bottom-full' : ''}
              absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-bgc-elevated py-1 text-tc-primary text-body shadow-lg focus:outline-none
            `}
            data-testid={name + '_options'}
          >
						{filteredOptions.length === 0 && query !== '' && !allowAddNewOption ? (
							<div className="relative cursor-default select-none p-4 text-white">
                Nothing found.
              </div>
						) : (
							filteredOptions.map(option => (
								<Combobox.Option
									key={option.id}
									className={({ active }) => clsx(active ? 'bg-bgc-accent' : 'bg-bgc-elevated', 'relative cursor-pointer select-none p-4 text-body rounded-lg min-h-[53px]')}
									value={option}>
									{({ active }) => (
										<>
											<span data-testid={`option_${option.id}`} className={clsx(option.name ? 'font-semibold' : 'font-normal', 'block truncate')}>
												{option.name}
											</span>

											{option.name ? <span className={clsx(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}></span> : null}
										</>
									)}
								</Combobox.Option>
							))
						)}
            {allowAddNewOption && newOption && (
              <Combobox.Option
                key={newOption.id}
                className={({ active }) => clsx(active ? 'bg-bgc-accent' : 'bg-bgc-elevated', 'relative cursor-pointer select-none p-4 text-body rounded-lg min-h-[53px]')}
                value={newOption}
                onClick={() => handleAddNewOption(newOption)}>
                {({ active }) => (
                  <>
                    <span data-testid={`option_${newOption.id}`} className={clsx(newOption.name ? 'font-semibold' : 'font-normal', 'block truncate')}>
                      Add "{newOption.name}"
                    </span>
                    {newOption.name ? <span className={clsx(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}></span> : null}
                  </>
                )}
              </Combobox.Option>
            )}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
}
