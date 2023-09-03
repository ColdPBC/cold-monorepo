/* eslint-disable @nx/enforce-module-boundaries */
import {IconProps} from '@coldpbc/components';
import {DefaultHexColors} from '@coldpbc/components';
import React from "react";

export const ColdBillingIcon = (props: IconProps) => {
    const className = props.className ? props.className : "hover:stroke-cold-starkWhite hover:fill-cold-starkWhite stroke-cold-limestone fill-cold-limestone";

    return (
        <svg fill="none" width="24" className={className} height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"></path>
        </svg>
    )
}
