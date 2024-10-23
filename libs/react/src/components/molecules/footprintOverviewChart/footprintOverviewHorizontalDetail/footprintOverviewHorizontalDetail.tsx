import React, { PropsWithChildren } from 'react';
import { FootprintDetailChip } from '../../../atoms/footprintDetailChip/footprintDetailChip';
import { FootprintOverviewDetail } from '../footprintOverviewChart';

export interface FootprintOverviewHorizontalDetailProps extends FootprintOverviewDetail {
	leftAlign: boolean; // if it's not left aligned, it's right aligned
}

export function FootprintOverviewHorizontalDetail(props: PropsWithChildren<FootprintOverviewHorizontalDetailProps>) {
	return (
		<>
			{props.leftAlign && <FootprintOverviewHorizontalDetailRectangle color={props.color} />}
			<div className={'flex flex-col justify-center gap-1 ' + (props.leftAlign ? 'items-start' : 'items-end')}>
				<div className={'text-body font-bold text-tc-primary'}>{props.title}</div>
				<div className={'flex justify-center items-center gap-2'}>
					{!props.leftAlign && <FootprintDetailChip emissions={props.emissions} />}
					<div className={'text-body text-tc-primary'}>{props.percent.toFixed(0) + '%'}</div>
					{props.leftAlign && <FootprintDetailChip emissions={props.emissions} />}
				</div>
			</div>
			{!props.leftAlign && <FootprintOverviewHorizontalDetailRectangle color={props.color} />}
		</>
	);
}

function FootprintOverviewHorizontalDetailRectangle(props: { color: string }) {
	return <div className="w-1 self-stretch rounded-lg" style={{ backgroundColor: props.color }} />;
}
