import { ComplianceManagerOverviewSectionGroup } from '../complianceManagerOverviewSectionGroup';
import React, { useContext, useEffect } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { get, map, orderBy } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { isAxiosError } from 'axios';

const _ComplianceManagerOverviewSectionGroups = () => {
	const { data } = useContext(ColdComplianceManagerContext);
	const { logBrowser } = useColdContext();

	const { sectionGroups } = data;

	const sectionGroupsData = get(sectionGroups, 'data.compliance_section_groups', []);

	const orderedSectionGroups = orderBy(sectionGroupsData, ['order', 'title'], ['asc', 'asc']);

	useEffect(() => {
		logBrowser('Compliance Manager Overview Section Groups', 'info', { orderedSectionGroups });
	}, [logBrowser, orderedSectionGroups]);

	if (isAxiosError(sectionGroups?.data)) {
		return (
			<div className={'w-full flex flex-col gap-[36px] justify-center text-tc-primary'}>
				<span className={'text-tc-primary'}>There was an error loading the questionnaire.</span>
			</div>
		);
	}

	return (
		<div className={'w-full flex flex-col gap-[36px]'}>
			{map(orderedSectionGroups, (sectionGroup, index) => {
				return <ComplianceManagerOverviewSectionGroup key={index} sectionGroup={sectionGroup} position={index} />;
			})}
		</div>
	);
};

export const ComplianceManagerOverviewSectionGroups = withErrorBoundary(_ComplianceManagerOverviewSectionGroups, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerOverviewSectionGroups: ', error);
	},
});
