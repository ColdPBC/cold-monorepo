import React from "react";
import { BaseButton } from '../../../atoms/button/button';
import { ColorNames } from '../../../../enums/colors';
import { GlobalSizes } from '../../../../enums/sizes';
import { TableControlsIcon } from '../../../atoms/icons/tableControlsIcon';

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
