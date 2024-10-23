import { get, isArray, isEqual } from 'lodash';
import React, { ReactNode } from 'react';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon } from '@coldpbc/components';

export interface QuestionnaireSelectProps {
	options: string[];
	onChange: (value: any) => void;
	value: string[] | null | undefined;
	isMultiSelect?: boolean;
	'data-testid'?: string;
	answer_score_map?: {
		[key: string]: number;
	};
}

export const QuestionnaireSelect = (props: QuestionnaireSelectProps) => {
	const { options, onChange, value, isMultiSelect = false, answer_score_map } = props;

	const onOptionClick = (index: number) => {
		if (isMultiSelect) {
			if (value === undefined || value === null) {
				onChange([options[index]]);
			} else {
				if (Array.isArray(value)) {
					if (value.includes(options[index])) {
						const newValues = value.filter(value => value !== options[index]);
						if (newValues.length === 0) {
							onChange(null);
						} else {
							onChange(newValues);
						}
					} else {
						onChange([...value, options[index]]);
					}
				} else {
					onChange([options[index]]);
				}
			}
		} else {
			if (value === undefined || value === null) {
				onChange([options[index]]);
			} else {
				if (isArray(value) && isEqual(value[0], options[index])) {
					onChange(null);
				} else {
					onChange([options[index]]);
				}
			}
		}
	};

	const getClassName = (index: number) => {
		let className = 'w-full flex flex-row justify-start gap-[16px] items-center p-[16px] text-body text-tc-primary font-bold cursor-pointer';

		if (isMultiSelect) {
			className += ' rounded-[8px] hover:bg-gray-60';
			if (value !== null && value !== undefined && isArray(value) && value.includes(options[index])) {
				className += ' bg-gray-60 border-[1px] border-white';
			} else {
				className += ' bg-transparent border-[1px] border-gray-60';
			}
		} else {
			className += ' rounded-[400px] hover:bg-gray-60';
			if (value !== null && value !== undefined && isArray(value) && value.includes(options[index])) {
				className += ' bg-gray-60 border-[1px] border-white';
			} else {
				className += ' bg-transparent border-[1px] border-gray-60';
			}
		}
		return className;
	};

	const getSelectBox = (index: number) => {
		let className = '';
		let inner: ReactNode;

		if (isMultiSelect) {
			className = 'w-[24px] h-[24px] rounded-[4px]';
			if (value !== null && value !== undefined && isArray(value) && value.includes(options[index])) {
				inner = (
					<div className={'w-full h-full rounded-[4px] bg-primary z-0 flex justify-center items-center'}>
						<ColdIcon name={IconNames.ColdCheckIcon} color={'white'} width={20} height={20} className={'z-10'} />
					</div>
				);
			} else {
				className += ' border-2 border-white';
			}
		} else {
			className = 'w-[24px] h-[24px] rounded-full border-2 border-white';
			if (value !== null && value !== undefined && isArray(value) && isEqual(value[0], options[index])) {
				inner = <div className={'w-full h-full bg-primary rounded-full'}></div>;
			}
		}
		return <div className={className}>{inner}</div>;
	};

	const getOptionScore = (index: number) => {
		if (answer_score_map) {
			const option = get(answer_score_map, options[index], undefined);
			if (option && option > 0) {
				return option;
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

	const showScore = (index: number) => {
		return getOptionScore(index) !== null;
	};

	return (
		<div className={'w-full'} data-testid={props['data-testid']}>
			<div className={'w-full space-y-4'}>
				{options.map((option, index) => {
					return (
						<div key={`select_option_${index}`} className={getClassName(index)} id={index.toString()} onClick={() => onOptionClick(index)}>
							{getSelectBox(index)}
							<div className={'w-full'}>{option}</div>
							{showScore(index) && <div className={'w-auto h-full text-body'}>+{getOptionScore(index)?.toFixed(2)}</div>}
						</div>
					);
				})}
			</div>
		</div>
	);
};
