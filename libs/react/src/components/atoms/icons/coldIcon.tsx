/* eslint-disable @nx/enforce-module-boundaries */
import React from "react";
import {IconProps} from '@coldpbc/components';
import {ColdHomeIcon} from '@coldpbc/components';
import {ColdFootprintIcon} from '@coldpbc/components';
import {ColdActionsIcon} from '@coldpbc/components';
import {ColdReportIcon} from '@coldpbc/components';
import {ColdSettingsIcon} from '@coldpbc/components';
import {IconNames} from '@coldpbc/components';
import {CloseModalIcon} from '@coldpbc/components';
import {ColdBillingIcon} from '@coldpbc/components';
import {ColdTeamMembersIcon} from '@coldpbc/components';
import {ColdJourneyIcon} from '@coldpbc/components';
import {ColdSmallCheckBoxIcon} from '@coldpbc/components';


// TODO: Take the color attribute out of the IconProps
export const ColdIcon = (props: IconProps) => {
    const {name, color , strokeWidth, className} = props;
    switch(name){
        case IconNames.ColdHomeIcon:
            return (
                <ColdHomeIcon {...props} />
            )
        case IconNames.ColdFootprintIcon:
            return (
                <ColdFootprintIcon {...props}  />
            )
        case IconNames.ColdActionsIcon:
            return (
                <ColdActionsIcon {...props}  />
            )
        case IconNames.ColdJourneyIcon:
            return (
                <ColdJourneyIcon {...props}  />
            )
        case IconNames.ColdReportIcon:
            return (
                <ColdReportIcon {...props}  />
            )
        case IconNames.CloseModalIcon:
            return (
                <CloseModalIcon {...props} />
            )
        case IconNames.ColdBillingIcon:
            return (
                <ColdBillingIcon {...props} />
            )
        case IconNames.ColdTeamMembersIcon:
            return (
                <ColdTeamMembersIcon {...props} />
            )
        case IconNames.ColdSmallCheckBoxIcon:
            return (
                <ColdSmallCheckBoxIcon {...props} />
            )
        default:
        case IconNames.ColdSettingsIcon:
            return (
                <ColdSettingsIcon {...props} />
            )
    }
}
