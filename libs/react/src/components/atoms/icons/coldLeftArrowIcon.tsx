import { IconProps } from '@coldpbc/interfaces';

export const ColdLeftArrowIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M18 12H5.9998M5.9998 12L9.99981 8M5.9998 12L9.99981 16" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
