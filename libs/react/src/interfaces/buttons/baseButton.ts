import React from 'react';
import { ButtonTypes } from '../../enums/buttons';
import { GlobalSizes } from '../../enums/sizes';
import { IconNames } from '../../enums/iconNames';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: GlobalSizes;
  /**
   * Boolean value to make the button text uppercase
   */
  upperCase?: boolean;

  /**
   * Label for the button text
   */
  label?: string;

  /**
   * Boolean value to make the button text bold
   */
  bold?: boolean;

  /**
   * Size of the button text
   */
  textSize?: GlobalSizes;

  /**
   * Button click action
   */
  onClick?: (event?: any) => void;

  /**
   * Tailwinds css styles
   */
  className?: string;

  /**
   * Button variant that will define specific styles
   */
  variant?: ButtonTypes;

  /**
   * ColdIcon to be displayed on the button's left side
   */
  iconLeft?: IconNames;

  /**
   * ColdIcon to be displayed on the button's right side
   */
  iconRight?: IconNames;

  icon?: JSX.Element;
  /**
   * Boolean value to round the button's corners
   */
  rounded?: boolean;

  /**
   * If present, the element rendered is an anchor/Link
   */
  href?: string;

  /**
   * Used to control behaviour of links, if href is passed
   */
  target?: React.HTMLAttributeAnchorTarget;

  loading?: boolean;

  key?: string;

  'data-testid'?: string;
}
