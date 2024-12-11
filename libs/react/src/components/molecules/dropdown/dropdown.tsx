import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ColdIcon } from '../../atoms';
import { IconNames } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';

export interface DropdownProps {
  options: {
    value: string;
    label: string;
  }[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
  optionClassName?: string;
  containerClassName?: string;
  'data-testid'?: string;

}

export const Dropdown = (props: DropdownProps) => {
  return (
    <Listbox
      value={props.options.find(option => option.value === props.selected)}
      onChange={option => {
        props.onSelect(option.value);
      }}
      data-testid={props['data-testid']}
    >
      <div className={twMerge('relative w-auto mt-1', props.containerClassName)}>
        <Listbox.Button
          className="relative w-full flex flex-row justify-between cursor-default rounded-lg bg-transparent p-[12px] text-left text-tc-secondary text-body border-[1.5px] border-bgc-accent active:border-primary focus:ring-0 focus:shadow-none"
          data-testid={`button_${props['data-testid']}`}
        >
          <span className="block truncate">{props.options.find(option => option.value === props.selected)?.label}</span>
          <span className="pointer-events-none flex items-center p-[8px] w-[24px] h-[24px]">
            <ColdIcon name={IconNames.ColdChevronDownIcon} />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-bgc-elevated py-1 text-body text-tc-secondary border-[1.5px] border-bgc-accent z-10 focus:ring-0">
            {props.options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) => `relative cursor-pointer select-none p-[12px] border-[0] text-left hover:bg-bgc-accent`}
                value={option}
                data-testid={`option_${index}_${props['data-testid']}`}
              >
                {({ selected }) => <span className={`block truncate`}>{option.label}</span>}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
