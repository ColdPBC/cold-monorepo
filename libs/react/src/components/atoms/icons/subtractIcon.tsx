import { IconProps } from '@coldpbc/interfaces';

export const SubtractIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8 12H16" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};
