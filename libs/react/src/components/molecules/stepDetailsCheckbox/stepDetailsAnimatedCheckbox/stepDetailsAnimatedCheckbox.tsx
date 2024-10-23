import { LottieOptions, useLottie } from 'lottie-react';
import { getCheckboxAnimation } from '@coldpbc/animations';
import React, { useEffect } from 'react';

const lottieCheckboxOptions: LottieOptions = {
	animationData: getCheckboxAnimation(),
	width: 32,
	height: 32,
	loop: false,
};

export type StepDetailsAnimatedCheckboxProps = {
	onCheckboxClick: (event: React.MouseEvent<HTMLElement>) => void;
};
export const StepDetailsAnimatedCheckbox = ({ onCheckboxClick }: StepDetailsAnimatedCheckboxProps) => {
	const { View: AnimatedCheckbox, play } = useLottie(lottieCheckboxOptions);

	useEffect(() => {
		play();
	}, []);

	return (
		<div className={'w-[32px] h-[32px]'} onClick={onCheckboxClick} data-testid={'step-detail-checkbox'} data-chromatic="ignore">
			{AnimatedCheckbox}
		</div>
	);
};
