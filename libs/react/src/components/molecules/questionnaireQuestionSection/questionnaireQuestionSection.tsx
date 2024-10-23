import { ErrorFallback, QuestionnaireQuestionItem, QuestionnaireQuestionItemPlaceholder } from '@coldpbc/components';
import React, { ReactNode, useContext, useEffect } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { ComplianceSidebarSection, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { useSearchParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { orderBy } from 'lodash';
import { useColdContext } from '@coldpbc/hooks';
import { useInView } from 'react-intersection-observer';

const _QuestionnaireQuestionSection = (props: {
	section: ComplianceSidebarSection;
	sectionGroupId: string;
	pagedSectionData: QuestionnaireQuestion[] | undefined;
	questionnaireMutate: () => void;
	updateSize: () => void;
}) => {
	const { logBrowser } = useColdContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const { focusQuestion, scrollToQuestion } = useContext(ColdComplianceQuestionnaireContext);
	const { updateSize, section, pagedSectionData, sectionGroupId, questionnaireMutate } = props;
	const sectionKey = searchParams.get('section');
	const isSectionInQuery = sectionKey === section.key;
	const [sectionRef, sectionInView] = useInView({
		rootMargin: '0px 0px',
	});

	useEffect(() => {
		// remove search params after a
		let timer: NodeJS.Timeout;
		if (isSectionInQuery) {
			timer = setTimeout(() => {
				// delete section key from query params
				setSearchParams((prevParams: any) => {
					const params = new URLSearchParams(prevParams);
					params.delete('section');
					return params;
				});
			}, 3000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [searchParams]);

	useEffect(() => {
		if (sectionInView) {
			updateSize();
		}
	}, [sectionInView]);

	// use placeholder questions to fill in the gaps if the page data is not loaded yet
	const orderedPlaceholderQuestions = orderBy(section.compliance_questions, ['order'], ['asc']);

	useEffect(() => {
		logBrowser(`QuestionnaireQuestionSection loaded for section: ${section.title}`, 'info', {
			sectionKey,
			isSectionInQuery,
			pagedSectionData,
			orderedPlaceholderQuestions,
		});
	}, [isSectionInQuery, orderedPlaceholderQuestions, pagedSectionData, section.title, sectionKey]);

	return (
		<div className={'flex flex-col gap-[40px] w-full'} ref={sectionRef}>
			<div
				className={`text-h2 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}
				ref={el => {
					if (isSectionInQuery && el && focusQuestion === null) {
						el.scrollIntoView({
							behavior: 'instant',
							block: 'start',
						});
					}
				}}>
				{section.title}
			</div>
			{orderedPlaceholderQuestions.map((question, index) => {
				const pagedQuestionData = pagedSectionData?.find(q => q.key === question.key);
				let element: ReactNode = null;
				// get question search params
				const questionParam = searchParams.get('question');
				const isQuestionInQuery = questionParam === question.key;
				if (pagedQuestionData) {
					element = (
						<QuestionnaireQuestionItem
							key={question.key}
							number={index + 1}
							question={pagedQuestionData}
							sectionId={section.id}
							sectionGroupId={sectionGroupId}
							questionnaireMutate={questionnaireMutate}
						/>
					);
				} else {
					element = <QuestionnaireQuestionItemPlaceholder key={question.key} number={index + 1} question={question} />;
				}
				return (
					<div
						ref={el => {
							if ((scrollToQuestion === question.key || isQuestionInQuery) && el) {
								el.scrollIntoView({
									behavior: 'instant',
									block: 'start',
								});
							}
						}}>
						{element}
					</div>
				);
			})}
		</div>
	);
};

export const QuestionnaireQuestionSection = withErrorBoundary(_QuestionnaireQuestionSection, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in QuestionnaireQuestionSection: ', error);
	},
});
