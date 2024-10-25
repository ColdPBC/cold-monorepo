import { IconProps } from '../../../interfaces/icons/iconProps';
import React from 'react';

export const ColdReportIcon = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        fill="none"
        clipRule="evenodd"
        stroke={props.color || 'white'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.778 3H18.222C19.204 3 20 3.895 20 5V19C20 20.105 19.204 21 18.222 21H5.778C4.796 21 4 20.105 4 19V5C4 3.895 4.796 3 5.778 3Z"
      />
      <path fill="none" stroke={props.color || 'white'} strokeLinecap="round" strokeLinejoin="round" d="M8 13.5H16" />
      <path fill="none" stroke={props.color || 'white'} strokeLinecap="round" strokeLinejoin="round" d="M8 17H12" />
      <path fill="none" stroke={props.color || 'white'} strokeLinecap="round" strokeLinejoin="round" d="M16 8V10H14" />
      <path fill="none" stroke={props.color || 'white'} strokeLinecap="round" strokeLinejoin="round" d="M16 10L13 7L10.286 9L8 7" />
    </svg>
  );
};
