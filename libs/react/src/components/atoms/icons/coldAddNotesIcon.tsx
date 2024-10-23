import { IconProps } from '@coldpbc/interfaces';

export const ColdAddNotesIcon = (props: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.48167 1H12.8517C13.67 1 14.3333 1.74583 14.3333 2.66667V14.3333C14.3333 15.2542 13.67 16 12.8517 16H2.48167C1.66333 16 1 15.2542 1 14.3333V2.66667C1 1.74583 1.66333 1 2.48167 1Z"
				stroke={props.color || 'white'}
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M6 8.66667H9.33333" stroke={props.color || 'white'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.66667 10.3335V7.00016" stroke={props.color || 'white'} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
