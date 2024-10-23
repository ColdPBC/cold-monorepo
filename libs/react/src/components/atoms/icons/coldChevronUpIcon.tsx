import { IconProps } from '@coldpbc/interfaces';

export const ColdChevronUpIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none" {...props}>
			<path d="M9 6L5 2L1 6" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
};
