import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdTeamMembersIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 18C6 14.25 8.25 12 12 12C15.7499 12 18 14.25 18 18"
        stroke={props.color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6" r="3" fill="white" />
    </svg>
  );
};
