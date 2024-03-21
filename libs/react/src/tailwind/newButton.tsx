import { IButtonProps } from '@coldpbc/interfaces';
import { Button } from './index';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import React from 'react';
import { getClassName, getIconComponent, Spinner } from '@coldpbc/components';
import { twMerge } from 'tailwind-merge';

export const NewButton = (props: IButtonProps) => {
  const {
    onClick = () => {
      window.alert(`${props.label} button clicked!`);
    },
    disabled,
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

  function getVariantStyle(props: IButtonProps) {
    switch (props.variant) {
      default:
      case ButtonTypes.primary:
        if (props.disabled || props.loading) return `px-4 py-2 leading-[24px] rounded-lg bg-gray-50 text-tc-disabled`;
        else
          return `px-4 py-2 leading-[24px] rounded-lg bg-primary text-tc-primary hover:bg-primary-200 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 active:bg-primary-100`;
      case ButtonTypes.secondary:
        if (props.disabled || props.loading) return `px-4 py-2 leading-[24px] rounded-lg bg-transparent text-tc-disabled`;
        else
          return `px-4 py-2 leading-[24px] rounded-lg bg-bgc-accent text-tc-primary hover:bg-gray-50 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 active:bg-gray-60`;
      case ButtonTypes.warning:
        if (props.disabled || props.loading) return `px-4 py-2 leading-[24px] rounded-lg bg-gray-50 text-tc-disabled`;
        else
          return `px-4 py-2 leading-[24px] rounded-lg bg-red-300 text-tc-primary hover:bg-red-200 focus-visible:border-4 focus-visible:border-gray-70 focus-visible:px-3 focus-visible:py-1 focus-visible:bg-gray-30 active:bg-red-100`;
      case ButtonTypes.hyperlink:
        if (props.disabled || props.loading) return `leading-[24px] bg-transparent text-tc-disabled underline`;
        else
          return `leading-[24px] text-tc-primary hover:border-b hover:border-b-white active:border-b active:border-tc-secondary active:text-tc-secondary focus-visible:underline focus-visible:border-4 focus-visible:border-gray-70 focus-visible:bg-gray-30`;
    }
  }

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

  const getClassName = (props: IButtonProps) => {
    return `cursor-pointer ${getVariantStyle(props)} ${getTextSizeStyle(props)}`;
  };

  const content = (
    <>
      {iconLeft && getIconComponent(iconLeft, props)}
      {label && <span>{label}</span>}
      {children && <span className="w-full">{children}</span>}
      {iconRight && getIconComponent(iconRight, props)}
      {loading && <Spinner size={GlobalSizes.small} />}
    </>
  );

  if (href) {
    return <Button href={href} className={twMerge(getClassName(props), className)} target={target} disabled={disabled || loading} children={content} />;
  } else {
    return <Button className={'h-[calc(25px - 1px)]'}>Save Changes</Button>;
  }
};
