import React from 'react';
import { Transition } from '@headlessui/react';
import { ColdIcon } from '../icons';
import { IconNames } from '@coldpbc/enums';

export interface ColdLogoAnimationProps {
	expanded: boolean;
}

export const ColdLogoAnimation = (props: ColdLogoAnimationProps) => {
	const { expanded } = props;
	const nodeRef = React.useRef(null);
	const letterTransitionClassNames = {
		enter: 'opacity-0',
		enterDone: 'transition ease-out duration-200 opacity-100',
		exitActive: 'transition ease-in duration-200 opacity-50',
	};

	const oLetterTransitionEnter = {
		// enter: 'transform -translate-x-full',
		enterActive: 'translate-x-full transition ease-out duration-200',
		enterDone: 'translate-x-0',
		// enterDone: 'transform translate-x-0',
		// exit: 'transform -translate-x-full',
		// exitDone: 'transform translate-x-0',
	};

	const oLetterTransitionExit = {
		// enter: 'transform -translate-x-full',
		enterActive: 'transform translate-x-full transition ease-out duration-200',
		enterDone: 'transform translate-x-0',
		// enterDone: 'transform translate-x-0',
		// exit: 'transform -translate-x-full',
		// exitDone: 'transform translate-x-0',
	};

	return (
		<div className="h-[24px] flex flex-row items-center justify-start pl-[20px] w-full">
			<Transition
				show={expanded}
				enter={'transition-opacity ease-out duration-200'}
				enterFrom={'opacity-50'}
				enterTo={'opacity-100'}
				leave={'transition ease-in duration-200'}
				leaveFrom={'opacity-50'}
				leaveTo={'opacity-0'}>
				<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10.2283 17.0162C6.26477 17.0162 3.03998 13.8692 3.03998 10.0006C3.03998 6.13233 6.26477 2.9853 10.2283 2.9853C13.5646 2.9853 16.3771 5.21545 17.1836 8.22846H20.0117C19.1553 3.71612 15.0956 0.287292 10.2283 0.287292C4.7405 0.287292 0.275879 4.64467 0.275879 10.0006C0.275879 15.3559 4.7405 19.7127 10.2283 19.7127C15.0962 19.7127 19.156 16.2836 20.012 11.7716H17.1839C16.3781 14.7855 13.5652 17.0162 10.2283 17.0162Z"
						fill="white"
					/>
				</svg>
			</Transition>
			<ColdIcon name={IconNames.ColdScoreIcon} />
			<Transition
				show={expanded}
				enter={'transition-opacity ease-out duration-200'}
				enterFrom={'opacity-50'}
				enterTo={'opacity-100'}
				leave={'transition ease-in duration-200'}
				leaveFrom={'opacity-50'}
				leaveTo={'opacity-0'}>
				<svg width="17" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M3.55489 0.551331H0.520142V19.4491H13.3871V16.7514H3.55489V0.551331Z" fill="white" />
				</svg>
			</Transition>
			<Transition
				show={expanded}
				enter={'transition-opacity ease-out duration-200'}
				enterFrom={'opacity-50'}
				enterTo={'opacity-100'}
				leave={'transition ease-in duration-200'}
				leaveFrom={'opacity-50'}
				leaveTo={'opacity-0'}>
				<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6.71439 16.7514H3.21405V3.24995H6.71439C10.893 3.24995 13.3877 5.80287 13.3877 10.0786C13.3877 14.1946 10.8308 16.7514 6.71439 16.7514ZM6.71438 0.551331H0.160278V19.4491H6.71438C12.5298 19.4491 16.2873 15.7714 16.2873 10.0795C16.2873 4.20243 12.6193 0.551331 6.71438 0.551331Z"
						fill="white"
					/>
				</svg>
			</Transition>
		</div>
	);
};
