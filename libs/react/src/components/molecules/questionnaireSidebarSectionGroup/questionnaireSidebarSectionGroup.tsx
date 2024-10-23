import { QuestionnaireSidebarSection } from '@coldpbc/components';
import { ComplianceSidebarSectionGroup } from '@coldpbc/interfaces';

export const QuestionnaireSidebarSectionGroup = ({ sectionGroup, sideBarExpanded }: { sectionGroup: ComplianceSidebarSectionGroup; sideBarExpanded: boolean }) => {
	let answeredQuestions = 0;
	let totalQuestions = 0;

	sectionGroup.compliance_sections.forEach(section => {
		answeredQuestions += section.compliance_questions.filter(question => question.user_answered).length;
		totalQuestions += section.compliance_questions.length;
	});

	const percentage = totalQuestions === 0 ? '0' : ((answeredQuestions / totalQuestions) * 100).toFixed(0);

	if (!sideBarExpanded) return null;

	return (
		<div className={'w-full flex flex-col'}>
			<div className={'w-full flex justify-between text-h3 text-tc-primary p-[16px]'}>
				{sectionGroup.title}
				<div className={'bg-gray-70 rounded-[16px] px-[8px] py-[4px] text-body flex items-center'}>{percentage}%</div>
			</div>
			{sectionGroup.compliance_sections
				.sort((a, b) => a.order - b.order)
				.map(section => {
					return <QuestionnaireSidebarSection sideBarExpanded={sideBarExpanded} section={section} />;
				})}
		</div>
	);
};
