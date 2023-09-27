import React from 'react';
import {IconProps} from '../../../interfaces/icons/iconProps';
import {ColdHomeIcon} from './coldHomeIcon';
import {ColdFootprintIcon} from './coldFootprintIcon';
import {ColdActionsIcon} from './coldActionsIcon';
import {ColdReportIcon} from './coldReportIcon';
import {ColdSettingsIcon} from './coldSettingsIcon';
import {IconNames} from '../../../enums/iconNames';
import {CloseModalIcon} from './closeModalIcon';
import {ColdBillingIcon} from './coldBillingIcon';
import {ColdTeamMembersIcon} from './coldTeamMembersIcon';
import {ColdJourneyIcon} from './coldJourneyIcon';
import {ColdSmallCheckBoxIcon} from './coldSmallCheckBoxIcon';
import { ColdScoreIcon } from './coldScoreIcon';
import { ColdFootprintIconTwo } from './coldFootprintIconTwo';
import { ColdActionsCompletedIcon } from './coldActionsCompletedIcon';

// TODO: Take the color attribute out of the IconProps
export const ColdIcon = (props: IconProps) => {
  const { name, color, strokeWidth, className } = props;
  switch (name) {
    case IconNames.ColdHomeIcon:
      return <ColdHomeIcon {...props} />;
    case IconNames.ColdFootprintIcon:
      return <ColdFootprintIcon {...props} />;
    case IconNames.ColdActionsIcon:
      return <ColdActionsIcon {...props} />;
    case IconNames.ColdJourneyIcon:
      return <ColdJourneyIcon {...props} />;
    case IconNames.ColdReportIcon:
      return <ColdReportIcon {...props} />;
    case IconNames.CloseModalIcon:
      return <CloseModalIcon {...props} />;
    case IconNames.ColdBillingIcon:
      return <ColdBillingIcon {...props} />;
    case IconNames.ColdTeamMembersIcon:
      return <ColdTeamMembersIcon {...props} />;
    case IconNames.ColdSmallCheckBoxIcon:
      return <ColdSmallCheckBoxIcon {...props} />;
    case IconNames.ColdScoreIcon:
      return <ColdScoreIcon {...props} />;
    case IconNames.ColdFootprintIconTwo:
      return <ColdFootprintIconTwo {...props} />;
    case IconNames.ColdActionsCompletedIcon:
      return <ColdActionsCompletedIcon {...props} />;
    default:
    case IconNames.ColdSettingsIcon:
      return <ColdSettingsIcon {...props} />;
  }
};
