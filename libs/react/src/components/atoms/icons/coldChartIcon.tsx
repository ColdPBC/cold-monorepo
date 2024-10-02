import {IconProps} from "@coldpbc/interfaces";

export const ColdChartIcon = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 4.5V18C4 18.5523 4.44772 19 5 19H20" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" />
      <path d="M8 8V16" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" />
      <path d="M12 10V16" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" />
      <path d="M16 12V16" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" />
    </svg>
  );
};
