import { IconProps } from '@coldpbc/interfaces';

export const ColdClockIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
			<path
				d="M12.3811 7V12H17.3811M12.3811 21C7.41054 21 3.3811 16.9706 3.3811 12C3.3811 7.02944 7.41054 3 12.3811 3C17.3517 3 21.3811 7.02944 21.3811 12C21.3811 16.9706 17.3517 21 12.3811 21Z"
				stroke={props.color || '#E0E1EA'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
