import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IconNames } from '@coldpbc/enums';
import { BaseButton, ListItemInput } from '@coldpbc/components';
import { forEach } from 'lodash';
import { IButtonProps } from '@coldpbc/interfaces';
import { twMerge } from 'tailwind-merge';

export interface ListItemProps {
	value: string[] | null | undefined;
	onChange: (value: Array<string | null> | null) => void;
	input_props?: React.InputHTMLAttributes<HTMLInputElement>;
	buttonProps?: IButtonProps;
	listClassName?: string;
	className?: string;
	deleteButtonProps?: IButtonProps;
	'data-testid'?: string;
}

// todo: fix delete item that is not the last bug
export const ListItem = (props: ListItemProps) => {
	const { value, onChange, input_props, buttonProps, className, listClassName, deleteButtonProps } = props;
	const [list, setList] = useState<Array<string | null>>(value || [null]);

	const addToList = () => {
		const newList = [...list, null];
		setList(newList);
	};

	const onListInputChange = (value: Array<string | null>) => {
		setList(value);
		// strip the nulls
		const newList = Array<string | null>();
		forEach(value, (item, idx) => {
			newList.push(item);
		});
		onChange(newList.length > 0 ? newList : null);
	};

	const listWithTransition = () => {
		return (
			<TransitionGroup className={listClassName}>
				{list.map((item, idx, list) => {
					return (
						<CSSTransition
							key={idx}
							timeout={200}
							classNames={{
								enter: 'opacity-0',
								enterDone: 'transition-opacity opacity-1 ease-in duration-200',
								exit: 'opacity-1',
								exitActive: 'transition-opacity opacity-0 ease-in duration-200',
							}}>
							<ListItemInput key={idx} index={idx} list={list} onChange={onListInputChange} input_props={input_props} buttonProps={deleteButtonProps} />
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		);
	};

	return (
		<div className={twMerge('flex flex-col w-full', className)}>
			<div className={'flex flex-col w-full gap-[16px]'}>{listWithTransition()}</div>
			<BaseButton
				onClick={() => addToList()}
				iconRight={IconNames.PlusIcon}
				className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent h-[72px] w-full'}
				disabled={list.length > 0 && list[list.length - 1] === null}
				{...buttonProps}
			/>
		</div>
	);
};
