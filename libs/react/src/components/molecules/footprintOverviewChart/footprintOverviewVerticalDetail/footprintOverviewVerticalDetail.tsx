import React, { PropsWithChildren } from 'react';
import { FootprintDetailChip } from '../../../atoms/footprintDetailChip/footprintDetailChip';
import { FootprintOverviewDetail } from '../footprintOverviewChart';

export interface FootprintOverviewVerticalDetailProps extends FootprintOverviewDetail {
	percentWidth: number;
}

export function FootprintOverviewVerticalDetail(props: PropsWithChildren<FootprintOverviewVerticalDetailProps>) {
	return (
		<div className="mb-3">
			<div className={'text-body font-bold text-tc-primary'}>{props.title}</div>
			<div className="flex items-center">
				<div
					className="h-1 rounded-lg"
					style={{
						backgroundColor: props.color,
						width: `calc((100% - 113px) * ${props.percentWidth})`,
					}}
				/>
				<div className="flex">
					<div className={'text-body text-tc-primary mx-1'}>{props.percent.toFixed(2) + '%'}</div>
					<FootprintDetailChip emissions={props.emissions} />
				</div>
			</div>
		</div>
	);
}
