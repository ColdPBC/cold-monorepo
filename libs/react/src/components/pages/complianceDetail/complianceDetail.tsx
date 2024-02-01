import React, { useEffect } from 'react';
import { CenterColumnContent, ErrorFallback, MainContent, Spinner } from '@coldpbc/components';
import { ComplianceOverviewCard } from '../../organisms/complianceOverviewCard/complianceOverviewCard';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { forEach, forOwn, isUndefined } from 'lodash';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Compliance, OrgCompliance, SurveyPayloadType } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { ComplianceSectionOverview } from '../../organisms/complianceSectionOverview/complianceSectionOverview';
import { ErrorType } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceDetail = () => {
  const { orgId } = useAuth0Wrapper();
  const { logError } = useColdContext();
  const [complianceProgress, setComplianceProgress] = React.useState<any>({});
  const [totalComplianceProgress, setTotalComplianceProgress] = React.useState<any>({});
  const params = useParams();
  const complianceName = params['name'];
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organization/${orgId}`, 'GET'], axiosFetcher);

  const getComplianceProgressForSurveys = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let aiAnsweredQuestions = 0;
    let aiAttemptedQuestions = 0;
    forOwn(complianceProgress, (progress, surveyName) => {
      totalQuestions += progress.totalQuestions;
      answeredQuestions += progress.answeredQuestions;
      aiAnsweredQuestions += progress.aiAnsweredQuestions;
      aiAttemptedQuestions += progress.aiAttemptedQuestions;
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

  useEffect(() => {
    setTotalComplianceProgress(getComplianceProgressForSurveys());
  }, [complianceProgress]);

  if (orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (orgCompliances.error) {
    logError(orgCompliances.error, ErrorType.SWRError);
    return null;
  }

  if (orgCompliances.data) {
    const compliance = orgCompliances.data.find(compliance => {
      return compliance.compliance_definition.name === complianceName;
    });
    if (compliance) {
      return (
        <CenterColumnContent title={`${compliance.compliance_definition.title} Compliance`}>
          <div className={'w-full space-y-[24px]'}>
            <ComplianceOverviewCard
              title={'Overview'}
              complianceData={totalComplianceProgress}
              isOverview={true}
              onOverviewPage={false}
              logo_url={compliance.compliance_definition.logo_url}
            />
            <div className={'w-full space-y-[8px]'}>
              <div className={'text-h3 text-tc-primary'}>Sections</div>
              {compliance.compliance_definition.surveys.map((survey, index) => {
                return (
                  <div key={'survey_' + index} data-testid={'compliance-section-overview-card'}>
                    <ComplianceSectionOverview surveyName={survey} setOverviewComplianceProgress={setComplianceProgress} overviewComplianceProgress={complianceProgress} />
                  </div>
                );
              })}
            </div>
          </div>
        </CenterColumnContent>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const ComplianceDetail = withErrorBoundary(_ComplianceDetail, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
