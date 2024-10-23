import { IconProps } from '@coldpbc/interfaces';

export const ColdBookmarkIcon = (props: IconProps) => {
	if (props.filled) {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none" {...props} color={props.color || 'white'}>
				<path
					d="M0 0.718231C0 0.321564 0.335815 0 0.75 0H15.75C16.1643 0 16.5 0.321564 16.5 0.718231V19.8714C16.5 19.943 16.4891 20.0122 16.4688 20.0774C16.5323 20.2832 16.4994 20.5139 16.3583 20.7015C16.1161 21.0234 15.6475 21.0963 15.3113 20.8645L8.28088 16.0145L1.17981 20.7691C0.840332 20.9964 0.372803 20.9171 0.135376 20.592C0.010376 20.4207 -0.0257568 20.2155 0.0175781 20.0263C0.00610352 19.9764 0 19.9246 0 19.8714V0.718231Z"
					fill={props.color || 'white'}
				/>
			</svg>
		);
	} else {
		if (props.inverted) {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none" {...props}>
					<circle cx="6" cy="6.5" r="6" fill={props.color || 'white'} />
					<path d="M4 4V9L6 7.63636L8 9V4H4Z" fill="#282C3E" stroke="#282C3E" strokeLinejoin="round" />
				</svg>
			);
		} else {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" viewBox="0 0 17 21" fill="none" {...props} color={props.color}>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0.750058 0C0.335844 0 5.80166e-05 0.321569 5.80166e-05 0.718245V19.8714C5.80166e-05 19.9246 0.00609043 19.9764 0.0175356 20.0263C-0.0258155 20.2155 0.0103808 20.4208 0.135398 20.592C0.372742 20.9171 0.840344 20.9964 1.17981 20.7691L8.28092 16.0145L15.3113 20.8645C15.6474 21.0963 16.1161 21.0234 16.3582 20.7015C16.4993 20.5139 16.5323 20.2832 16.4688 20.0774C16.4891 20.0122 16.5001 19.943 16.5001 19.8714V0.718245C16.5001 0.321569 16.1643 0 15.7501 0H0.750058ZM15.0001 18.8794V1.43649H1.50006V18.8019L8.29388 14.253L15.0001 18.8794Z"
						fill={props.color || 'white'}
					/>
				</svg>
			);
		}
	}
};
