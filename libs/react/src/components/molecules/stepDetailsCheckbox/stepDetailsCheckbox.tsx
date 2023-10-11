import React, { useEffect } from 'react';
import { Step } from '@coldpbc/interfaces';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import Lottie from 'lottie-react';
import { getCheckboxAnimation } from '@coldpbc/animations';
import { StepDetailsEmptyCheckBox } from './stepDetailsEmptyCheckBox';

export type StepDetailsCheckboxProps = {
  complete: string | undefined;
  setComplete: (complete: string | undefined) => void;
};

export const StepDetailsCheckbox = ({
  complete,
  setComplete,
}: StepDetailsCheckboxProps) => {
  const [checkboxClicked, setCheckboxClicked] = React.useState(false);

  const getStepCheckbox = () => {
    if (complete) {
      if (!checkboxClicked) {
        return (
          <div className={'w-[32px] h-[32px]'} onClick={onCheckboxClick}>
            <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} className={' '} />
          </div>
        );
      } else {
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
      }
    } else {
      return <StepDetailsEmptyCheckBox onCheckboxClick={onCheckboxClick} />;
    }
  };

  const onCheckboxClick = () => {
    if (complete) {
      setComplete(undefined);
      setCheckboxClicked(true);
    } else {
      setComplete(new Date().toISOString());
      setCheckboxClicked(true);
    }
  };

  return (
    <div className={'w-[32px] h-[32px] cursor-pointer'}>
      {getStepCheckbox()}
    </div>
  );
};
