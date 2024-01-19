import React, { useEffect } from 'react';
import { CenterColumnContent, MainContent, Spinner } from '@coldpbc/components';
import { ComplianceOverviewCard } from '../../organisms/complianceOverviewCard/complianceOverviewCard';
import { useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { forEach, forOwn, isUndefined } from 'lodash';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Compliance, SurveyPayloadType } from '@coldpbc/interfaces';
import { getComplianceProgress } from '@coldpbc/lib';
import { mutate as globalMutate } from 'swr/_internal';

export const ComplianceDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const complianceName = params['name'];
  const [searchParams, setSearchParams] = useSearchParams();
  const compliance = useOrgSWR<Compliance>([`/compliance/${complianceName}`, 'GET'], axiosFetcher);

  const getComplianceProgressForSurvey = (survey: SurveyPayloadType) => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let aiAnsweredQuestions = 0;
    let aiAttemptedQuestions = 0;
    forOwn(survey.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (!isUndefined(question.ai_attempted)) {
          aiAttemptedQuestions++;
        }
        if (question.value) {
          answeredQuestions++;
        } else {
          if (question.ai_value) {
            aiAnsweredQuestions++;
          }
        }
      });
    });
    return {
      totalQuestions,
      aiAttemptedQuestions,
      answeredQuestions,
      aiAnsweredQuestions,
      percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
      percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
      title: survey.definition?.title,
    };
  };

  useEffect(() => {
    // refresh compliance data when surveys are updated
    const refreshComplianceData = async () => {
      await compliance.mutate();
    };
    refreshComplianceData();
  }, [searchParams]);

  if (compliance.isLoading) {
    return <Spinner />;
  }

  if (compliance.error) {
    console.log('Error loading compliance data');
  }

  if (compliance.data) {
    const complianceProgress = getComplianceProgress(compliance.data);

    return (
      <CenterColumnContent title="REI Compliance">
        <div className={'w-full space-y-10'}>
          <ComplianceOverviewCard complianceData={complianceProgress} isOverview={true} onOverviewPage={false} />
          <div className={'w-full space-y-[24px]'}>
            {compliance.data?.surveys.map((survey, index) => {
              return (
                <ComplianceOverviewCard
                  complianceData={getComplianceProgressForSurvey(survey)}
                  isOverview={false}
                  onOverviewPage={false}
                  ctaOnClick={() => {
                    navigate(`?surveyName=${survey.name}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </CenterColumnContent>
    );
  } else {
    return '';
  }
};
