import React from 'react';
import { Range } from 'react-range';
import { HexColors } from '../../../themes/cold_theme';

export interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue?: number;
  label?: string;
  inputName?: string;
  onChange: (values: number[]) => void;
  title?: string;
}

export const RangeSlider = ({
  min,
  max,
  defaultValue,
  label,
  inputName,
  onChange,
  title,
}: RangeSliderProps) => {
  const getRangeValue = () => {
    if (defaultValue == undefined && defaultValue == null) {
      return [0];
    } else {
      return [defaultValue];
    }
  };

  const getTrackColoring = () => {
    // get the percentage of the slider based on the min and max and the default value
    // the percentage will be used to set the gradient
    // get the default value as a percentage of the min and max
    const percentage = (getRangeValue()[0] - min) / (max - min);
    // convert the percentage to % format
    const percentageString = percentage * 100 + '%';

    return `linear-gradient(to right, ${HexColors.primary['300']} 0%, ${HexColors.primary['300']} ${percentageString}, ${HexColors.bgc.accent} ${percentageString}, ${HexColors.bgc.accent} 100%)`;
  };

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <Range
        min={min}
        max={max}
        values={getRangeValue()}
        onChange={(values) => {
          onChange(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '8px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackColoring(),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={'w-6 h-6 rounded-full border-0 outline-0'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill={HexColors.gray['120']}
                stroke={HexColors.primary['300']}
                strokeWidth="4"
              />
            </svg>
          </div>
        )}
      />
    </div>
  );
};
