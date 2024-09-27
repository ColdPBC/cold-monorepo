import {IconProps} from "@coldpbc/interfaces";

export const ColdProductsNavIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10.5 8.5V7.5C10.5 6.67157 11.1716 6 12 6V6C12.8284 6 13.5 6.67157 13.5 7.5V7.97042C13.5 8.61544 13.1843 9.21961 12.6548 9.58795L4.61755 15.1791C3.81371 15.7383 4.2094 17 5.18862 17H18.3277C19.3465 17 19.7129 15.6546 18.8347 15.1381L13.5 12"
        stroke={props.color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
