import { CalculatedWeightResult } from '@coldpbc/lib';
import { Popover } from '../popover';
import { ColdIcon } from '../icons';
import { IconNames } from '@coldpbc/enums';
import React from 'react';

interface CalculatedWeightProps {
	weightResult: CalculatedWeightResult;
}

export const CalculatedWeight: React.FC<CalculatedWeightProps> = ({ weightResult }) => {
	if ('error' in weightResult) {
		return (
			<div
				className={'h-full flex gap-1 items-center justify-start text-tc-disabled'}
				role="status"
				aria-live="polite"
			>
				<span className="text-body">Unknown</span>
				<Popover
					contentClassName="max-w-[260px]"
					content={weightResult.error}
					aria-label="Weight calculation error details"
				>
					<ColdIcon name={IconNames.ColdUnknownIcon} />
				</Popover>
			</div>
		);
	} else if ('explanation' in weightResult) {
		return (
			<div className={'h-full flex gap-1 items-center justify-start'}>
				<span className="text-body text-tc-primary">{weightResult.displayWeight}</span>
				<Popover contentClassName="max-w-[260px]" content={weightResult.explanation}>
					<ColdIcon className={'text-tc-disabled'} color={'currentColor'} name={IconNames.ColdCalculatorIcon} />
				</Popover>
			</div>
		);
	} else {
    return <span className="text-tc-primary text-body">{weightResult.displayWeight}</span>;
  }
};
