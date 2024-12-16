import { IconProps } from '@coldpbc/interfaces';

export const ColdRightArrowIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 12H18.0002M18.0002 12L14.0002 8M18.0002 12L14.0002 16" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
