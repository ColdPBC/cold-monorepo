import React from 'react';
import { RangeSlider } from '../../atoms/rangeSlider/rangeSlider';
import { NumericFormat } from 'react-number-format';

export interface PercentSliderProps {
  tooltip?: string;
  value: null | any;
  onChange: (value: number | null) => void;
}

export const PercentSlider = ({
  tooltip,
  value,
  onChange,
}: PercentSliderProps) => {
  const onRangeChange = (values: number[]) => {
    onChange(values[0]);
  };

  const onInputValueChange = (values: any, sourceInfo: any) => {
    if (values.floatValue === undefined) {
      onChange(null);
    } else {
      onChange(values.floatValue);
    }
  };

  const getInputValue = () => {
    return value;
  };

  const getRangeValue = () => {
    if (value === null) {
      return 0;
    } else {
      return value;
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
        />
        <div className={'grid content-center w-full'}>
          <RangeSlider
            min={0}
            max={100}
            onChange={onRangeChange}
            defaultValue={getRangeValue()}
            title={tooltip}
          />
        </div>
      </div>
    </div>
  );
};
