import { PropsWithChildren } from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdInvertedCheckmarkIcon = (props: PropsWithChildren<IconProps>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none" {...props}>
      <circle cx="6" cy="6.5" r="6" fill={props.color || 'white'} />
      <path d="M4 6.50033L5.33333 7.83366L8 5.16699" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
