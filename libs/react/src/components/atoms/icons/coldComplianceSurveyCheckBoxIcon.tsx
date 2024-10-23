import { IconProps } from '@coldpbc/interfaces';
import React from 'react';
import { HexColors } from '@coldpbc/themes';

export const ColdComplianceSurveyCheckBoxIcon = (props: IconProps) => {
	const className = props.className ? props.className : 'fill-primary';
	const color = props.color ? props.color : HexColors.primary.DEFAULT;
	return (
		<svg
			viewBox="0 0 27 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			preserveAspectRatio="xMidYMid meet"
			{...props}
			className={className}
			style={{
				width: '100%',
				height: '100%',
				transform: 'translate3d(0px, 0px, 0px)',
				contentVisibility: 'visible',
			}}
			color={color}>
			<circle cx="13.5" cy="13" r="12" fill="#485CEA" stroke="#485CEA" strokeWidth="1.5" />
			<path d="M9.5 12.9999L12.1667 15.6666L17.5 10.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
