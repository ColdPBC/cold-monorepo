/* eslint-disable @nx/enforce-module-boundaries */
import React from "react";
import {BaseButton} from '@coldpbc/components';
import {ColorNames} from '@coldpbc/components';
import {GlobalSizes} from '@coldpbc/components';
import {TableControlsIcon} from '@coldpbc/components';

export interface TableActionButtonProps {
    onClick: () => void;
}
export const TableActionButton = (props: TableActionButtonProps) => {
    const { onClick } = props;
    return (
        <div className="">
            <BaseButton onClick={onClick} color={ColorNames.starkWhite} size={GlobalSizes.small} icon={<TableControlsIcon/>} />
        </div>
    )
}
