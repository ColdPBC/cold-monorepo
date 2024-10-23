import React, { useContext } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { HexColors } from '@coldpbc/themes';
import { ErrorFallback, QuestionnaireSidebarSectionGroup } from '@coldpbc/components';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';
import { orderBy } from 'lodash';

const _QuestionnaireSidebar = (props: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
	const { sidebarOpen, setSidebarOpen } = props;
	const { sectionGroups } = useContext(ColdComplianceQuestionnaireContext);

	const orderedSectionGroups = orderBy(sectionGroups?.data?.compliance_section_groups, ['order', 'title'], ['asc', 'asc']);
	return (
		<div
			className={'h-full flex flex-col gap-[24px] border-gray-70 border-r-[1px] text-ellipsis'}
			style={{
				width: sidebarOpen ? '407px' : '72px',
				transition: 'width 0.3s',
			}}>
			{sidebarOpen ? (
				<div className={'w-full h-[72px] flex justify-between items-center px-[16px] py-[8px] shadow-2xl cursor-pointer'} onClick={() => setSidebarOpen(!sidebarOpen)}>
					<div className={'text-tc-primary text-h4 truncate'}>Table of Contents</div>
					<ChevronDoubleLeftIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
				</div>
			) : (
				<div className={'w-full h-[72px] flex justify-center items-center border-b-[1px] border-gray-70 cursor-pointer'} onClick={() => setSidebarOpen(!sidebarOpen)}>
					<ChevronDoubleRightIcon width={'24'} height={'24'} color={HexColors.gray['90']} />
				</div>
			)}
			<div className={'w-full h-full flex flex-col gap-[48px] overflow-y-auto scrollbar-hide pb-[100px]'}>
				{orderedSectionGroups.map((item, index) => {
					return <QuestionnaireSidebarSectionGroup key={index} sectionGroup={item} sideBarExpanded={sidebarOpen} />;
				})}
			</div>
		</div>
	);
};

export const QuestionnaireSidebar = withErrorBoundary(_QuestionnaireSidebar, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in QuestionnaireSidebar: ', error);
	},
});
