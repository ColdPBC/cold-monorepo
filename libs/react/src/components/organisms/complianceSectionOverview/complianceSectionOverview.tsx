import React, { useEffect } from 'react';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { IButtonProps, SurveyPayloadType } from '@coldpbc/interfaces';
import { forOwn, isUndefined } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ComplianceOverviewCard, Spinner } from '@coldpbc/components';
import { ButtonTypes, ErrorType, GlobalSizes } from '@coldpbc/enums';
import useSWR from 'swr';

export interface ComplianceSectionOverviewProps {
  surveyName: string;
  overviewComplianceProgress: any;
  setOverviewComplianceProgress: (complianceProgress: any) => void;
}
export const ComplianceSectionOverview = (props: ComplianceSectionOverviewProps) => {
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { surveyName, setOverviewComplianceProgress, overviewComplianceProgress } = props;
  const { logError } = useColdContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error, mutate } = useSWR<SurveyPayloadType, any, any>([`organizations/${orgId}/surveys/${surveyName}`, 'GET'], axiosFetcher);

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
          if (question.ai_response?.answer) {
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
    };
  };

  const getCTAs = (complianceData: any): Array<IButtonProps> => {
    if (complianceData.answeredQuestions === complianceData.totalQuestions) {
      return [
        {
          label: 'Edit Answers',
          variant: ButtonTypes.secondary,
          size: GlobalSizes.large,
          onClick: () => {
            navigate(`?surveyName=${surveyName}`);
          },
        },
      ];
    } else {
      return [
        {
          label: 'Review and Answer',
          variant: ButtonTypes.secondary,
          size: GlobalSizes.large,
          onClick: () => {
            navigate(`?surveyName=${surveyName}`);
          },
        },
      ];
    }
  };

  const showCTA = (complianceData: any) => {
    if (complianceData.aiAttemptedQuestions !== complianceData.totalQuestions) {
      return undefined;
    } else {
      return getCTAs(complianceData);
    }
  };

  useEffect(() => {
    const refreshSurveyData = async () => {
      await mutate();
    };
    refreshSurveyData();
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      const complianceData = getComplianceProgressForSurvey(data);
      setOverviewComplianceProgress((state: any) => {
        return {
          ...state,
          [surveyName]: complianceData,
        };
      });
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    logError(error.message, ErrorType.SWRError, error);
    return null;
  }

  if (data) {
    const complianceData = getComplianceProgressForSurvey(data);
    return <ComplianceOverviewCard complianceData={complianceData} isOverview={false} onOverviewPage={false} ctas={showCTA(complianceData)} title={data.definition?.title} />;
  } else {
    return null;
  }
};
