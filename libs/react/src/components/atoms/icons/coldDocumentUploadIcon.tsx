import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdDocumentUploadIcon = (props: IconProps) => {
	if (props.inverted) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none" {...props}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M7.2225 3.625H22.7775C24.005 3.625 25 4.70646 25 6.04167V22.9583C25 24.2935 24.005 25.375 22.7775 25.375H7.2225C5.995 25.375 5 24.2935 5 22.9583V6.04167C5 4.70646 5.995 3.625 7.2225 3.625Z"
					fill={props.color || 'white'}
					stroke="black"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M10 13.8958H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 9.06249H20" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 18.125H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	} else {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none" {...props}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M7.2225 3.625H22.7775C24.005 3.625 25 4.70646 25 6.04167V22.9583C25 24.2935 24.005 25.375 22.7775 25.375H7.2225C5.995 25.375 5 24.2935 5 22.9583V6.04167C5 4.70646 5.995 3.625 7.2225 3.625Z"
					stroke={props.color || 'white'}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M10 13.8958H20" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 9.06249H20" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 18.125H15" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	}
};
