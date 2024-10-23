import { forOwn, get, map } from 'lodash';
import { ComplianceManagerStatus, IconNames } from '@coldpbc/enums';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ColdIcon, ErrorFallback, ProgressCircle } from '@coldpbc/components';
import { ComplianceProgressStatusColor, isComplianceStatusPassed, isComplianceStatusReached } from '@coldpbc/lib';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';

const _ComplianceManagerOverviewStatusCard = () => {
	const { data, status: managerStatus } = useContext(ColdComplianceManagerContext);
	const { compliance, currentAIStatus, complianceCounts } = data;

	const showProgressBarGradient = (status: ComplianceManagerStatus) => {
		if (status === managerStatus) {
			return true;
		}

		return false;
	};

	const getStatusIcon = (status: ComplianceManagerStatus, managerStatus: ComplianceManagerStatus) => {
		if (
			(managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions) ||
			(managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi)
		) {
			let percentage = 0;
			if (managerStatus === ComplianceManagerStatus.startedQuestions && status === ComplianceManagerStatus.completedQuestions) {
				let totalQuestions = 0;
				let answeredQuestions = 0;
				const counts = get(complianceCounts, 'data.counts', {
					org_answered: 0,
				});
				forOwn(counts, (value, key) => {
					totalQuestions += value;
				});
				answeredQuestions = counts.org_answered;
				percentage = (answeredQuestions / totalQuestions) * 100;
			} else if (managerStatus === ComplianceManagerStatus.startedAi && status === ComplianceManagerStatus.completedAi) {
				const sectionGroups = get(complianceCounts, 'data.compliance_section_groups', []);
				// go through each section group and get the sections that have been answered by AI
				let sectionKeys: string[] = [];
				sectionGroups.forEach(group => {
					const sections = get(group, 'compliance_sections', []);
					const keys = sections.map(s => s.key);
					sectionKeys = [...sectionKeys, ...keys];
				});

				const currentAiStatusSections = currentAIStatus?.filter(s => sectionKeys.includes(s.section));
				const currentAiStatusSectionKeys = currentAiStatusSections ? currentAiStatusSections.map(s => s.section) : [];
				// all the sections that have been answered by AI are not in the currentAIStatusSectionKeys. The ones in the currentAIStatusSectionKeys are the ones that have not been answered by AI yet
				const answeredSections = sectionKeys.filter(s => !currentAiStatusSectionKeys.includes(s));
				percentage = sectionKeys.length === 0 ? 0 : (answeredSections.length / sectionKeys.length) * 100;
			}

			return (
				<div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
					<ProgressCircle color={HexColors.lightblue['200']} radius={6} percentage={percentage} backgroundColor={HexColors.gray['70']} />
				</div>
			);
		} else {
			if (isComplianceStatusReached(status, managerStatus)) {
				return (
					<div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
						<ColdIcon name={IconNames.ColdCheckIcon} color={ComplianceProgressStatusColor.user_answered} width={12} height={12} inverted={true} />
					</div>
				);
			} else {
				return <div className={'absolute top-[3px] left-0 w-[12px] h-[12px] bg-gray-70 rounded-full'}></div>;
			}
		}
	};

	const getComplianceStatusProgressBar = (status: ComplianceManagerStatus) => {
		if (status === ComplianceManagerStatus.submitted) {
			return null;
		}
		if (showProgressBarGradient(status)) {
			return (
				<div
					data-testid={'compliance'}
					className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px]`}
					style={{
						// have gradient color from 0% to amount of percentage to 100%
						backgroundImage: `linear-gradient(to bottom, ${ComplianceProgressStatusColor.user_answered} 0%, ${HexColors.bgc.menu} 100%)`,
					}}></div>
			);
		}

		const progressBarColor = isComplianceStatusPassed(status, managerStatus) ? 'bg-green-200' : 'bg-bgc-menu';

		return <div data-testid={'compliance'} className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px] ${progressBarColor}`}></div>;
	};

	const getComplianceSetStatusElement = (status: ComplianceManagerStatus) => {
		if ([ComplianceManagerStatus.notActivated, ComplianceManagerStatus.startedAi, ComplianceManagerStatus.startedQuestions].includes(status)) {
			return null;
		}

		let text = '';

		switch (status) {
			case ComplianceManagerStatus.activated:
				text = `Activate ${compliance?.title}`;
				break;
			case ComplianceManagerStatus.uploadedDocuments:
				text = 'Upload Documents';
				break;
			case ComplianceManagerStatus.completedAi:
				text = 'Start ✨Cold AI';
				break;
			case ComplianceManagerStatus.completedQuestions:
				text = 'Complete Questions';
				break;
			case ComplianceManagerStatus.submitted:
				text = 'Submit to Cold';
				break;
			default:
				text = '';
		}

		return (
			<div className={'w-full flex flex-row pl-[28px] relative'} key={status}>
				{getComplianceStatusProgressBar(status)}
				{getStatusIcon(status, managerStatus)}
				<div className={'text-tc-primary text-body w-full'}>{text}</div>
			</div>
		);
	};

	return (
		<div className={'w-[347px] h-auto p-[24px] flex flex-col gap-[22px] bg-bgc-elevated rounded-[16px]'} data-testid={'compliance-overview-statuses'}>
			{map(ComplianceManagerStatus, (status, index) => {
				return getComplianceSetStatusElement(status);
			})}
		</div>
	);
};

export const ComplianceManagerOverviewStatusCard = withErrorBoundary(_ComplianceManagerOverviewStatusCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerOverviewStatusCard: ', error);
	},
});
