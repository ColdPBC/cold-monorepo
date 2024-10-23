import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdEmptyCheckboxIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none" {...props}>
			<circle cx="13.5" cy="13" r="12" stroke={props.color || '#282C3E'} strokeWidth="1.5" />
		</svg>
	);
};
