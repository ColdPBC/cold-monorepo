import React from 'react';
import { GlobalSizes } from '@coldpbc/enums';
import { Spinner as FBSpinner } from 'flowbite-react';

export function Spinner({ size = GlobalSizes.medium, ...props }) {
	return <FBSpinner size={size} className="fill-primary text-bgc-accent" />;
}
