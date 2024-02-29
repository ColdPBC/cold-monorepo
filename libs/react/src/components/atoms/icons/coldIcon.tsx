import React from 'react';
import { IconProps } from '../../../interfaces/icons/iconProps';
import { ColdHomeIcon } from './coldHomeIcon';
import { ColdFootprintIcon } from './coldFootprintIcon';
import { ColdActionsIcon } from './coldActionsIcon';
import { ColdReportIcon } from './coldReportIcon';
import { ColdSettingsIcon } from './coldSettingsIcon';
import { IconNames } from '../../../enums/iconNames';
import { CloseModalIcon } from './closeModalIcon';
import { ColdBillingIcon } from './coldBillingIcon';
import { ColdTeamMembersIcon } from './coldTeamMembersIcon';
import { ColdJourneyIcon } from './coldJourneyIcon';
import { ColdSmallCheckBoxIcon } from './coldSmallCheckBoxIcon';
import { ColdScoreIcon } from './coldScoreIcon';
import { ColdFootprintIconTwo } from './coldFootprintIconTwo';
import { ColdActionsCompletedIcon } from './coldActionsCompletedIcon';
import { ColdRightArrowIcon } from './ColdRightArrowIcon';
import { ColdEmptyCheckboxIcon } from './coldEmptyCheckboxIcon';
import { ColdChevronUpIcon } from './coldChevronUpIcon';
import { ColdChevronDownIcon } from './coldChevronDownIcon';
import { ColdCheckIcon } from './coldCheckIcon';
import { ColdComplianceIcon } from './coldComplianceIcon';
import { ColdDocumentsIcon } from './coldDocumentsIcon';
import { PlusIcon } from './plusIcon';
import { SubtractIcon } from './subtractIcon';

// TODO: Take the color attribute out of the IconProps
export const ColdIcon = (props: IconProps) => {
  const { name } = props;
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
    case IconNames.ColdRightArrowIcon:
      return <ColdRightArrowIcon {...props} />;
    case IconNames.ColdEmptyCheckboxIcon:
      return <ColdEmptyCheckboxIcon {...props} />;
    case IconNames.ColdChevronUpIcon:
      return <ColdChevronUpIcon {...props} />;
    case IconNames.ColdChevronDownIcon:
      return <ColdChevronDownIcon {...props} />;
    case IconNames.ColdCheckIcon:
      return <ColdCheckIcon {...props} />;
    case IconNames.ColdComplianceIcon:
      return <ColdComplianceIcon {...props} />;
    case IconNames.ColdDocumentsIcon:
      return <ColdDocumentsIcon {...props} />;
    case IconNames.PlusIcon:
      return <PlusIcon {...props} />;
    case IconNames.SubtractIcon:
      return <SubtractIcon {...props} />;
    default:
    case IconNames.ColdSettingsIcon:
      return <ColdSettingsIcon {...props} />;
  }
};
