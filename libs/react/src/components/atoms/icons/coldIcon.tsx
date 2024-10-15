import React from 'react';
import { IconProps } from '@coldpbc/interfaces';
import {
  CloseModalIcon,
  ColdActionsCompletedIcon,
  ColdActionsIcon,
  ColdAddNotesIcon,
  ColdAiIcon,
  ColdBillingIcon,
  ColdBookmarkIcon,
  ColdCalendarCloseIcon,
  ColdCalendarDaysIcon,
  ColdCalendarEventIcon,
  ColdChartIcon,
  ColdCheckIcon,
  ColdChevronDownIcon,
  ColdChevronUpIcon,
  ColdClockIcon,
  ColdComplianceIcon,
  ColdComplianceSurveyCheckBoxIcon,
  ColdDangerIcon,
  ColdDocumentsIcon,
  ColdDocumentUploadIcon,
  ColdEmptyCheckboxIcon,
  ColdExpiringIcon,
  ColdFootprintIcon,
  ColdFootprintIconTwo,
  ColdHomeIcon,
  ColdInfoIcon,
  ColdJourneyIcon,
  ColdLeftArrowIcon,
  ColdMaterialsNavIcon,
  ColdProductsNavIcon,
  ColdQuestionnaireIcon,
  ColdReportIcon,
  ColdRightArrowIcon,
  ColdScoreIcon,
  ColdSettingsIcon,
  ColdSmallCheckBoxIcon,
  ColdSparkleIcon,
  ColdSuppliersNavIcon,
  ColdSupportNotFilledInIcon,
  ColdSustainabilityIcon,
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
    case IconNames.ColdDocumentUploadIcon:
      return <ColdDocumentUploadIcon {...props} />;
    case IconNames.ColdSwitchIcon:
      return <ColdSwitchIcon {...props} />;
    case IconNames.ColdCalendarDaysIcon:
      return <ColdCalendarDaysIcon {...props} />;
    case IconNames.ColdCalendarEventIcon:
      return <ColdCalendarEventIcon {...props} />;
    case IconNames.ColdClockIcon:
      return <ColdClockIcon {...props} />;
    case IconNames.ColdInfoIcon:
      return <ColdInfoIcon {...props} />;
    case IconNames.ColdLeftArrowIcon:
      return <ColdLeftArrowIcon {...props} />;
    case IconNames.ColdSupportNotFilledInIcon:
      return <ColdSupportNotFilledInIcon {...props} />;
    case IconNames.ColdAddNotesIcon:
      return <ColdAddNotesIcon {...props} />;
    case IconNames.ColdSparkleIcon:
      return <ColdSparkleIcon {...props} />;
    case IconNames.ColdSuppliersNavIcon:
      return <ColdSuppliersNavIcon {...props} />;
    case IconNames.ColdExpiringIcon:
      return <ColdExpiringIcon {...props} />;
    case IconNames.ColdDangerIcon:
      return <ColdDangerIcon {...props} />;
    case IconNames.ColdMaterialsNavIcon:
      return <ColdMaterialsNavIcon {...props} />;
    case IconNames.ColdProductsNavIcon:
      return <ColdProductsNavIcon {...props} />;
    case IconNames.ColdQuestionnaireIcon:
      return <ColdQuestionnaireIcon {...props} />;
    case IconNames.ColdChartIcon:
      return <ColdChartIcon {...props} />;
    case IconNames.ColdSustainabilityIcon:
      return <ColdSustainabilityIcon {...props} />;
    case IconNames.ColdCalendarCloseIcon:
      return <ColdCalendarCloseIcon {...props} />;
    default:
    case IconNames.ColdSettingsIcon:
      return <ColdSettingsIcon {...props} />;
  }
};
