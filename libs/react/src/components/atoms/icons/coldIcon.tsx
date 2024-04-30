import React from 'react';
import { IconProps } from '@coldpbc/interfaces';
import {
  CloseModalIcon,
  ColdActionsCompletedIcon,
  ColdActionsIcon,
  ColdAiIcon,
  ColdBillingIcon,
  ColdBookmarkIcon,
  ColdCheckIcon,
  ColdChevronDownIcon,
  ColdChevronUpIcon,
  ColdComplianceIcon,
  ColdComplianceSurveyCheckBoxIcon,
  ColdDocumentsIcon,
  ColdDocumentUploadIcon,
  ColdEmptyCheckboxIcon,
  ColdFilledBookMarkIcon,
  ColdFilledDocumentUploadIcon,
  ColdFootprintIcon,
  ColdFootprintIconTwo,
  ColdHomeIcon,
  ColdInvertedCheckmarkIcon,
  ColdJourneyIcon,
  ColdReportIcon,
  ColdRightArrowIcon,
  ColdScoreIcon,
  ColdSettingsIcon,
  ColdSmallCheckBoxIcon,
  ColdSwitchIcon,
  ColdTeamMembersIcon,
  PlusIcon,
  SubtractIcon,
} from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

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
    case IconNames.ColdComplianceSurveyCheckBoxIcon:
      return <ColdComplianceSurveyCheckBoxIcon {...props} />;
    case IconNames.ColdAiIcon:
      return <ColdAiIcon {...props} />;
    case IconNames.ColdBookmarkIcon:
      return <ColdBookmarkIcon {...props} />;
    case IconNames.ColdFilledBookMarkIcon:
      return <ColdFilledBookMarkIcon {...props} />;
    case IconNames.ColdDocumentUploadIcon:
      return <ColdDocumentUploadIcon {...props} />;
    case IconNames.ColdFilledDocumentUploadIcon:
      return <ColdFilledDocumentUploadIcon {...props} />;
    case IconNames.ColdInvertedCheckmarkIcon:
      return <ColdInvertedCheckmarkIcon {...props} />;
    case IconNames.ColdSwitchIcon:
      return <ColdSwitchIcon {...props} />;
    default:
    case IconNames.ColdSettingsIcon:
      return <ColdSettingsIcon {...props} />;
  }
};
