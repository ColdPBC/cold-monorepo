import React from 'react';
import { IconProps } from '../../../interfaces/icons/iconProps';

export const ColdActionsIcon = (props: IconProps) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill={'none'} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fill={'none'}
				d="M6.499 5.245C6.36106 5.24555 6.24963 5.35773 6.25 5.49567C6.25037 5.63361 6.36239 5.74518 6.50033 5.745C6.63827 5.74482 6.75 5.63294 6.75 5.495C6.75036 5.42842 6.72399 5.36447 6.67682 5.31748C6.62964 5.27049 6.56558 5.24438 6.499 5.245"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fill={'none'}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 5.5V5.5C3 3.567 4.567 2 6.5 2V2C8.433 2 10 3.567 10 5.5V5.5C10 7.13851 8.212 8.88881 7.192 9.75435C6.78918 10.0819 6.21182 10.0819 5.809 9.75435C4.788 8.88881 3 7.13851 3 5.5Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fill={'none'}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16 17.2C16 16.8397 16.1938 16.5073 16.5073 16.3298C16.8208 16.1523 17.2056 16.1571 17.5145 16.3425L20.5145 18.1425C20.8157 18.3232 21 18.6487 21 19C21 19.3513 20.8157 19.6768 20.5145 19.8575L17.5145 21.6575C17.2056 21.8429 16.8208 21.8477 16.5073 21.6702C16.1938 21.4927 16 21.1603 16 20.8V17.2Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fill={'none'}
				d="M12.234 18.995H8.627C7.07671 18.8856 5.90429 17.5472 6 15.996V15.993C5.90429 14.4418 7.07671 13.1034 8.627 12.994H15.372C16.9223 12.8846 18.0947 11.5462 17.999 9.995C18.0964 8.44231 16.922 7.10225 15.37 6.995L13 7"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
