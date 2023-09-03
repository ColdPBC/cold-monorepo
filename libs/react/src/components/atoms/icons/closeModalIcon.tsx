import * as React from "react";
import { IconProps } from '../../../interfaces/icons/iconProps';

export const CloseModalIcon = (props: IconProps) => {
    const className = props.className ? props.className : "hover:stroke-cold-starkWhite hover:fill-cold-starkWhite stroke-cold-limestone fill-cold-limestone";

    return <svg aria-hidden="true" className={className} width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
};
