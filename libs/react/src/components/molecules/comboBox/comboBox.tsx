import {Combobox, Transition} from '@headlessui/react';
import {InputOption} from "@coldpbc/interfaces";
import {SelectProps} from "@coldpbc/components";
import React, {Fragment, useState} from "react";
import {clsx} from "clsx";
import {ChevronUpDownIcon} from '@heroicons/react/20/solid';

export interface ComboBoxProps extends SelectProps {
  options: Array<InputOption>;
  value: string;
}

export const ComboBox = (props: ComboBoxProps) => {
  const { options, name, label, value, onChange, className, buttonClassName = '' } = props;

  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option.name.toLowerCase().includes(query.toLowerCase())
      })

  const onListBoxChange = (value: InputOption) => {
    console.log(value)
    onChange(value);
  };

  const findOption = (value: string, options: InputOption[]) => {
    const option = options.find((option: InputOption) => option.value === value);
    return option || options[0];
  };

  return (
      <Combobox value={findOption(value, options)} onChange={onListBoxChange}>
        <div className="relative mt-1">
          <div className="relative w-full border-[1.5px] border-gray-90 rounded-[8px] cursor-pointer p-4 pr-8">
            <Combobox.Input
              className="w-full bg-transparent border-transparent text-tc-primary p-0 text-left text-body focus:border focus:border-transparent focus:ring-0"
              displayValue={(option: InputOption) => option.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-bgc-elevated py-1 text-tc-primary text-body shadow-lg focus:outline-none">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none p-4 text-white">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) => clsx(active ? 'bg-bgc-accent' : 'bg-bgc-elevated', 'relative cursor-pointer select-none p-4 text-body rounded-lg')}
                    value={option}
                  >
                    {({ active }) => (
                      <>
                        <span className={clsx(option.name ? 'font-semibold' : 'font-normal', 'block truncate')}>{option.name}</span>

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
  )
}
