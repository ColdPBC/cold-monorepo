import React, { PropsWithChildren } from 'react';
import { BaseButton, ColdLogos, Spinner } from '../../atoms';
import { ButtonTypes, ColdLogoNames, GlobalSizes, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TakeoverProps {
	show: boolean;
	setShow: (show: boolean) => void;
	header?: {
		title?: {
			text?: string;
		};
		dismiss: {
			label?: string;
			dismissible: boolean;
			onClick?: () => void;
		};
	};
	isLoading?: boolean;
	className?: string;
	fullScreenWidth?: boolean;
	'data-testid'?: string;
	containClassName?: string;
}

export const Takeover = (props: PropsWithChildren<TakeoverProps>) => {
	const { children, show, setShow, header, isLoading, className, fullScreenWidth = true, containClassName } = props;

	const getHeaderComponent = () => {
		if (header && !isLoading) {
			return (
				<div className={'w-full flex h-[40px]' + (header.title ? ' justify-between' : ' justify-end')}>
					{header.title ? (
						header.title.text ? (
							<div className={'text-h3 text-tc-primary'}>{header.title.text}</div>
						) : (
							<div className={'flex items-center'}>
								<ColdLogos name={ColdLogoNames.ColdWordmark} color={HexColors.white} className={'w-[76px] h-[24px]'} />
							</div>
						)
					) : (
						''
					)}
					{header.dismiss.dismissible && (
						<BaseButton
							onClick={() => {
								if (header.dismiss.onClick) {
									header.dismiss.onClick();
								} else {
									setShow(false);
								}
							}}
							label={header.dismiss.label}
							iconRight={IconNames.CloseModalIcon}
							variant={ButtonTypes.secondary}
							className={'bg-transparent'}
						/>
					)}
				</div>
			);
		} else {
			return null;
		}
	};

	if (show) {
		return (
			<div className={twMerge('fixed h-screen w-screen bg-bgc-main z-10 inset-0', className)} data-testid={props['data-testid']}>
				<div
					className={twMerge(
						clsx('flex flex-col overflow-y-scroll h-full px-[40px] pt-[40px]', {
							'max-w-[1440px] m-auto': !fullScreenWidth,
						}),
						containClassName,
					)}>
					{getHeaderComponent()}
					<div className="flex-1 flex flex-col">
						{isLoading ? (
							<div className="h-full w-full flex items-center justify-center">
								<Spinner size={GlobalSizes.xLarge} />
							</div>
						) : (
							children
						)}
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};
