import React, { useContext, useEffect } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { ErrorFallback, QuestionnaireQuestionSection, Spinner } from '@coldpbc/components';
import { ComplianceSidebarSection, QuestionnaireComplianceContainerPayLoad, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import useSWRInfinite from 'swr/infinite';
import { useSearchParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { orderBy } from 'lodash';

const _QuestionnaireContainer = () => {
	const { logBrowser } = useColdContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const { orgId } = useAuth0Wrapper();
	const { name, focusQuestion, sectionGroups, scrollToQuestion, setScrollToQuestion } = useContext(ColdComplianceQuestionnaireContext);
	const orderedSections = Array<ComplianceSidebarSection>();
	orderBy(sectionGroups?.data?.compliance_section_groups, ['order', 'title'], ['asc', 'asc']).forEach(sectionGroup => {
		sectionGroup.compliance_sections
			.sort((a, b) => a.order - b.order)
			.forEach(section => {
				orderedSections.push(section);
			});
	});

	const getKey = (pageIndex: number, previousPageData: QuestionnaireQuestion[]) => {
		if (pageIndex >= orderedSections.length) return null; // reached the end
		const section = orderedSections[pageIndex];
		const sectionGroup = sectionGroups?.data?.compliance_section_groups.find(sectionGroup => {
			return sectionGroup.compliance_sections.find(s => s.key === section.key);
		});
		const id = section.id;
		return [`/compliance/${name}/organizations/${orgId}/section_groups/${sectionGroup?.id}/sections/${id}/responses`, 'GET'];
	};

	const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite<QuestionnaireComplianceContainerPayLoad, any, any>(getKey, axiosFetcher, {
		parallel: true,
	});

	const getPageSectionData = (pageDataList: QuestionnaireComplianceContainerPayLoad[] | undefined, sectionGroupId: string, sectionId: string) => {
		// get pageData with the sectionGroupId and sectionId
		if (!pageDataList) return undefined;
		// get all the pageData with the sectionGroupId
		const pageGroupData = pageDataList
			.filter(pageData => {
				const complianceSectionGroup = pageData.compliance_section_groups[0];
				if (!complianceSectionGroup) return false;
				return complianceSectionGroup.id === sectionGroupId;
			})
			.filter(pageData => {
				// get all the pageData with the sectionId
				const complianceSection = pageData.compliance_section_groups[0].compliance_sections[0];
				if (!complianceSection) return false;
				return complianceSection.id === sectionId;
			});
		if (pageGroupData.length === 0) return undefined;
		return pageGroupData[0].compliance_section_groups[0].compliance_sections[0].compliance_questions;
	};

	useEffect(() => {
		if (scrollToQuestion === null) return;
		// update the size
		const sectionWithQuestionKeyIndex = orderedSections.findIndex(section => {
			return section.compliance_questions.find(question => question.key === scrollToQuestion);
		});
		if (sectionWithQuestionKeyIndex === -1) {
			setScrollToQuestion(null);
			return;
		}
		// 0 index and 1 size
		// 4 index and 5 size
		if (sectionWithQuestionKeyIndex + 1 > size) {
			setSize(sectionWithQuestionKeyIndex + 1);
		}
	}, [scrollToQuestion, size, isLoading]);

	useEffect(() => {
		if (searchParams.has('section')) {
			const sectionKey = searchParams.get('section');
			const section = orderedSections.find(s => s.key === sectionKey);
			if (section) {
				const sectionIndex = orderedSections.indexOf(section);
				if (sectionIndex >= size) {
					setSize(sectionIndex + 1);
				}
			} else {
				// remove section key from query params
				setSearchParams((prevParams: any) => {
					const params = new URLSearchParams(prevParams);
					params.delete('section');
					return params;
				});
			}
		}
	}, [searchParams]);

	const orderedSectionGroups = orderBy(sectionGroups?.data?.compliance_section_groups, ['order', 'title'], ['asc', 'asc']);

	return (
		<div className={'w-full h-full pt-[24px] px-[40px] flex flex-col gap-[40px] overflow-y-scroll scrollbar-hide pb-[100px]'} id={'questionnaireContainer'}>
			{orderedSectionGroups.map((sectionGroup, index) => {
				return (
					<div className={'w-full flex flex-col gap-[40px] items-start'}>
						<div className={`text-h1 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}>{sectionGroup.title}</div>
						{sectionGroup.compliance_sections
							.sort((a, b) => a.order - b.order)
							.map((section, index) => {
								const orderedSectionIndex = orderedSections.findIndex(s => s.key === section.key);
								const pagedSectionData = getPageSectionData(data, sectionGroup.id, section.id);
								return (
									<>
										<QuestionnaireQuestionSection
											questionnaireMutate={mutate}
											key={section.key}
											section={section}
											sectionGroupId={sectionGroup.id}
											pagedSectionData={pagedSectionData}
											updateSize={() => {
												if (orderedSectionIndex + 1 > size) {
													setSize(orderedSectionIndex + 1);
												}
											}}
										/>
										{isLoading && <Spinner />}
									</>
								);
							})}
					</div>
				);
			})}
		</div>
	);
};

export const QuestionnaireContainer = withErrorBoundary(_QuestionnaireContainer, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in QuestionnaireContainer: ', error);
	},
});
