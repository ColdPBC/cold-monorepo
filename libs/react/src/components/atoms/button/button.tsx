import React from 'react';
import { IButtonProps } from '../../../interfaces/buttons/baseButton';
import { GlobalSizes } from '../../../enums/sizes';
import { ButtonTypes } from '../../../enums/buttons';
import { IconNames } from '../../../enums/iconNames';
import { ColdIcon } from '../../atoms/icons/coldIcon';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '../spinner';

export function BaseButton(props: IButtonProps): JSX.Element {
	const {
		key,
		onClick = () => {
			window.alert(`${props.label} button clicked!`);
		},
		variant = ButtonTypes.primary,
		iconLeft,
		iconRight,
		textSize,
		label,
		bold = true,
		upperCase,
		className,
		href,
		target,
		loading = false,
		children,
	} = props;

	const content = (
		<>
			{iconLeft && getIconComponent(iconLeft, props)}
			{label && <span>{label}</span>}
			{children && <span className="w-full">{children}</span>}
			{iconRight && getIconComponent(iconRight, props)}
			{loading && <Spinner size={GlobalSizes.small} />}
		</>
	);

	if (!href) {
		return (
			<button onClick={onClick} className={twMerge(getClassName(props), className)} disabled={!!props.disabled || loading} key={key}>
				{content}
			</button>
		);
	} else {
		return (
			<Link to={href} className={twMerge(getClassName(props), className)} target={target} key={key}>
				{content}
			</Link>
		);
	}
}

/*
 Utility functions
 */
function getTextSizeStyle(props: IButtonProps) {
	switch (props.textSize) {
		case GlobalSizes.xxxSmall:
		case GlobalSizes.xxSmall:
		case GlobalSizes.xSmall:
			return `text-xs`;
		default:
		case GlobalSizes.small:
			return `text-sm`;
		case GlobalSizes.medium:
			return `text-m`;
		case GlobalSizes.large:
			return `text-lg`;
		case GlobalSizes.xLarge:
			return `text-xl`;
		case GlobalSizes.xxLarge:
			return `text-2xl`;
		case GlobalSizes.xxxLarge:
			return `text-3xl`;
	}
}

function getVariantStyle(props: IButtonProps) {
	switch (props.variant) {
		default:
		case ButtonTypes.primary:
			if (props.disabled) return `px-4 py-2 leading-[24px] rounded-lg bg-gray-50 text-tc-disabled`;
			else
				return `px-4 py-2 leading-[24px] rounded-lg bg-primary text-tc-primary hover:bg-primary-200 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 active:bg-primary-100`;
		case ButtonTypes.secondary:
			if (props.disabled) return `px-4 py-2 leading-[24px] rounded-lg bg-transparent text-tc-disabled`;
			else
				return `px-4 py-2 leading-[24px] rounded-lg bg-bgc-accent text-tc-primary hover:bg-gray-50 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 active:bg-gray-60`;
		case ButtonTypes.warning:
			if (props.disabled) return `px-4 py-2 leading-[24px] rounded-lg bg-gray-50 text-tc-disabled`;
			else
				return `px-4 py-2 leading-[24px] rounded-lg bg-red-300 text-tc-primary hover:bg-red-200 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 focus-visible:bg-gray-30 active:bg-red-100`;
		case ButtonTypes.hyperlink:
			if (props.disabled) return `leading-[24px] bg-transparent text-tc-disabled underline`;
			else
				return `leading-[24px] text-tc-primary hover:border-b hover:border-b-white active:border-b active:border-tc-secondary active:text-tc-secondary focus-visible:underline focus-visible:border-4 focus-visible:border-gray-70 focus-visible:bg-gray-30`;
	}
}

export function getUpperStyle(props: IButtonProps) {
	return props.label && props.upperCase ? 'uppercase' : '';
}

export function getBoldStyle(props: IButtonProps) {
	return props.label && props.bold ? 'font-bold' : 'font-medium';
}

export function getClassName(props: IButtonProps) {
	return `flex items-center justify-center gap-2 transition-colors ease-in-out ${getUpperStyle(props)} ${getBoldStyle(props)} ${getVariantStyle(props)} ${getTextSizeStyle(props)}`;
}

export function getIconComponent(icon: IconNames, props: IButtonProps) {
	let iconClassName = '';

	if (props.disabled) {
		iconClassName = `stroke-tc-disabled fill-tc-disabled`;
	} else {
		switch (props.variant) {
			default: // make sure this matches the default variant in the getVariantStyle as well
			case ButtonTypes.primary:
			case ButtonTypes.warning:
			case ButtonTypes.secondary:
				iconClassName = `stroke-tc-primary fill-tc-primary`;
				break;
			// hyperlink button type will not show icons
		}
	}

	return <ColdIcon name={icon} className={iconClassName} />;
}
