import React from 'react';
import { RangeSlider } from '../../atoms/rangeSlider/rangeSlider';
import { NumericFormat } from 'react-number-format';

export interface PercentSliderProps {
	tooltip?: string;
	value: null | any;
	onChange: (value: number | null) => void;
	'data-testid'?: string;
}

export const PercentSlider = (props: PercentSliderProps) => {
	const { tooltip, value, onChange } = props;
	const [inputValue, setInputValue] = React.useState<any | null>(value);

	const onRangeChange = (values: number[]) => {
		setInputValue(values[0]);
		onChange(values[0]);
	};

	const onInputValueChange = (values: any, sourceInfo: any) => {
		if (values.floatValue === undefined) {
			setInputValue(null);
			onChange(null);
		} else {
			setInputValue(values.floatValue);
			onChange(values.floatValue);
		}
	};

	const getInputValue = () => {
		let formattedValue = inputValue === null ? '' : inputValue;
		formattedValue = parseInt(formattedValue);
		if (isNaN(formattedValue)) {
			formattedValue = null;
		} else {
			if (formattedValue > 100) {
				formattedValue = 100;
			} else if (formattedValue < 0) {
				formattedValue = 0;
			}
		}
		return formattedValue;
	};

	const getRangeValue = () => {
		if (inputValue === null) {
			return 0;
		} else {
			let formattedValue = inputValue;
			formattedValue = parseInt(formattedValue);
			if (isNaN(formattedValue)) {
				formattedValue = null;
			} else {
				if (formattedValue > 100) {
					formattedValue = 100;
				} else if (formattedValue < 0) {
					formattedValue = 0;
				}
			}
			return formattedValue;
		}
	};

	return (
		<div className={'w-full space-y-2 text-tc-primary'}>
			<div className={'flex w-full'}>
				<span className={'text-xs not-italic font-medium'}>Enter %</span>
			</div>
			<div className={'flex w-full space-x-[24px] justify-between'}>
				<NumericFormat
					value={getInputValue()}
					onValueChange={onInputValueChange}
					className={
						'w-[56px] h-[56px]  rounded-lg py-4 text-sm text-center font-bold not-italic bg-transparent border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0'
					}
					allowNegative={false}
					data-testid={props['data-testid']}
					max={100}
					min={0}
				/>
				<div className={'grid content-center w-full'}>
					<RangeSlider min={0} max={100} onChange={onRangeChange} defaultValue={getRangeValue()} title={tooltip} />
				</div>
			</div>
		</div>
	);
};
