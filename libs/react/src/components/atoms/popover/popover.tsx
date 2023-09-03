import React, {ReactNode, useEffect, useRef, useState} from 'react';
import { Positions } from '@coldpbc/components';
import { ColorNames } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/components';
import {Tooltip} from 'flowbite-react';
import ReactMarkdown from 'react-markdown';
import {getA11yTextColorStyle, getBackgroundColorStyle, getBorderColorStyle, getTextColorStyle} from '@coldpbc/components';
import { flowbiteThemeOverride } from '@coldpbc/components';
import {cloneDeep} from 'lodash';

interface PopoverProps {
    children: ReactNode;
    content?: ReactNode;
    position?: Positions;
    color?: ColorNames;
    width?: GlobalSizes.small | GlobalSizes.medium | GlobalSizes.large;
    arrow?: boolean;
}

export const Popover = (props: PopoverProps) => {
    // how to make the tooltip visible on hover
    const {
        children,
        content,
        position= Positions.Auto,
        color = ColorNames.jetBlack,
        width = GlobalSizes.medium,
        arrow = true,
    } = props;
    const customTheme = cloneDeep(flowbiteThemeOverride.tooltip);

    const getWidthStyle = () => {
        switch(width){
            case GlobalSizes.small:
                return "w-32"
            default:
            case GlobalSizes.medium:
                return "w-48"
            case GlobalSizes.large:
                return "w-80"
        }
    }

    const getPopoverColorStyle = () => {
        return getBackgroundColorStyle(color) + " " + getA11yTextColorStyle(color) + " border " + getBorderColorStyle(color) + " " + getWidthStyle();
    }

    const getTooltipTheme = () => {
        customTheme.arrow.style.auto = getBackgroundColorStyle(color);
        customTheme.style.auto = getPopoverColorStyle();
        return customTheme
    }

    return (
        <Tooltip theme={getTooltipTheme()} content={content} placement={position} arrow={arrow} style={"auto"}>
            {
                children
            }
        </Tooltip>
    )
}
