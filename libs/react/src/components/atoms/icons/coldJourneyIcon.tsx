import React from 'react';
import { IconProps } from '../../../interfaces/icons/iconProps';

export const ColdJourneyIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M18.0039 15.7515H21.0052V18.7527" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16.5345 4.07254C15.6187 3.54257 14.6166 3.17818 13.5742 2.99609" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M20.5199 8.82587C20.1595 7.83088 19.628 6.90658 18.9492 6.09473" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10.425 2.99609C9.38275 3.17818 8.38067 3.54257 7.46484 4.07254" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M5.04721 6.09766C4.36844 6.90951 3.83688 7.83381 3.47656 8.8288" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="M2.99609 12C3.00377 16.2264 5.95001 19.8785 10.079 20.7801C14.2081 21.6817 18.4085 19.59 20.1772 15.7516"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M2.99609 12C2.99609 16.9726 7.0272 21.0037 11.9998 21.0037" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.6389 8.31965L14.5567 10.8857C15.2803 11.8553 15.3955 13.1501 14.8545 14.2322C14.3134 15.3144 13.2085 15.999 11.9986 16.0019C10.7887 15.999 9.68376 15.3144 9.14268 14.2322C8.60161 13.1501 8.71683 11.8553 9.44049 10.8857L11.3583 8.31965C11.5095 8.11812 11.7467 7.99951 11.9986 7.99951C12.2505 7.99951 12.4877 8.11812 12.6389 8.31965Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
