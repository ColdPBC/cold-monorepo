import * as React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const CloseModalIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" {...props}>
			<path d="M1 9.5L5 5.5M5 5.5L1 1.5M5 5.5L9 9.5M5 5.5L9 1.5" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};
