import React from 'react';
import { IconNames, InputTypes } from '@coldpbc/enums';
import { BaseButton, Input } from '@coldpbc/components';
import { IButtonProps } from '@coldpbc/interfaces';

export interface ListItemInputProps {
	list: Array<string | null>;
	index: number;
	onChange: (value: Array<string | null>) => void;
	input_props?: React.InputHTMLAttributes<HTMLInputElement>;
	buttonProps?: IButtonProps;
	'data-testid'?: string;
}

export const ListItemInput = (props: ListItemInputProps) => {
	const { list, index, onChange, input_props, buttonProps } = props;
	const [value, setValue] = React.useState<string | null>(list[index] || null);

	const removeFromList = () => {
		// remove the item from the list using the index
		const newList = [...list.slice(0, index), ...list.slice(index + 1)];
		onChange(newList);
	};

	const updateCurrentValue = (value: string) => {
		const valueOrNull = value.length > 0 ? value : null;
		if (list.length > 0) {
			// update the current value in the list
			const newList = [...list.slice(0, index), valueOrNull, ...list.slice(index + 1)];
			onChange(newList);
		} else {
			const newList = [valueOrNull];
			onChange(newList);
		}
	};

	return (
		<div className={'flex flex-row w-full'} data-testid={props['data-testid']}>
			<Input
				type={InputTypes.Text}
				input_props={{
					name: 'listInput',
					value: value !== null ? list[index] : undefined,
					onChange: e => updateCurrentValue(e.target.value),
					onValueChange: e => updateCurrentValue(e.target.value),
					'aria-label': 'listInput',
					className: 'w-full',
					...input_props,
				}}
				container_classname={'w-full'}
			/>
			{(list.length > 1 || list[0] !== null) && (
				<BaseButton
					onClick={() => removeFromList()}
					iconRight={IconNames.CloseModalIcon}
					className={'bg-transparent border border-bgc-accent hover:bg-transparent active:bg-transparent w-[72px]'}
					{...buttonProps}
				/>
			)}
		</div>
	);
};
