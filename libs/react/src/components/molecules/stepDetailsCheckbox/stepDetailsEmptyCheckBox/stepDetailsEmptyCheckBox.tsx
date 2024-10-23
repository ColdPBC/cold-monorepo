import React from 'react';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

export type HoverStateProps = {
	onCheckboxClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const StepDetailsEmptyCheckBox = ({ onCheckboxClick }: HoverStateProps) => {
	const [checkboxHovered, setCheckboxHovered] = React.useState(false);

	const onCheckboxHover = () => {
		setCheckboxHovered(true);
	};

	const onCheckboxHoverOut = () => {
		setCheckboxHovered(false);
	};

	if (checkboxHovered) {
		return (
			<div
				onClick={onCheckboxClick}
				onMouseOver={onCheckboxHover}
				onMouseOut={onCheckboxHoverOut}
				className={'w-[32px] h-[32px] p-[4px]'}
				data-testid={'step-detail-empty-checkbox'}>
				<div className={'w-[24px] h-[24px] rounded-full bg-gray-40'}></div>
			</div>
		);
	} else {
		return (
			<div
				onClick={onCheckboxClick}
				onMouseOver={onCheckboxHover}
				onMouseOut={onCheckboxHoverOut}
				className={'w-[32px] h-[32px] flex items-center justify-center'}
				data-testid={'step-detail-empty-checkbox'}>
				<ColdIcon name={IconNames.ColdEmptyCheckboxIcon} className={'w-[24px] h-[24px]'} />
			</div>
		);
	}
};
