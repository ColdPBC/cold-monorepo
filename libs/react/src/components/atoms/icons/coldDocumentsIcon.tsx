import { IconProps } from '@coldpbc/interfaces';

export const ColdDocumentsIcon = (props: IconProps) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.14182 3.21934L21.2038 9.44494C21.5343 9.61549 21.7429 9.95529 21.7455 10.3272C21.748 10.6991 21.544 11.0417 21.2158 11.2167L16.714 13.6177C16.1341 13.927 15.4393 13.9319 14.8552 13.6307L2.79618 7.40309C2.46569 7.23254 2.25708 6.89274 2.25454 6.52085C2.25204 6.14896 2.45603 5.80636 2.78417 5.63135L7.28605 3.23035C7.86543 2.92268 8.55883 2.91857 9.14182 3.21934Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.8582 3.21934L2.79618 9.44494C2.46569 9.61549 2.25708 9.95529 2.25454 10.3272C2.25204 10.6991 2.45603 11.0417 2.78417 11.2167L7.28605 13.6177C7.8659 13.927 8.5607 13.9319 9.14482 13.6307L21.2038 7.40309C21.5343 7.23254 21.7429 6.89274 21.7455 6.52085C21.748 6.14896 21.544 5.80636 21.2158 5.63135L16.714 3.23035C16.1346 2.92268 15.4412 2.91857 14.8582 3.21934Z"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M19.108 12.3411V16.2788C19.108 17.0179 18.7007 17.6968 18.0485 18.0445L12.9464 20.7687C12.358 21.0824 11.652 21.0824 11.0636 20.7687L5.96149 18.0445C5.30933 17.6968 4.90204 17.0179 4.90204 16.2788V12.3411"
				stroke={props.color || 'white'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M12 21.0037V12.1541" stroke={props.color || 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};
