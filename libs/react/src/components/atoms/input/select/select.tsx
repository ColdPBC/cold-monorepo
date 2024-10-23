import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { InputOption } from '../../../../interfaces/input';
import { twMerge } from 'tailwind-merge';

export interface SelectProps {
	options?: Array<InputOption>;
	label?: string;
	name: string;
	value?: any;
	onChange: (value: InputOption) => void;
	className?: string;
	buttonClassName?: string;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export const Select = (props: SelectProps) => {
	const { options, name, label, value, onChange, className, buttonClassName = '' } = props;

	const onListBoxChange = (value: InputOption) => {
		onChange(value);
	};

	const findOption = (value: string, options: InputOption[]) => {
		const option = options.find((option: InputOption) => option.name === value);
		return option || options[0];
	};

	if (!options) {
		return <></>;
	}

	return (
		<Listbox value={findOption(value, options)} onChange={onListBoxChange} name={name}>
			{({ open }) => (
				<div className={twMerge('relative space-y-2', className)}>
					{label && <Listbox.Label className="block text-left text-eyebrow text-tc-primary">{label}</Listbox.Label>}
					<Listbox.Button
						className={twMerge('relative w-full cursor-pointer bg-transparent text-tc-primary text-left text-body p-4 border-[1px] border-bgc-accent rounded-lg', buttonClassName)}>
						<span className="block truncate">{findOption(value, options).name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-bgc-elevated py-1 text-tc-primary text-body shadow-lg focus:outline-none">
							{options.map(option => (
								<Listbox.Option
									key={option.id}
									className={({ active }) => classNames(active ? 'bg-bgc-accent' : 'bg-bgc-elevated', 'relative cursor-pointer select-none p-4 text-body rounded-lg')}
									value={option}>
									{({ active }) => (
										<>
											<span className={classNames(option.name ? 'font-semibold' : 'font-normal', 'block truncate')}>{option.name}</span>

											{option.name ? <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}></span> : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
};
