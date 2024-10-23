import { ColdIcon, ProgressCircle, StatusChip } from '@coldpbc/components';
import { ComplianceStatus } from '../../../enums/compliance';
import { HexColors } from '@coldpbc/themes';
import { IconNames } from '@coldpbc/enums';

export interface ComplianceStatusChipProps {
	status: ComplianceStatus;
	percentage?: number;
}

export const ComplianceStatusChip = (props: ComplianceStatusChipProps) => {
	const { status, percentage = 0 } = props;

	const getStatusColor = () => {
		switch (status) {
			case ComplianceStatus.inActive:
				return HexColors.bgc.menu;
			case ComplianceStatus.inProgress:
				if (percentage === 0) {
					return 'white';
				} else if (percentage === 100) {
					return HexColors.teal['200'];
				} else {
					return HexColors.lightblue['200'];
				}
			case ComplianceStatus.submissionInProgress:
			case ComplianceStatus.submittedByCold:
				return HexColors.green['200'];
			default:
				return 'gray';
		}
	};

	const color = getStatusColor();

	const getStatusText = () => {
		switch (status) {
			case ComplianceStatus.inActive:
				return 'Not Active';
			case ComplianceStatus.inProgress:
				return `${percentage.toFixed(0)}% Answered`;
			case ComplianceStatus.submissionInProgress:
				return 'Submission in Progress';
			case ComplianceStatus.submittedByCold:
				return 'Submitted by Cold';
			default:
				return 'Unknown';
		}
	};

	const getProgressCircle = () => {
		switch (status) {
			case ComplianceStatus.inProgress:
				if (percentage === 0) {
					return <div className={'w-[12px] h-[12px] bg-gray-60 rounded-full'}></div>;
				} else {
					return <ProgressCircle color={color} percentage={percentage} radius={6} />;
				}
			case ComplianceStatus.submissionInProgress:
				return <ProgressCircle color={color} percentage={100} radius={6} />;
			case ComplianceStatus.submittedByCold:
				return <ColdIcon name={IconNames.ColdCheckIcon} color={color} inverted={true} />;
			default:
			case ComplianceStatus.inActive:
				return <div className={'w-[12px] h-[12px] bg-gray-60 rounded-full'}></div>;
		}
	};

	return (
		<StatusChip color={color} className={`${status === ComplianceStatus.inActive ? 'text-tc-disabled' : 'text-tc-primary'}`}>
			{getProgressCircle()}
			<div className={'truncate text-body'}>{getStatusText()}</div>
		</StatusChip>
	);
};
