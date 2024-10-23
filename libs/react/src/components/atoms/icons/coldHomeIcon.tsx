import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdHomeIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M11.9998 21.0035C7.02721 21.0035 2.99609 16.9724 2.99609 11.9998C2.99609 7.02721 7.02721 2.99609 11.9998 2.99609C16.9724 2.99609 21.0036 7.02721 21.0036 11.9998"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M3.50781 8.99854H20.3828" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M3.51172 15.001H12.0012" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="M16.0028 11.9998C16.0104 9.20492 15.2612 6.46008 13.8349 4.05652C13.4575 3.40049 12.7584 2.99609 12.0016 2.99609C11.2448 2.99609 10.5457 3.40049 10.1683 4.05652C7.27724 8.95782 7.27724 15.0428 10.1683 19.9441C10.5475 20.5979 11.2453 21.0013 12.0011 21.0035"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18.2516 22.0041C20.3235 22.0041 22.0031 20.3245 22.0031 18.2525C22.0031 16.1806 20.3235 14.501 18.2516 14.501C16.1796 14.501 14.5 16.1806 14.5 18.2525C14.5 20.3245 16.1796 22.0041 18.2516 22.0041Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M18.5333 19.7532L19.2855 18.2526H17.2188L17.9711 16.752" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
