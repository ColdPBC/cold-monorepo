import React from 'react';

export const FoamIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect x="0.533333" y="0.533333" width="14.9333" height="14.9333" rx="0.533333" stroke={props.color || 'black'} stroke-width="1.06667" />
			<line x1="1.06665" y1="4.57907" x2="4.57907" y2="1.06665" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
			<line x1="11.7334" y1="15.2458" x2="15.2458" y2="11.7333" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
			<line x1="1.06665" y1="8.84573" x2="8.84574" y2="1.06664" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
			<line x1="7.46655" y1="15.2458" x2="15.2456" y2="7.46667" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
			<line x1="1.06665" y1="13.1124" x2="13.1124" y2="1.06664" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
			<line x1="3.19995" y1="15.2458" x2="15.2457" y2="3.2" stroke={props.color || 'black'} stroke-width="1.06667" stroke-linecap="round" stroke-dasharray="0.1 3" />
		</svg>
	);
};
