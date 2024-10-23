import { IconProps } from '@coldpbc/interfaces';

export const ColdChevronDownIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none" {...props}>
			<path d="M1 1L5 5L9 1" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};
