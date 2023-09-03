/* eslint-disable @nx/enforce-module-boundaries */
import React, { useEffect, useState }from "react";
import { Toast } from "flowbite-react";
import { flowbiteThemeOverride } from '@coldpbc/components';
import {cloneDeep, isEmpty} from 'lodash';
import {ToastMessageProps} from '@coldpbc/components';
import {getA11yTextColorStyle, getBackgroundColorStyle} from '@coldpbc/components';
import {ColorNames} from '@coldpbc/components';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export const Toaster = (props: ToastMessageProps) => {
    const { message, type} = props;

    const getToastIcon = () => {
        let icon = null;
        let className = "inline-flex h-8 w-8 rounded-lg items-center justify-center";

        switch(type){
            default:
            case 'success':
                className += " bg-cold-lichenGreen-150";
                icon = <CheckIcon className="h-5 w-5" aria-hidden="true" />
                break;
            case 'failure':
                className += " bg-cold-alert-160";
                icon = <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
                break;
            case 'info':
                className += " bg-cold-starkWhite";
                break;
        }

        return (
            <div className={className}>
                {
                    icon
                }
            </div>
        )
    }

    return (
        <div className="fixed w-full bottom-0 flex justify-center pb-6">
            <Toast className={"max-w-md"}>
                {
                    getToastIcon()
                }
                <div className="ml-3 text-sm font-normal">
                    {
                        message
                    }
                </div>
                <Toast.Toggle />
            </Toast>
        </div>
    )
}
