import { IconNames } from '../../enums/iconNames';
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	name?: IconNames;
	className?: string;
	inverted?: boolean;
	filled?: boolean;
}
