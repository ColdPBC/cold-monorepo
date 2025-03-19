import React from 'react';

export const PlasticsIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect x="0.533333" y="0.533333" width="14.9333" height="14.9333" rx="0.533333" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="0.689527" y1="4.95637" x2="4.95619" y2="0.689706" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="11.3563" y1="15.6229" x2="15.6229" y2="11.3562" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="0.689527" y1="9.22297" x2="9.22286" y2="0.689641" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="7.08943" y1="15.6229" x2="15.6228" y2="7.08954" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="0.689527" y1="13.4896" x2="13.4895" y2="0.689575" stroke={props.color || "black"} strokeWidth="1.06667" />
			<line x1="2.82283" y1="15.6229" x2="15.6228" y2="2.82288" stroke={props.color || "black"} strokeWidth="1.06667" />
		</svg>
	);
};
