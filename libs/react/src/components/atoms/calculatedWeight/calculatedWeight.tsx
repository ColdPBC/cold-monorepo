import { ProductMaterial } from '@coldpbc/interfaces';
import { CalculatedWeightResult, getCalculatedWeight } from '@coldpbc/lib';
import { Popover } from '../popover';
import { ColdIcon } from '../icons';
import { IconNames } from '@coldpbc/enums';
import React from 'react';

interface CalculatedWeightProps {
	productMaterial: ProductMaterial;
}

export const CalculatedWeight: React.FC<CalculatedWeightProps> = ({ productMaterial }) => {
	const result: CalculatedWeightResult = getCalculatedWeight(productMaterial);

	if ('weight' in result) {
		return <span className="text-tc-primary text-body">{result.weight}</span>;
	} else if ('error' in result) {
		return (
			<div className={'h-full flex gap-1 items-center justify-start text-tc-disabled'}>
				<span className="text-body">Unknown</span>
				<Popover contentClassName="max-w-[260px]" content={result.error}>
					<ColdIcon name={IconNames.ColdUnknownIcon} />
				</Popover>
			</div>
		);
	} else {
		return (
			<div className={'h-full flex gap-1 items-center justify-start'}>
				<span className="text-body text-tc-primary">{result.calculatedWeight}</span>
				<Popover contentClassName="max-w-[260px]" content={result.message}>
					<ColdIcon className={'text-tc-disabled'} name={IconNames.ColdInfoIcon} />
				</Popover>
			</div>
		);
	}
};
