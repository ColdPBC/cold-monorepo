import { ProductMaterial } from '@coldpbc/interfaces';
import { getCalculatedWeight } from '@coldpbc/lib';
import { Popover } from '../popover';
import { ColdIcon } from '../icons';
import { IconNames } from '@coldpbc/enums';
import React from 'react';

interface CalculatedWeightProps {
	productMaterial: ProductMaterial;
}

export const CalculatedWeight: React.FC<CalculatedWeightProps> = ({ productMaterial }) => {
	const result = getCalculatedWeight(productMaterial);

	if ('error' in result) {
		return (
			<div
				className={'h-full flex gap-1 items-center justify-start text-tc-disabled'}
				role="status"
				aria-live="polite"
			>
				<span className="text-body">Unknown</span>
				<Popover
					contentClassName="max-w-[260px]"
					content={result.error}
					aria-label="Weight calculation error details"
				>
					<ColdIcon name={IconNames.ColdUnknownIcon} />
				</Popover>
			</div>
		);
	} else if ('explanation' in result) {
		return (
			<div className={'h-full flex gap-1 items-center justify-start'}>
				<span className="text-body text-tc-primary">{result.displayWeight}</span>
				<Popover contentClassName="max-w-[260px]" content={result.explanation}>
					<ColdIcon className={'text-tc-disabled'} color={'currentColor'} name={IconNames.ColdCalculatorIcon} />
				</Popover>
			</div>
		);
	} else {
    return <span className="text-tc-primary text-body">{result.displayWeight}</span>;
  }
};
