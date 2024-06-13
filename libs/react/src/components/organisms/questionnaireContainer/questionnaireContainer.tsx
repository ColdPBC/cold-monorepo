import { useContext, useEffect, useRef } from 'react';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { QuestionnaireQuestionSection, Spinner } from '@coldpbc/components';
import { ComplianceSidebarSection, QuestionnaireQuestion } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';

export const QuestionnaireContainer = () => {
  const { logBrowser } = useColdContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lowerRef, lowerRefInView] = useInView({
    // triggerOnce: true,
    rootMargin: '0px 0px',
  });
  const scrollToSectionRef = useRef<HTMLDivElement>(null);
  const { orgId } = useAuth0Wrapper();
  const { name, focusQuestion, sectionGroups, scrollToQuestion, setScrollToQuestion } = useContext(ColdComplianceQuestionnaireContext);
  const orderedSections = Array<ComplianceSidebarSection>();
  sectionGroups.compliance_section_groups
    .sort((a, b) => a.order - b.order)
    .forEach(sectionGroup => {
      sectionGroup.compliance_sections
        .sort((a, b) => a.order - b.order)
        .forEach(section => {
          orderedSections.push(section);
        });
    });

  const getKey = (pageIndex: number, previousPageData: QuestionnaireQuestion[]) => {
    if (pageIndex >= orderedSections.length || (previousPageData && !previousPageData.length)) return null; // reached the end
    const section = orderedSections[pageIndex];
    const sectionGroup = sectionGroups.compliance_section_groups.find(sectionGroup => {
      return sectionGroup.compliance_sections.find(s => s.key === section.key);
    });
    const id = section.id;
    return [`/compliance_definitions/${name}/organizations/${orgId}/sectionGroups/${sectionGroup?.id}/sections/${id}?responses=true`, 'GET']; // SWR key
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite<QuestionnaireQuestion[], any, any>(getKey, axiosFetcher);

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
    // else {
    //   if (size >= sectionWithQuestionKeyIndex + 1 && isLoading === false) {
    //     scroller.scrollTo(scrollToQuestion, {
    //       duration: 400,
    //       containerId: 'questionnaireContainer',
    //       smooth: true,
    //       isDynamic: true,
    //     });
    //   }
    // }
  }, [scrollToQuestion, size, isLoading]);

  useEffect(() => {
    if (lowerRefInView && size < orderedSections.length) {
      setSize(size + 1);
    }
  }, [lowerRefInView]);

  // get query params section

  useEffect(() => {
    if (searchParams.has('section')) {
      const sectionKey = searchParams.get('section');
      const section = orderedSections.find(s => s.key === sectionKey);
      if (section) {
        const sectionIndex = orderedSections.indexOf(section);
        if (sectionIndex >= size) {
          setSize(sectionIndex + 1);
        }
      }
    }
  }, [searchParams]);

  logBrowser('QuestionnaireContainer', 'info', {
    sectionGroups,
    data,
    error,
    isLoading,
  });

  return (
    <div className={'w-full pt-[24px] px-[40px] flex flex-col gap-[40px] overflow-x-auto scrollbar-hide'} id={'questionnaireContainer'}>
      {sectionGroups.compliance_section_groups
        .sort((a, b) => a.order - b.order)
        .map((sectionGroup, index) => {
          return (
            <div className={'w-full flex flex-col gap-[40px] items-start'}>
              <div className={`text-h1 text-tc-primary ${focusQuestion !== null && 'opacity-20'}`}>{sectionGroup.title}</div>
              {sectionGroup.compliance_sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => {
                  const orderedSectionIndex = orderedSections.findIndex(s => s.key === section.key);
                  const isLastPage = size - 1 === orderedSectionIndex;
                  const firstQuestion = section.compliance_questions[0];
                  const pagedSectionData = data?.find(questions => {
                    return questions.find(q => q.key === firstQuestion.key);
                  });
                  const lastPageRef = isLastPage ? lowerRef : null;
                  return <QuestionnaireQuestionSection key={section.key} section={section} pagedSectionData={pagedSectionData} innerRef={lastPageRef} />;
                })}
              <div>{isLoading && <Spinner />}</div>
            </div>
          );
        })}
    </div>
  );
};
