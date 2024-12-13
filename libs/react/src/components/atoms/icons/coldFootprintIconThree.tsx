import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdFootprintIconThree = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="9" width="6" height="6" rx="3" fill={props.color || 'white'} />
      <path
        d="M10.5 5.5C10.5 4.67157 11.1716 4 12 4C12.8284 4 13.5 4.67157 13.5 5.5C13.5 6.32843 12.8284 7 12 7C11.1716 7 10.5 6.32843 10.5 5.5Z"
        fill={props.color || 'white'} />
      <path
        d="M10.5 18.5C10.5 17.6716 11.1716 17 12 17C12.8284 17 13.5 17.6716 13.5 18.5C13.5 19.3284 12.8284 20 12 20C11.1716 20 10.5 19.3284 10.5 18.5Z"
        fill={props.color || 'white'} />
      <path
        d="M17 12C17 11.1716 17.6716 10.5 18.5 10.5C19.3284 10.5 20 11.1716 20 12C20 12.8284 19.3284 13.5 18.5 13.5C17.6716 13.5 17 12.8284 17 12Z"
        fill={props.color || 'white'} />
      <rect x="15" y="7" width="2" height="2" rx="1" fill={props.color || 'white'} />
      <rect x="15" y="15" width="2" height="2" rx="1" fill={props.color || 'white'} />
      <rect x="7" y="15" width="2" height="2" rx="1" fill={props.color || 'white'} />
      <rect x="7" y="7" width="2" height="2" rx="1" fill={props.color || 'white'} />
      <path
        d="M4 12C4 11.1716 4.67157 10.5 5.5 10.5C6.32843 10.5 7 11.1716 7 12C7 12.8284 6.32843 13.5 5.5 13.5C4.67157 13.5 4 12.8284 4 12Z"
        fill={props.color || 'white'} />
    </svg>

  );
};
