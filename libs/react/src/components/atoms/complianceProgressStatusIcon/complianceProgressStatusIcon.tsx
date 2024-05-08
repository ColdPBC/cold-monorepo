import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { ColdIcon } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { IconProps } from '@coldpbc/interfaces';

export interface ComplianceProgressStatusIconProps {
  type: ComplianceProgressStatus;
  inverted?: boolean;
  iconProps?: IconProps;
}

export const ComplianceProgressStatusIcon = ({ type, inverted, iconProps }: ComplianceProgressStatusIconProps) => {
  switch (type) {
    case ComplianceProgressStatus.not_started:
      if (inverted) {
        return <div className={'w-full h-full bg-gray-70 rounded-full'}></div>;
      } else {
        return <ColdIcon name={IconNames.ColdSupportNotFilledInIcon} color={HexColors.gray['90']} {...iconProps} />;
      }
    case ComplianceProgressStatus.needs_review:
      if (inverted) {
        return <ColdIcon name={IconNames.ColdInvertedAIIcon} color={HexColors.yellow['200']} {...iconProps} />;
      } else {
        return <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} {...iconProps} />;
      }
    case ComplianceProgressStatus.bookmarked:
      if (inverted) {
        return <ColdIcon name={IconNames.ColdInvertedBookmarkIcon} color={HexColors.lightblue['200']} {...iconProps} />;
      } else {
        return <ColdIcon name={IconNames.ColdBookmarkIcon} color={HexColors.lightblue['200']} {...iconProps} />;
      }
    case ComplianceProgressStatus.complete:
      if (inverted) {
        return <ColdIcon name={IconNames.ColdInvertedCheckmarkIcon} color={HexColors.green['200']} {...iconProps} />;
      } else {
        return <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} {...iconProps} />;
      }
  }
};
