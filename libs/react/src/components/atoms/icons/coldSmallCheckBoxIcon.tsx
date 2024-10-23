import { IconProps } from '../../../interfaces/icons/iconProps';
import React from 'react';
import { HexColors } from '@coldpbc/themes';

export const ColdSmallCheckBoxIcon = (props: IconProps) => {
	const className = props.className ? props.className : 'fill-primary';
	const color = props.color ? props.color : HexColors.primary.DEFAULT;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 32 32"
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
			<defs>
				<clipPath id="__lottie_element">
					<rect width="32" height="32" x="0" y="0"></rect>
				</clipPath>
			</defs>
			<g clipPath="url(#__lottie_element_134)">
				<g transform="matrix(1.0000009536743164,0,0,1.0000009536743164,16,15.375)" opacity="1" style={{ display: 'block' }}>
					<g opacity="1" transform="matrix(1,0,0,1,0,0)">
						<path
							fill="currentcolor"
							fillOpacity="1"
							d=" M0,-12 C6.622799873352051,-12 12,-6.622799873352051 12,0 C12,6.622799873352051 6.622799873352051,12 0,12 C-6.622799873352051,12 -12,6.622799873352051 -12,0 C-12,-6.622799873352051 -6.622799873352051,-12 0,-12z"></path>
						<path
							strokeLinecap="butt"
							strokeLinejoin="miter"
							fillOpacity="0"
							strokeMiterlimit="4"
							stroke="currentcolor"
							strokeOpacity="1"
							strokeWidth="1.5"
							d=" M0,-12 C6.622799873352051,-12 12,-6.622799873352051 12,0 C12,6.622799873352051 6.622799873352051,12 0,12 C-6.622799873352051,12 -12,6.622799873352051 -12,0 C-12,-6.622799873352051 -6.622799873352051,-12 0,-12z"></path>
					</g>
				</g>
				<g transform="matrix(1.5,0,0,1.5,16,16)" opacity="1" style={{ display: 'block' }}>
					<g opacity="1" transform="matrix(1,0,0,1,0,0)">
						<path
							strokeLinecap="round"
							strokeLinejoin="miter"
							fillOpacity="0"
							strokeMiterlimit="4"
							stroke="rgb(255,255,255)"
							strokeOpacity="1"
							strokeWidth="1.5"
							d=" M-2.9000000953674316,-0.15000000596046448 C-2.9000000953674316,-0.15000000596046448 -0.30000001192092896,2.1500000953674316 -0.30000001192092896,2.1500000953674316 C-0.30000001192092896,2.1500000953674316 3.1500000953674316,-2.0999999046325684 3.1500000953674316,-2.0999999046325684"></path>
					</g>
				</g>
			</g>
		</svg>
	);
};
