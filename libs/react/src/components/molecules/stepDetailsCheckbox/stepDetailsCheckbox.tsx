import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { StepDetailsEmptyCheckBox } from './stepDetailsEmptyCheckBox';
import { StepDetailsAnimatedCheckbox } from './stepDetailsAnimatedCheckbox';
import { MouseEvent, useState } from 'react';
import { Step } from '@coldpbc/interfaces';

export type StepDetailsCheckboxProps = {
	complete: Step['complete'];
	setComplete: (complete: Step['complete']) => void;
};

export const StepDetailsCheckbox = ({ complete, setComplete }: StepDetailsCheckboxProps) => {
	const [checkboxClicked, setCheckboxClicked] = useState(false);

	const getStepCheckbox = () => {
		if (complete) {
			if (!checkboxClicked) {
				return (
					<div className={'w-[32px] h-[32px]'} onClick={onCheckboxClick} data-testid={'step-detail-checkbox'}>
						<ColdIcon name={IconNames.ColdSmallCheckBoxIcon} className={' '} />
					</div>
				);
			} else {
				return <StepDetailsAnimatedCheckbox onCheckboxClick={onCheckboxClick} />;
			}
		} else {
			return <StepDetailsEmptyCheckBox onCheckboxClick={onCheckboxClick} />;
		}
	};

	const onCheckboxClick = (event: MouseEvent<HTMLElement>) => {
		if (complete) {
			setComplete(null);
			setCheckboxClicked(true);
		} else {
			setComplete(new Date().toISOString());
			setCheckboxClicked(true);
		}
	};

	return (
		<div className={'w-[32px] h-[32px] cursor-pointer'} data-chromatic="ignore">
			{getStepCheckbox()}
		</div>
	);
};
