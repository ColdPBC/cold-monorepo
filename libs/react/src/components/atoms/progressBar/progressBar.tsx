import React from 'react';
import { twMerge } from 'tailwind-merge';
import { HexColors } from '@coldpbc/themes';

export interface ProgressBarProps {
	shades: Array<{ color: string; percentage: number }>;
	className?: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
	const { shades, className } = props;
	const mergedClassName = twMerge(`w-full flex items-center justify-between h-[12px] bg-gray-30 py-[2px] rounded-full`, className);
	const getShadeClassName = (index: number, shade: { color: string; percentage: number }) => {
		if (shades.length === 1) {
			return 'rounded-full';
		} else {
			if (shade.percentage === 100) {
				return 'rounded-full';
			} else {
				if (index === 0) {
					return 'rounded-l-full';
				} else if (index === shades.length - 1) {
					return 'rounded-r-full';
				} else {
					return '';
				}
			}
		}
	};

	return (
		<div className={mergedClassName}>
			<div className={'w-full h-full flex'}>
				{shades.map((shade, index) => {
					return (
						<div
							key={index}
							className={getShadeClassName(index, shade)}
							style={{
								width: `${shade.percentage}%`,
								height: '100%',
								backgroundColor: shade.color || HexColors.primary.DEFAULT,
							}}></div>
					);
				})}
			</div>
		</div>
	);
};
