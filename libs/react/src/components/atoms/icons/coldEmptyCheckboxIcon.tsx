import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdEmptyCheckboxIcon = (props: IconProps) => {
  const className = props.className
    ? props.className
    : 'hover:stroke-cold-starkWhite hover:fill-cold-starkWhite stroke-cold-limestone fill-cold-limestone';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      className={className}
    >
      <circle cx="13.5" cy="13" r="12" stroke="#282C3E" strokeWidth="1.5" />
    </svg>
  );
};
