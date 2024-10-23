import { ComplianceProgressStatus, IconNames } from '@coldpbc/enums';
import { find, get, map, orderBy } from 'lodash';
import { ColdIcon, ComplianceManagerOverviewSection, ComplianceProgressStatusIcon, ErrorFallback, Spinner } from '@coldpbc/components';
import { ComplianceSidebarSectionGroup } from '@coldpbc/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';

export interface ComplianceManagerOverviewSectionGroupProps {
	sectionGroup: ComplianceSidebarSectionGroup;
	position: number;
}

const _ComplianceManagerOverviewSectionGroup = ({ sectionGroup, position }: ComplianceManagerOverviewSectionGroupProps) => {
	const [collapseOpen, setCollapseOpen] = useState(false);
	const { orgId } = useAuth0Wrapper();
	const context = useContext(ColdComplianceManagerContext);
	const { complianceCounts } = context.data;
	const { logBrowser } = useColdContext();

	const getGroupCounts = () => {
		const sectionGroupInCounts = find(get(complianceCounts, 'data.compliance_section_groups', []), { id: sectionGroup.id });
		const counts = get(sectionGroupInCounts, 'counts', {
			not_started: 0,
			ai_answered: 0,
			org_answered: 0,
			bookmarked: 0,
		});
		return {
			not_started: counts.not_started,
			ai_answered: counts.ai_answered,
			user_answered: counts.org_answered,
			bookmarked: counts.bookmarked,
		};
	};

	useEffect(() => {
		// open the first section group by default on load
		if (position === 0) {
			setCollapseOpen(true);
		}
	}, []);

	const orderedData = sectionGroup ? orderBy(sectionGroup.compliance_sections, ['order'], ['asc']) : undefined;

	useEffect(() => {
		logBrowser(`Compliance Manager Overview Section Group: ${sectionGroup.title}`, 'info', {
			orderedData,
			collapseOpen,
			orgId,
			sectionGroup,
		});
	}, [collapseOpen, logBrowser, orderedData, orgId, sectionGroup]);

	const sectionGroupCounts = getGroupCounts();

	const sectionStatuses = [
		{
			status: ComplianceProgressStatus.not_started,
			count: sectionGroupCounts.not_started,
		},
		{
			status: ComplianceProgressStatus.ai_answered,
			count: sectionGroupCounts.ai_answered,
		},
		{
			status: ComplianceProgressStatus.user_answered,
			count: sectionGroupCounts.user_answered,
		},
		{
			status: ComplianceProgressStatus.bookmarked,
			count: sectionGroupCounts.bookmarked,
		},
	];

	const sectionGroupData = sectionGroup;

	const getProgressIcon = (type: ComplianceProgressStatus) => {
		switch (type) {
			case ComplianceProgressStatus.user_answered:
			case ComplianceProgressStatus.not_started:
				return (
					<div className={'w-[24px] h-[24px] flex items-center justify-center'}>
						<ComplianceProgressStatusIcon type={type} />
					</div>
				);
			case ComplianceProgressStatus.ai_answered:
			case ComplianceProgressStatus.bookmarked:
				return (
					<div className={'w-[24px] h-[24px] flex items-center justify-center'}>
						<ComplianceProgressStatusIcon
							type={type}
							iconProps={{
								width: 15,
								height: 15,
							}}
						/>
					</div>
				);
		}
	};

	const getSectionStatusElements = () => {
		return map(sectionStatuses, status => {
			return (
				<div
					className={'rounded-[8px] border-[1px] border-gray-60 bg-gray-50 py-[4px] pl-[4px] pr-[8px] flex flex-row gap-[4px] items-center w-[68px] justify-start'}
					key={status.status}>
					{getProgressIcon(status.status)}
					<div className={'text-tc-primary text-body font-bold'}>{status.count}</div>
				</div>
			);
		});
	};

	return (
		<div className={`flex flex-col w-full bg-transparent ${collapseOpen && 'gap-[36px]'}`}>
			<div className={'w-full flex flex-row justify-between items-center gap-[36px] cursor-pointer'} onClick={() => setCollapseOpen(!collapseOpen)}>
				<div className={'text-h3 text-tc-primary'}>{sectionGroupData.title}</div>
				<div className={'w-auto flex flex-row justify-between items-center gap-[36px]'}>
					<div className={'flex flex-row gap-[8px] items-center'}>
						{getSectionStatusElements()}
						{collapseOpen ? (
							<div className={'w-[24px] h-[24px] flex items-center justify-center'}>
								<ColdIcon name={IconNames.ColdChevronUpIcon} />
							</div>
						) : (
							<div className={'w-[24px] h-[24px] flex items-center justify-center'}>
								<ColdIcon name={IconNames.ColdChevronDownIcon} />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={'w-full flex flex-col gap-[36px] bg-transparent'}>
				{orderedData
					? map(orderedData, (section, index) => {
							return <ComplianceManagerOverviewSection key={`${section.id}-${index}`} section={section} groupId={sectionGroup.id} collapseOpen={collapseOpen} />;
					  })
					: collapseOpen && <Spinner />}
			</div>
		</div>
	);
};

export const ComplianceManagerOverviewSectionGroup = withErrorBoundary(_ComplianceManagerOverviewSectionGroup, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerOverviewSectionGroup: ', error);
	},
});
