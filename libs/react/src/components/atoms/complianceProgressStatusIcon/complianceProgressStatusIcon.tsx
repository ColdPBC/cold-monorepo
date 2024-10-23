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
			return <ColdIcon name={IconNames.ColdSupportNotFilledInIcon} color={HexColors.gray['90']} inverted={inverted} {...iconProps} />;
		case ComplianceProgressStatus.ai_answered:
			return <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} inverted={inverted} {...iconProps} />;
		case ComplianceProgressStatus.bookmarked:
			return <ColdIcon name={IconNames.ColdBookmarkIcon} color={HexColors.lightblue['200']} inverted={inverted} {...iconProps} />;
		case ComplianceProgressStatus.user_answered:
			return <ColdIcon name={IconNames.ColdCheckIcon} color={HexColors.green['200']} inverted={inverted} {...iconProps} />;
	}
};
