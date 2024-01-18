import React from 'react';
import { CenterColumnContent, MainContent, Spinner } from '@coldpbc/components';
import { ComplianceOverviewCard } from '../../organisms/complianceOverviewCard/complianceOverviewCard';
import { useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { forOwn } from 'lodash';
import { useNavigate } from 'react-router-dom';

export const ComplianceDetail = () => {
  const navigate = useNavigate();
  const pkgSurvey = useOrgSWR(['/surveys/rei_pkg_survey', 'GET'], axiosFetcher);
  const ghgSurvey = useOrgSWR(['/surveys/rei_ghg_survey', 'GET'], axiosFetcher);
  const mfgSurvey = useOrgSWR(['/surveys/rei_mfg_survey', 'GET'], axiosFetcher);

  const getComplianceProgress = () => {
    // loop through all the surveys and get the number of questions answered and the total number of questions
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let aiAnsweredQuestions = 0;
    forOwn(pkgSurvey.data?.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (question.value !== null && question.value !== undefined) {
          answeredQuestions++;
        }
        if (question.optimized === true) {
          aiAnsweredQuestions++;
        }
      });
    });
    forOwn(ghgSurvey.data?.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (question.value !== null && question.value !== undefined) {
          answeredQuestions++;
        }
        if (question.optimized === true) {
          aiAnsweredQuestions++;
        }
      });
    });
    forOwn(mfgSurvey.data?.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (question.value !== null && question.value !== undefined) {
          answeredQuestions++;
        }
        if (question.optimized === true) {
          aiAnsweredQuestions++;
        }
      });
    });
    return {
      totalQuestions,
      answeredQuestions,
      aiAnsweredQuestions,
      percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
      percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
      title: 'Overview',
    };
  };

  const getComplianceProgressForSurvey = (survey: any) => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let aiAnsweredQuestions = 0;
    forOwn(survey.data?.definition?.sections, (section, sectionKey) => {
      forOwn(section.follow_up, question => {
        totalQuestions++;
        if (question.value !== null && question.value !== undefined) {
          answeredQuestions++;
        }
        if (question.optimized === true) {
          aiAnsweredQuestions++;
        }
      });
    });
    return {
      totalQuestions,
      answeredQuestions,
      aiAnsweredQuestions,
      percentageAnswered: Math.round((answeredQuestions / totalQuestions) * 100),
      percentageAIAnswered: Math.round((aiAnsweredQuestions / totalQuestions) * 100),
      title: survey.data?.definition?.title,
    };
  };

  if (pkgSurvey.isLoading && ghgSurvey.isLoading && mfgSurvey.isLoading) {
    return <Spinner />;
  }

  if (pkgSurvey.error && ghgSurvey.error && mfgSurvey.error) {
    console.log('Error loading compliance data');
  }

  if (pkgSurvey.data && ghgSurvey.data && mfgSurvey.data) {
    const complianceProgress = getComplianceProgress();

    return (
      <CenterColumnContent title="REI Compliance">
        <div className={'w-full space-y-10'}>
          <ComplianceOverviewCard complianceData={complianceProgress} isOverview={true} onOverviewPage={false} />
          <div className={'w-full space-y-[24px]'}>
            {pkgSurvey.data && (
              <ComplianceOverviewCard
                complianceData={getComplianceProgressForSurvey(pkgSurvey)}
                isOverview={false}
                onOverviewPage={false}
                ctaOnClick={() => {
                  navigate('?surveyName=rei_pkg_survey');
                }}
              />
            )}
            {ghgSurvey.data && (
              <ComplianceOverviewCard
                complianceData={getComplianceProgressForSurvey(ghgSurvey)}
                isOverview={false}
                onOverviewPage={false}
                ctaOnClick={() => {
                  navigate('?surveyName=rei_ghg_survey');
                }}
              />
            )}
            {mfgSurvey.data && (
              <ComplianceOverviewCard
                complianceData={getComplianceProgressForSurvey(mfgSurvey)}
                isOverview={false}
                onOverviewPage={false}
                ctaOnClick={() => {
                  navigate('?surveyName=rei_mfg_survey');
                }}
              />
            )}
          </div>
        </div>
      </CenterColumnContent>
    );
  } else {
    return '';
  }
};
