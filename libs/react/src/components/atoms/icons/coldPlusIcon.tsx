import React from 'react';
import { IconProps } from '@coldpbc/interfaces';

export const ColdPlusIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
			<path
				d="M1 4.99984L4.99983 4.99886M4.99983 4.99886L4.99983 1M4.99983 4.99886L4.99983 9M4.99983 4.99886L9 4.99984"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};
