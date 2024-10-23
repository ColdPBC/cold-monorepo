import { twMerge } from 'tailwind-merge';
import { PropsWithChildren } from 'react';

export interface StatusChipProps {
	color?: string;
	text?: string;
	className?: string;
}

export const StatusChip = (props: PropsWithChildren<StatusChipProps>) => {
	const { color = 'white', text, className, children } = props;
	return (
		<div
			className={twMerge(`flex flex-row w-[202px] items-center py-[4px] pr-[16px] pl-[8px] space-x-[8px] rounded-[32px] border-[1px]`, className)}
			style={{
				borderColor: color,
			}}>
			{children}
			{text && <div className={'truncate text-body text-tc-primary'}>{text}</div>}
		</div>
	);
};
