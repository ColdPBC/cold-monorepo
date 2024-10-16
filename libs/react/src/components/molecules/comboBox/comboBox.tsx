import {Combobox, Transition} from '@headlessui/react';
import {InputOption} from "@coldpbc/interfaces";
import {SelectProps} from "@coldpbc/components";
import React, {Fragment, useEffect, useState} from "react";
import {clsx} from "clsx";
import {ChevronUpDownIcon} from '@heroicons/react/20/solid';
import {isEqual} from "lodash";

export interface ComboBoxProps extends SelectProps {
  options: Array<InputOption>;
  value: InputOption;
  dropdownDirection?: 'down' | 'up'; // undefined will implicitly default to down
  id?: string;
}

export const ComboBox = (props: ComboBoxProps) => {
  const { options, name, label, value, onChange, className, buttonClassName = '', dropdownDirection, id } = props;

  const [query, setQuery] = useState('')
  const [tempOption, setTempOption] = useState<InputOption>(value)
  const [selectedOption, setSelectedOption] = useState<InputOption | null>(value)

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
    } else {
      onChange(tempOption)
    }
  }

  return (
		<Combobox
			value={selectedOption}
			onChange={onValueChange}
			name={name}
      nullable={true}
    >
			<div className="relative" data-testid={name}>
				<Combobox.Button className="relative w-full border-[1.5px] border-gray-90 rounded-[8px] cursor-pointer p-0 flex justify-between items-center" as={'div'}>
					<Combobox.Input
						className="w-full bg-transparent border-none text-tc-primary p-4 text-left text-body focus:border-none focus:ring-0"
						onChange={event => setQuery(event.target.value)}
						displayValue={(option: InputOption | null) => {
              return option ? option.name : ''
            }}
            onClick={handleInputClick}
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
            `}>
						{filteredOptions.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none p-4 text-white">Nothing found.</div>
						) : (
							filteredOptions.map(option => (
								<Combobox.Option
									key={option.id}
									className={({ active }) => clsx(active ? 'bg-bgc-accent' : 'bg-bgc-elevated', 'relative cursor-pointer select-none p-4 text-body rounded-lg')}
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
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
}
