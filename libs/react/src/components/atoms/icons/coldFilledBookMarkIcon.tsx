import { IconProps } from '@coldpbc/interfaces';

export const ColdFilledBookMarkIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none" {...props} color={props.color || 'white'}>
      <path
        d="M0 0.718231C0 0.321564 0.335815 0 0.75 0H15.75C16.1643 0 16.5 0.321564 16.5 0.718231V19.8714C16.5 19.943 16.4891 20.0122 16.4688 20.0774C16.5323 20.2832 16.4994 20.5139 16.3583 20.7015C16.1161 21.0234 15.6475 21.0963 15.3113 20.8645L8.28088 16.0145L1.17981 20.7691C0.840332 20.9964 0.372803 20.9171 0.135376 20.592C0.010376 20.4207 -0.0257568 20.2155 0.0175781 20.0263C0.00610352 19.9764 0 19.9246 0 19.8714V0.718231Z"
        fill={props.color || 'white'}
      />
    </svg>
  );
};
