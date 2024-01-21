import React, { useEffect } from 'react';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { SurveyPayloadType } from '@coldpbc/interfaces';
import { forOwn, isUndefined } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ComplianceOverviewCard, Spinner } from '@coldpbc/components';
import { ErrorType } from '@coldpbc/enums';

export interface ComplianceSectionOverviewProps {
  surveyName: string;
}
export const ComplianceSectionOverview = (props: ComplianceSectionOverviewProps) => {
  const navigate = useNavigate();
  const { surveyName } = props;
  const { logError } = useColdContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error, mutate } = useOrgSWR<SurveyPayloadType, any>([`/surveys/${surveyName}`, 'GET'], axiosFetcher);

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
    const refreshSurveyData = async () => {
      await mutate();
    };
    refreshSurveyData();
  }, [searchParams]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    logError(error.message, ErrorType.SWRError, error);
    return null;
  }

  if (data) {
    return (
      <ComplianceOverviewCard
        complianceData={getComplianceProgressForSurvey(data)}
        isOverview={false}
        onOverviewPage={false}
        ctaOnClick={() => {
          navigate(`?surveyName=${surveyName}`);
        }}
      />
    );
  } else {
    return null;
  }
};
