import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { ColdIcon, ColdSupportNotFilledInIcon } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { IconProps } from '@coldpbc/interfaces';

export interface ComplianceProgressStatusIconProps {
  type: ComplianceProgressStatus;
  iconProps?: IconProps;
}

export const ComplianceProgressStatusIcon = ({ type, iconProps }: ComplianceProgressStatusIconProps) => {
  switch (type) {
    case ComplianceProgressStatus.not_started:
      return <ColdSupportNotFilledInIcon color={HexColors.gray['90']} {...iconProps} />;
    case ComplianceProgressStatus.needs_review:
      return <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} {...iconProps} />;
    case ComplianceProgressStatus.bookmarked:
      return (
        <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
          <ColdIcon name={IconNames.ColdBookmarkIcon} color={HexColors.lightblue['200']} {...iconProps} />
        </div>
      );
    case ComplianceProgressStatus.complete:
      return (
        <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
          <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} {...iconProps} />
        </div>
      );
  }
};
