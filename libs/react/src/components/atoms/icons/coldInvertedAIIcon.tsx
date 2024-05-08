import { IconProps } from '@coldpbc/interfaces';

export const ColdInvertedAIIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
      <circle cx="6" cy="6.8335" r="6" fill={props.color || 'white'} />
      <path
        d="M6 2.8335L6.31441 3.68317C6.80058 4.99703 7.83647 6.03292 9.15032 6.51909L10 6.8335L9.15032 7.14791C7.83647 7.63407 6.80058 8.66997 6.31441 9.98382L6 10.8335L5.68559 9.98382C5.19942 8.66997 4.16353 7.63407 2.84968 7.14791L2 6.8335L2.84968 6.51909C4.16353 6.03292 5.19942 4.99703 5.68559 3.68317L6 2.8335Z"
        fill="black"
      />
    </svg>
  );
};
