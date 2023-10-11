import Lottie from 'lottie-react';
import { getCheckboxAnimation } from '@coldpbc/animations';
import React from 'react';

export type StepDetailsAnimatedCheckboxProps = {
  onCheckboxClick: () => void;
};
export const StepDetailsAnimatedCheckbox = ({
  onCheckboxClick,
}: StepDetailsAnimatedCheckboxProps) => {
  return (
    <div className={'w-[32px] h-[32px]'} onClick={onCheckboxClick}>
      <Lottie
        animationData={getCheckboxAnimation()}
        autoplay={true}
        loop={false}
        width={32}
        height={32}
      />
    </div>
  );
};
